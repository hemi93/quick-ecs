import {ElementType,IComponentConstructor, TComponentBase} from '../types'

export interface IEntity<TComponents extends TComponentBase[]> {
  /**
   * Create and add Component to Entity.
   */
  addComponent<U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>,
    initialValues?: ConstructorParameters<IComponentConstructor<U>>
  ): IEntity<TComponents>
    /**
   * Get Component instance assigned to Entity.
   */
  getComponent<U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>
  ): U | undefined
  /**
   * Remove Component from Entity.
   */
  removeComponent<U extends ElementType<TComponents>>(
    Component: IComponentConstructor<U>
  ): IEntity<TComponents>
  /**
   * Use console.debug method to print basic information about this Entity.
   *
   * Make sure you have console.debug level enabled in browser to see the logs!
   */
  debug(): void
}
