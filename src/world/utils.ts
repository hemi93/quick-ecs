import memoize from "memoizee";

import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import { ComponentConstructor, TSystemComponents } from "../types";
import { TEntityComponentMap } from "./types";

/**
 * Check if all components (by names) are present in components map.
 */
const isMatch = (
  entityComponents: Map<string, object>,
  componentNames: ReadonlySet<string>
): boolean => {
  for (const name of componentNames) {
    if (!entityComponents.has(name)) {
      return false;
    }
  }

  return true;
};

/**
 * Finds all Entities that have provided list of Components defined.
 *
 * @param components Collection of components that entity needs to have
 * @param entitiesMap Current World entities map, containing components by entities.
 */
const findEntitiesWithComponents = (
  components: TSystemComponents,
  entitiesMap: TEntityComponentMap
): IEntity[] => {
  const entities: IEntity[] = [];
  const componentNames = new Set(
    Array.from(components.values()).map(v => v.name)
  );

  for (const entity of entitiesMap.keys()) {
    const entityComponents = entitiesMap.get(entity);

    if (entityComponents && isMatch(entityComponents, componentNames)) {
      entities.push(entity);
    }
  }

  return entities;
};

/**
 * Memoized version of findEntitiesWithComponents.
 */
export const collectEntities = memoize(findEntitiesWithComponents);

/**
 * Use this to fall back to empty array of constructor arguments when none are needed and provided.
 */
export const fallbackConstructorArgs = <
  U extends TSystemComponents,
  T extends ComponentConstructor<ISystem<U, any>>
>(
  initialValues?: ConstructorParameters<T>
) => initialValues || ([] as any[]);
