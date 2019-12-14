import World from "./world/World";
import { IExposedWorld } from "./world/types";
import { System } from "./system";
export * from "./system";

const createWorld = <T extends object>(dependencies: T): IExposedWorld => {
  const world = new World(dependencies);

  return world;
};

export type ComponentConstructor<T> = import("./types").ComponentConstructor<T>;
export type TSystemComponents = import("./types").TSystemComponents;
export type IEntity = import("./entity/types").IEntity;
export type IWorld = import("./world/types").IExposedWorld;
export type ISystem = import("./system/types").ISystem;

export { createWorld, System };
