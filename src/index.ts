import { System } from "./system";
import { createWorld } from "./utils";
export * from "./system";

export type ComponentConstructor<T> = import("./types").ComponentConstructor<T>;
export type TSystemComponents = import("./types").TSystemComponents;
export type IEntity = import("./entity/types").IEntity;
export type IWorld<
  TDependencies extends object = object
> = import("./world/types").IExposedWorld<TDependencies>;
export type ISystem = import("./system/types").ISystem;

export { createWorld, System };
