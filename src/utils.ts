import { TBaseDependencies } from "types";
import { IWorld } from "./world/types";
import World from "./world/World";

export const createWorld = <TDeps extends TBaseDependencies>(
  dependencies: TDeps
): IWorld<TDeps> => new World(dependencies);
