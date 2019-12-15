export interface ComponentConstructor<T extends object> {
  new (...args: any): T;
}

export type TSystemComponents = ComponentConstructor<object>[];
