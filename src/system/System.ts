import { IEntity } from "../entity/types";
import { TSystemComponents } from "../types";
import { ISystem } from "./types";

export default abstract class System<
  T extends TSystemComponents,
  TDependencies extends object = any
> implements ISystem<T, TDependencies> {
  protected _components: T = ([] as unknown) as T;

  public get components() {
    return this._components;
  }

  public setComponents = (...components: T) => {
    this._components = components;

    return this;
  };

  public async init(_dependencies: TDependencies) {
    // Optionally override in deriving class
  }

  public preUpdate(_dependencies: TDependencies) {
    // Optionally override in deriving class
  }

  /**
   * Override this function with actual behavior for entities containing System Components.
   */
  public abstract update(entity: IEntity, dependencies: TDependencies): void;
}
