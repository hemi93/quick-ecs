import {IEntity} from '../entity/types'
import {ISystem} from '../system/types'
import {IComponentConstructor, TComponentBase, TComponentConstructors} from '../types'
import {getEntityLookupCache} from './entityLookupCache'
import {TEntityComponentMap} from './types'

const cache = getEntityLookupCache()

/**
 * Check if all components (by names) are present in components map.
 */
const isMatch = (
  entityComponents: ReadonlyMap<string, TComponentBase>,
  components: TComponentConstructors<any>
) =>
  components.every(({name}) => entityComponents.has(name))

/**
 * Finds all Entities that have provided list of Components defined.
 *
 * @param components Collection of components that entity needs to have
 * @param entitiesMap World's current entities map, containing components by entities.
 */
export const collectEntities = (
  components: TComponentConstructors<any>,
  entitiesMap: TEntityComponentMap
): readonly IEntity<any>[] => {
  const cached = cache.get(components, entitiesMap)

  if (cached) {
    return cached
  }

  const entities: IEntity<any>[] = []

  for (const [entity, entityComponents] of entitiesMap) {
    if (entityComponents && isMatch(entityComponents, components)) {
      entities.push(entity)
    }
  }

  cache.set(components, entitiesMap, entities)

  return entities
}

/**
 * Use this to fall back to empty array of constructor arguments when none are needed and provided.
 */
export const fallbackConstructorArgs = <
  U extends TComponentBase[],
  T extends IComponentConstructor<ISystem<U, any>>
>(
  initialValues?: ConstructorParameters<T>
): ConstructorParameters<T> => initialValues || ([] as ConstructorParameters<T>)
