import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import {
  OneOf,
  IAbstractConstructor,
  TAnyConstructor,
  TAnyConstructors,
  TBaseDependencies
} from "../types";

export type TEntityComponentMap = ReadonlyMap<
  IEntity<TAnyConstructors>,
  ReadonlyMap<string, TAnyConstructor>
>;

/**
 * ECS World.
 *
 * This interface is exposed to outside modules using `quick-ecs`.
 */
export interface IWorld<
  TDependencies extends TBaseDependencies = TBaseDependencies
> {
  /**
   * Add system to World.
   * @param SystemConstructor Constructor of the System.
   */
  addSystem<
    U extends TAnyConstructors,
    T extends IAbstractConstructor<ISystem<U, TDependencies>>
  >(
    SystemConstructor: T
  ): IEcsWorld<TDependencies>;
  /**
   * Create empty Entity.
   */
  createEntity<T extends TAnyConstructors>(): IEntity<T>;
  /**
   * Update all systems.
   */
  update(): void;
  /**
   * Asynchronously initialize all added Systems at the same time.
   */
  init(): Promise<void>;
  /**
   * Remove Entity from World.
   */
  removeEntity<T extends TAnyConstructors>(entity: IEntity<T>): void;
}

/**
 * *Friendly* ECS World
 *
 * Exposes methods that are needed for other classes **inside** quick-ecs.
 */
export interface IEcsWorld<
  TDependencies extends TBaseDependencies = TBaseDependencies
> extends IWorld<TDependencies> {
  /**
   * **Exposed only for tests!**
   */
  readonly systems: ISystem<[], TDependencies>[];
  /**
   * **Exposed only for tests!**
   */
  readonly entitiesMap: TEntityComponentMap;

  /**
   * Create instance of Component and add it to Entity.
   * This doesn't modify Entity, but creates link in World between entity and created component instance.
   *
   * @param entity Entity instance to add component to.
   * @param Component Component constructor.
   * @param initialValues Optional array of initial constructor arguments.
   */
  addEntityComponent<
    TComponents extends TAnyConstructors,
    U extends OneOf<TComponents>
  >(
    entity: IEntity<TComponents>,
    Component: IAbstractConstructor<U>,
    ...initialValues: ConstructorParameters<U>
  ): void;
  /**
   * Get map of Component `name -> instance` linked to given Entity.
   *
   * @param entity Entity instance.
   */
  getEntityComponents<T extends TAnyConstructors>(
    entity: IEntity<T>
  ): ReadonlyMap<string, TAnyConstructor> | undefined;
  /**
   * Create instance of Component and add it to Entity.
   * This doesn't modify Entity, but creates link in World between entity and created component instance.
   *
   * @param entity Entity instance to add component to.
   * @param Component Component constructor.
   * @param initialValues Optional array of initial constructor arguments.
   */
  removeEntityComponent<
    TComponents extends TAnyConstructors,
    U extends OneOf<TComponents>
  >(
    entity: IEntity<TComponents>,
    Component: IAbstractConstructor<U>
  ): void;
}
