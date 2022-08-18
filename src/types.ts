/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type TAnyConstructor = new (...args: any[]) => any;

export type TAnyConstructors = TAnyConstructor[];

export interface IAbstractConstructor<T extends object> {
  new (...args: any): T;
}

export type TComponentConstructors<T extends TAnyConstructors> =
  IAbstractConstructor<OneOf<T>>[];

export type OneOf<T extends Array<any>> = T extends (infer U)[] ? U : never;

export type TBaseDependencies = object;
