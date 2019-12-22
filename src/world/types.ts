import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import { IComponentConstructor, ElementType } from "../types";

export type TEntityComponentMap = ReadonlyMap<IEntity<object[]>, ReadonlyMap<string, object>>;

/**
 * ECS World.
 * 
 * This interface is exposed to modules using quick-ecs from outside.
 */
export interface IExposedWorld<TDependencies extends object> {
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
  ): IWorld<TDependencies>;
  /**
   * Create empty Entity.
   */
  createEntity<T extends object[]>(): IEntity<T>;
  /**
   * Update all systems.
   */
  update(): void;
  /**
   * Asynchronously initialize all World's Systems.
   */
  init(): Promise<void>;
  removeEntity(entity: IEntity<any>): void;
}

/**
 * *Friendly* ECS World
 * 
 * Exposes methods that are needed for other classes **inside** quick-ecs.
 */
export interface IWorld<TDependencies extends object = object>
  extends IExposedWorld<TDependencies> {
  /**
   * Mostly exposed for tests.
   */
  readonly systems: ISystem<any, TDependencies>[];
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
  ): void;
  /**
   * Get map of Component name -> Component instance linked to given Entity.
   *
   * @param entity Entity instance.
   */
  getEntityComponents<T extends object[]>(
    entity: IEntity<T>
  ): ReadonlyMap<string, object> | undefined;
}
