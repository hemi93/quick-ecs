import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import { IComponentConstructor, TComponentConstructors } from "../types";
import { TEntityComponentMap } from "./types";

const cache: WeakMap<TComponentConstructors<any>, WeakMap<TEntityComponentMap, readonly IEntity<any>[]>> = new WeakMap()

const getFromCache = (
  components: TComponentConstructors<any>,
  entitiesMap: TEntityComponentMap
) => cache.get(components)?.get(entitiesMap)

const addToCache = (
  components: TComponentConstructors<any>,
  entitiesMap: TEntityComponentMap,
  entities: readonly IEntity<any>[]
) => {
  cache.set(components, cache.get(components)?.set(entitiesMap, entities) || new WeakMap([[entitiesMap, entities]]))
}


/**
 * Check if all components (by names) are present in components map.
 */
const isMatch = (
  entityComponents: ReadonlyMap<string, object>,
  components: TComponentConstructors<any>
) =>
  components.every(({ name }) => entityComponents.has(name));

/**
 * Finds all Entities that have provided list of Components defined.
 *
 * @param components Collection of components that entity needs to have
 * @param entitiesMap Current World entities map, containing components by entities.
 */
export const collectEntities = (
  components: TComponentConstructors<any>,
  entitiesMap: TEntityComponentMap
): readonly IEntity<any>[] => {
  const cached = getFromCache(components, entitiesMap)

  if (cached) {
    return cached
  }

  const entities: IEntity<any>[] = [];

  for (const entity of entitiesMap.keys()) {
    const entityComponents = entitiesMap.get(entity);

    if (entityComponents && isMatch(entityComponents, components)) {
      entities.push(entity);
    }
  }

  addToCache(components, entitiesMap, entities)

  return entities;
};

/**
 * Use this to fall back to empty array of constructor arguments when none are needed and provided.
 */
export const fallbackConstructorArgs = <
  U extends object[],
  T extends IComponentConstructor<ISystem<U, any>>
>(
  initialValues?: ConstructorParameters<T>
) => initialValues || ([] as any[]);
