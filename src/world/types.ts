import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import { ComponentConstructor, TSystemComponents } from "../types";

export type TEntityComponentMap = Map<IEntity, Map<string, object>>;

/**
 * ECS World.
 */
export interface IExposedWorld<TDependencies extends object> {
  /**
   * Add system to World.
   * @param SystemConstructor Constructor of the System.
   * @param initialValues Array of optional initial values that will be passed to System constructor.
   */
  addSystem<
    U extends TSystemComponents,
    T extends ComponentConstructor<ISystem<U, TDependencies>>
  >(
    SystemConstructor: T
  ): IWorld<TDependencies>;
  /**
   * Create empty Entity.
   */
  createEntity(): IEntity;
  /**
   * Update all systems.
   */
  update(): void;
  /**
   * Asynchronously initialize all World's Systems.
   */
  init(): Promise<void>;
}

/**
 * "Friendly" ECS World, exposes methods that are needed for other classes inside quick-ecs.
 */
export interface IWorld<TDependencies extends object = object>
  extends IExposedWorld<TDependencies> {
  /**
   * Mostly exposed for tests.
   */
  readonly systems: ISystem[];
  /**
   * Create instance of Component and add it to Entity.
   * This doesn't modify Entity, but creates link in World between entity and created component instance.
   *
   * @param entity Entity instance to add component to.
   * @param Component Component constructor.
   * @param initialValues Optional array of initial constructor arguments.
   */
  addEntityComponent<U extends object, T extends ComponentConstructor<U>>(
    entity: IEntity,
    Component: T,
    initialValues?: ConstructorParameters<T>
  ): void;
  /**
   * Get map of Component name -> Component instance linked to given Entity.
   *
   * @param entity Entity instance.
   */
  getEntityComponents(entity: IEntity): Map<string, object> | undefined;
}
