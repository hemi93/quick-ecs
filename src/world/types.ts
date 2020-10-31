import {IEntity} from '../entity/types'
import {ISystem} from '../system/types'
import {ElementType,IComponentConstructor} from '../types'

export type TEntityComponentMap = ReadonlyMap<IEntity<object[]>, ReadonlyMap<string, object>>

/**
 * ECS World.
 *
 * This interface is exposed to outside modules using `quick-ecs`.
 */
export interface IWorld<TDependencies extends object> {
  /**
   * Add system to World.
   * @param SystemConstructor Constructor of the System.
   * @param initialValues Array of optional initial values that will be passed to System constructor.
   */
  addSystem<
    U extends object[],
    T extends IComponentConstructor<ISystem<U, TDependencies>>
  >(
    SystemConstructor: T
  ): IEcsWorld<TDependencies>
  /**
   * Create empty Entity.
   */
  createEntity<T extends object[]>(): IEntity<T>
  /**
   * Update all systems.
   */
  update(): void
  /**
   * Asynchronously initialize all added Systems at the same time.
   */
  init(): Promise<void>
  /**
   * Remove Entity from World.
   */
  removeEntity(entity: IEntity<any>): void
}

/**
 * *Friendly* ECS World
 *
 * Exposes methods that are needed for other classes **inside** quick-ecs.
 */
export interface IEcsWorld<TDependencies extends object = object>
  extends IWorld<TDependencies> {
  /**
   * **Exposed only for tests!**
   */
  readonly systems: ISystem<any, TDependencies>[]
  /**
  * **Exposed only for tests!**
  */
  readonly entitiesMap: TEntityComponentMap

  /**
   * Create instance of Component and add it to Entity.
   * This doesn't modify Entity, but creates link in World between entity and created component instance.
   *
   * @param entity Entity instance to add component to.
   * @param Component Component constructor.
   * @param initialValues Optional array of initial constructor arguments.
   */
  addEntityComponent<
    TComponents extends object[],
    U extends ElementType<TComponents>
  >(
    entity: IEntity<TComponents>,
    Component: IComponentConstructor<U>,
    initialValues?: ConstructorParameters<IComponentConstructor<U>>
  ): void
  /**
   * Get map of Component `name -> instance` linked to given Entity.
   *
   * @param entity Entity instance.
   */
  getEntityComponents<T extends object[]>(
    entity: IEntity<T>
  ): ReadonlyMap<string, object> | undefined
    /**
   * Create instance of Component and add it to Entity.
   * This doesn't modify Entity, but creates link in World between entity and created component instance.
   *
   * @param entity Entity instance to add component to.
   * @param Component Component constructor.
   * @param initialValues Optional array of initial constructor arguments.
   */
  removeEntityComponent<
    TComponents extends object[],
    U extends ElementType<TComponents>
  >(
    entity: IEntity<TComponents>,
    Component: IComponentConstructor<U>
  ): void
}
