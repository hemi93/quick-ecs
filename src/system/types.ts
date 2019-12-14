import { IEntity } from '../entity/types';
import { ComponentConstructor, TSystemComponents } from '../types';

export interface ISystem<
  T extends TSystemComponents = any,
  TDeps = Record<string, any>
> {
  readonly components: T;
  setComponents(...components: ComponentConstructor<any>[]): void;
  preUpdate(dependencies: TDeps): void;
  update(components: IEntity, dependencies: TDeps): void;
  init(dependencies: TDeps): Promise<void>;
}
