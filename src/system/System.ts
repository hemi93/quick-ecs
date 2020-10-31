import {IEntity} from '../entity/types'
import {TComponentBase, TComponentConstructors} from '../types'
import {ISystem} from './types'

export default abstract class System<
  T extends TComponentBase[],
  TDependencies extends TComponentBase = any
  > implements ISystem<T, TDependencies> {
  protected _components: TComponentConstructors<
    T
  > = ([] as unknown) as TComponentConstructors<T>

  public get components(): TComponentConstructors<T> {
    return this._components
  }

  public setComponents = (...components: TComponentConstructors<T>): this => {
    this._components = components

    return this
  }

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
  public abstract update(entity: IEntity<T>, dependencies: TDependencies): void
}
