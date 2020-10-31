export type TComponentBase = Record<any, any>

export interface IComponentConstructor<T extends TComponentBase> {
  new (...args: any): T
}

export type TComponentConstructors<T extends TComponentBase[]> = IComponentConstructor<
  ElementType<T>
>[]

export type ElementType<T extends Array<any>> = T extends (infer U)[]
  ? U
  : never
