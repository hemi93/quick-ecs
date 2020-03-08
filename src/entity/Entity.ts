import {ElementType,IComponentConstructor} from '../types'
import {uuidv4} from '../utils'
import {IWorld} from '../world/types'
import {IEntity} from './types'

export default class Entity<TComponents extends object[]>
  implements IEntity<TComponents> {
  private readonly _id: string;
  private readonly _world: IWorld;

  constructor(world: IWorld) {
    this._world = world
    this._id = uuidv4()
  }

  public get id() {
    return this._id
  }

  public addComponent = <U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>,
    initialValues?: ConstructorParameters<IComponentConstructor<U>>
  ): IEntity<TComponents> => {
    this._world.addEntityComponent<TComponents, U>(
      this,
      Component,
      initialValues
    )

    return this
  };

  public getComponent = <U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>
  ): U => {
    const componentInstance = this._world.getEntityComponents(this)?.get(Component.name)

    if (!componentInstance) {
      throw new Error(`Entity "${this.id}" does not have "${Component.name}"!`)
    }

    return componentInstance as U
  };

  /* istanbul ignore next */
  public debug = () => {
    console.debug({
      id: this.id,
      components: this._world.getEntityComponents<TComponents>(this)
    })
  };
}
