import { IWorld } from "./world/types";
import World from "./world/World";

export const createWorld = <T extends Record<string, unknown>>(
  dependencies: T
): IWorld<T> => new World(dependencies);
