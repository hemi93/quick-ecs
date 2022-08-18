import { System } from "./system";
import { createWorld } from "./utils";
export * from "./system";

export type TAnyConstructors = import("./types").TAnyConstructors;

export type IEntity<T extends TAnyConstructors> =
  import("./entity/types").IEntity<T>;

export type IWorld<TDependencies extends object = object> =
  import("./world/types").IWorld<TDependencies>;

export type ISystem<T extends TAnyConstructors> =
  import("./system/types").ISystem<T>;

export { createWorld, System };
