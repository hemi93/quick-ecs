import { IEntity } from "../entity/types";
import { ComponentConstructor, TSystemComponents } from "../types";

export interface ISystem<
  T extends TSystemComponents = any,
  TSystemDependencies = Record<string, any>
> {
  /**
   * Array of System Component constructors used to fetch System Entities from World.
   */
  readonly components: T;
  /**
   * Set components for System.
   *
   * **IMPORTANT** Remember to call this in System's constructor!
   */
  setComponents(...components: ComponentConstructor<any>[]): void;
  /**
   * Runs immediately before `update()` function for this system.
   *
   * This function implementation is **NOT REQUIRED**.
   *
   * Can be used to pre-compute some internal state needed when updating system entities.
   *
   * @param dependencies Dependencies passed to World on its creation.
   */
  preUpdate(dependencies: TSystemDependencies): void;
  /**
   * Update individual Entity for this System.
   * Called for each Entity for this System on each update loop.
   *
   * This function implementation is **REQUIRED**.
   *
   * Access Entity Components instances through Entity `getComponent` method.
   * @param entity Instance of the entity to update.
   * @param dependencies Dependencies passed to World on its creation.
   */
  update(entity: IEntity, dependencies: TSystemDependencies): void;
  /**
   * Asynchronously set up this System.
   *
   * This function implementation is **NOT REQUIRED**.
   *
   * Use this to prepare some internal state needed for this System to operate.
   *
   * @param dependencies Dependencies passed to World on its creation.
   */
  init(dependencies: TSystemDependencies): Promise<void>;
}
