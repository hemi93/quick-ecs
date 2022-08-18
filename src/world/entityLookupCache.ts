import { IEntity } from "entity/types";
import { TAnyConstructor } from "types";

import { TEntityComponentMap } from "./types";

interface IEntityLookupCache {
  get: (
    components: TAnyConstructor[],
    entitiesMap: TEntityComponentMap
  ) => readonly IEntity<[]>[] | undefined;
  set: (
    components: TAnyConstructor[],
    entitiesMap: TEntityComponentMap,
    entities: readonly IEntity<[]>[]
  ) => void;
}

/**
 * Creates entity lookup cache.
 *
 * This is based on WeakMaps, so no manual cleaning is needed.
 * @important Make sure components array is always the same instance for given set of entities.
 */
export const getEntityLookupCache = (): IEntityLookupCache => {
  const cache: WeakMap<
    TEntityComponentMap,
    WeakMap<TAnyConstructor[], readonly IEntity<[]>[]>
  > = new WeakMap();

  return {
    get: (components: TAnyConstructor[], entitiesMap: TEntityComponentMap) =>
      cache.get(entitiesMap)?.get(components),
    set: (
      components: TAnyConstructor[],
      entitiesMap: TEntityComponentMap,
      entities: readonly IEntity<[]>[]
    ) => {
      cache.set(
        entitiesMap,
        cache.get(entitiesMap)?.set(components, entities) ||
          new WeakMap([[components, entities]])
      );
    }
  };
};
