import { ComponentConstructor } from "../types";

export interface IEntity {
  /**
   * Entity instance id. Should be used internally only.
   */
  readonly id: string;
  addComponent<T extends ComponentConstructor<object>>(
    Component: T,
    initialValues?: ConstructorParameters<T>
  ): IEntity;
  getComponent<T extends object>(Component: ComponentConstructor<T>): T;
  /**
   * Use console.debug method to print basic information about this Entity.
   *
   * Make sure you have console.debug level enabled in browser to see the logs!
   */
  debug(): void;
}
