import { IEntity } from "../entity/types";
import { TAnyConstructor, TComponentConstructors } from "../types";
import { ISystem } from "./types";

export default abstract class System<
  TComponentBases extends TAnyConstructor[],
  TDependencies extends Record<string, unknown>
> implements ISystem<TComponentBases, TDependencies>
{
  protected _components: TComponentConstructors<TComponentBases> =
    [] as TComponentConstructors<TComponentBases>;

  public get components(): TComponentConstructors<TComponentBases> {
    return this._components;
  }

  public setComponents = (...components: TComponentBases): this => {
    this._components = components;

    return this;
  };

  /* istanbul ignore next */
  public async init(_dependencies: TDependencies): Promise<void> {
    // Optionally override in deriving class
  }

  /* istanbul ignore next */
  public preUpdate(_dependencies: TDependencies): void {
    // Optionally override in deriving class
  }

  /**
   * Override this function with actual behavior for entities containing System Components.
   */
  public abstract update(
    entity: IEntity<TComponentBases>,
    dependencies: TDependencies
  ): void;
}
