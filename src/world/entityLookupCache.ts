import {IEntity} from 'entity/types'
import {TComponentConstructors} from 'types'

import {TEntityComponentMap} from './types'

/**
 * Creates entity lookup cache.
 *
 * This is based on WeakMaps, so no manual cleaning is needed.
 */
export const getEntityLookupCache = () => {
  const cache: WeakMap<TEntityComponentMap, WeakMap<TComponentConstructors<any>, readonly IEntity<any>[]>> = new WeakMap()

  return ({
    get: (
      components: TComponentConstructors<any>,
      entitiesMap: TEntityComponentMap
    ) => cache.get(entitiesMap)?.get(components),
    set: (
      components: TComponentConstructors<any>,
      entitiesMap: TEntityComponentMap,
      entities: readonly IEntity<any>[]
    ) => {
      cache.set(entitiesMap, cache.get(entitiesMap)?.set(components, entities) || new WeakMap([[components, entities]]))
    }
  })
}
