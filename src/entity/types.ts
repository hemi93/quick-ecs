import {ElementType,IComponentConstructor} from '../types'

export interface IEntity<TComponents extends object[]> {
  /**
   * Entity instance id. Should be used internally only.
   */
  readonly id: string;
  addComponent<U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>,
    initialValues?: ConstructorParameters<IComponentConstructor<U>>
  ): IEntity<TComponents>;
  getComponent<U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>
  ): U;
  /**
   * Use console.debug method to print basic information about this Entity.
   *
   * Make sure you have console.debug level enabled in browser to see the logs!
   */
  debug(): void;
}
