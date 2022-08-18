import { TAnyConstructors, TBaseDependencies } from "../types";
import System from "./System";

export { System };

export type ISystem<
  T extends TAnyConstructors,
  TDeps extends TBaseDependencies = TBaseDependencies
> = import("./types").ISystem<T, TDeps>;
