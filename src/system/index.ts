import { TAnyConstructor } from "../types";
import System from "./System";

export { System };

export type ISystem<T extends TAnyConstructor[]> = import("./types").ISystem<T>;
