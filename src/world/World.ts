import Entity from '../entity/Entity'
import {IEntity} from '../entity/types'
import {ISystem} from '../system/types'
import {IComponentConstructor, TComponentConstructors} from '../types'
import {IEcsWorld, TEntityComponentMap} from './types'
import {collectEntities, fallbackConstructorArgs} from './utils'

export default class World<TDependencies extends object>
  implements IEcsWorld<TDependencies> {
  private _entitiesMap: TEntityComponentMap
  private readonly _dependencies: TDependencies
  private readonly _systems: ISystem<any, TDependencies>[] = []

  constructor(dependencies: TDependencies) {
    this._dependencies = dependencies
    this._entitiesMap = new Map()
  }

  public addSystem = <
    U extends object[],
    T extends IComponentConstructor<ISystem<U, TDependencies>>
  >(
    Constructor: T
  ): IEcsWorld<TDependencies> => {
    this._systems.push(new Constructor())

    return this
  }

  public createEntity = <T extends object[]>(): IEntity<T> => {
    const entity = new Entity(this)
    this._entitiesMap = new Map(this._entitiesMap).set(entity, new Map())

    return entity
  }

  public addEntityComponent = <
    U extends object,
    T extends IComponentConstructor<U>
  >(
    entity: IEntity<any>,
    Constructor: T,
    initialValues: ConstructorParameters<T>
  ): void => {
    const instance = new Constructor(...fallbackConstructorArgs(initialValues))

    this._entitiesMap = new Map(this._entitiesMap).set(
      entity,
      new Map(this.getEntityComponents(entity) || []).set(
        Constructor.name,
        instance
      )
    )
  }

  public removeEntityComponent = <
    U extends object,
    T extends IComponentConstructor<U>
  >(
    entity: IEntity<any>,
    Constructor: T
  ): void => {
    const newEntityComponents = new Map(this.getEntityComponents(entity) || [])
    newEntityComponents.delete(Constructor.name)

    this._entitiesMap = new Map(this._entitiesMap).set(
      entity,
      newEntityComponents
    )
  }

  public init = async () => {
    for (const system of this._systems) {
      await system.init(this._dependencies)
    }
  }

  public update = () => {
    for (const system of this._systems) {
      system.preUpdate(this._dependencies)

      for (const entity of this.getEntities(system.components)) {
        system.update(entity, this._dependencies)
      }
    }
  }

  public removeEntity = (entity: IEntity<any>) => {
    const newEntitiesMap = new Map(this._entitiesMap)
    newEntitiesMap.delete(entity)
    this._entitiesMap = newEntitiesMap
  }

  public getEntityComponents = (entity: IEntity<any>) =>
    this._entitiesMap.get(entity)

  public get systems() {
    return this._systems
  }


  private getEntities = <T extends object[]>(
    components: TComponentConstructors<T>
  ) => collectEntities(components, this._entitiesMap)

  public get entitiesMap() {
    return this._entitiesMap
  }
}
