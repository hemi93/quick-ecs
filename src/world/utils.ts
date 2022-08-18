import { IEntity } from "../entity/types";
import {
  TAnyConstructor,
  TAnyConstructors,
  TComponentConstructors
} from "../types";
import { getEntityLookupCache } from "./entityLookupCache";
import { TEntityComponentMap } from "./types";

const cache = getEntityLookupCache();

/**
 * Check if all components (by names) are present in components map.
 */
const isMatch = <T extends TAnyConstructors>(
  entityComponents: ReadonlyMap<string, TAnyConstructor>,
  components: TComponentConstructors<T>
) => components.every(({ name }) => entityComponents.has(name));

/**
 * Finds all Entities that have provided list of Components defined.
 *
 * @param components Collection of components that entity needs to have
 * @param entitiesMap World's current entities map, containing components by entities.
 */
export const collectEntities = <T extends TAnyConstructors>(
  components: TAnyConstructors,
  entitiesMap: TEntityComponentMap
): readonly IEntity<T>[] => {
  const cached = cache.get(components, entitiesMap);

  if (cached) {
    return cached;
  }

  const entities: IEntity<T>[] = [];

  for (const [entity, entityComponents] of entitiesMap) {
    if (entityComponents && isMatch(entityComponents, components)) {
      entities.push(entity);
    }
  }

  cache.set(components, entitiesMap, entities);

  return entities;
};
