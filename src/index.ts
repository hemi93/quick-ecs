import { System } from "./system";
import { createWorld } from "./utils";
export * from "./system";

export type TSystemComponents<
  T extends object[]
> = import("./types").TComponentConstructors<T>;

export type IEntity<T extends object[]> = import("./entity/types").IEntity<T>;

export type IWorld<
  TDependencies extends object = object
> = import("./world/types").IExposedWorld<TDependencies>;

export type ISystem<T extends object[]> = import("./system/types").ISystem<T>;

export { createWorld, System };
