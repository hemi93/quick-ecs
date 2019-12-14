import { ComponentConstructor } from '../types';

export interface IEntity {
  readonly id: string;
  addComponent<T extends ComponentConstructor<object>>(
    Component: T,
    initialValues: ConstructorParameters<T>
  ): IEntity;
  getComponent<T extends object>(Component: ComponentConstructor<T>): T;
  debug(): void;
}
