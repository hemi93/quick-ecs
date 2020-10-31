export interface IComponentConstructor<T extends object> {
  new (...args: any): T
}

export type TComponentConstructors<T extends object[]> = IComponentConstructor<
  ElementType<T>
>[]

export type ElementType<T extends Array<any>> = T extends (infer U)[]
  ? U
  : never
