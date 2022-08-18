import { OneOf, TAnyConstructor } from "../types";

export interface IEntity<TComponents extends TAnyConstructor[]> {
  /**
   * Create and add Component to Entity.
   */
  addComponent<T extends OneOf<TComponents>>(
    Component: T,
    ...initialValues: ConstructorParameters<T>
  ): IEntity<TComponents>;
  /**
   * Get Component instance assigned to Entity.
   */
  getComponent<T extends OneOf<TComponents>>(
    Component: T
  ): InstanceType<T> | undefined;
  /**
   * Remove Component from Entity.
   */
  removeComponent<U extends OneOf<TComponents>>(
    Component: U
  ): IEntity<TComponents>;
  /**
   * Use console.debug method to print basic information about this Entity.
   *
   * Make sure you have console.debug level enabled in browser to see the logs!
   */
  debug(): void;
}
