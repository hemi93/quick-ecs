import World from "./world/World";
import { IExposedWorld } from "./world/types";

/**
 * Credit: https://stackoverflow.com/a/2117523/12540551
 */
export const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });

export const createWorld = <T extends object>(
  dependencies: T
): IExposedWorld<T> => new World(dependencies);
