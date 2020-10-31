import Entity from '../entity/Entity'
import {IEntity} from '../entity/types'
import {ISystem} from '../system/types'
import {IComponentConstructor, TComponentBase, TComponentConstructors} from '../types'
import {IEcsWorld, TEntityComponentMap} from './types'
import {collectEntities, fallbackConstructorArgs} from './utils'

export default class World<TDependencies extends TComponentBase>
  implements IEcsWorld<TDependencies> {
  private _entitiesMap: TEntityComponentMap
  private readonly _dependencies: TDependencies
  private readonly _systems: ISystem<any, TDependencies>[] = []

  public get systems(): ISystem<any, TDependencies>[] {
    return this._systems
  }

  public get entitiesMap(): TEntityComponentMap {
    return this._entitiesMap
  }

  constructor(dependencies: TDependencies) {
    this._dependencies = dependencies
    this._entitiesMap = new Map()
  }

  public addSystem = <
    U extends TComponentBase[],
    T extends IComponentConstructor<ISystem<U, TDependencies>>
  >(
    Constructor: T
  ): IEcsWorld<TDependencies> => {
    this._systems.push(new Constructor())

    return this
  }

  public createEntity = <T extends TComponentBase[]>(): IEntity<T> => {
    const entity = new Entity(this)
    this._entitiesMap = new Map(this._entitiesMap).set(entity, new Map())

    return entity
  }

  public addEntityComponent = <
    U extends TComponentBase,
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
    U extends TComponentBase,
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

  public init = async (): Promise<void> => {
    for (const system of this._systems) {
      await system.init(this._dependencies)
    }
  }

  public update = (): void => {
    for (const system of this._systems) {
      system.preUpdate(this._dependencies)

      for (const entity of this.getEntities(system.components)) {
        system.update(entity, this._dependencies)
      }
    }
  }

  public removeEntity = (entity: IEntity<any>): void => {
    const newEntitiesMap = new Map(this._entitiesMap)
    newEntitiesMap.delete(entity)
    this._entitiesMap = newEntitiesMap
  }

  public getEntityComponents = (entity: IEntity<any>): ReadonlyMap<string, TComponentBase> | undefined =>
    this._entitiesMap.get(entity)


  private getEntities = <T extends TComponentBase[]>(
    components: TComponentConstructors<T>
  ) => collectEntities(components, this._entitiesMap)
}
