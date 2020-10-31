import {createWorld} from '../utils'
import World from '../world/World'

describe('createWorld', () => {
  test('creates world', () => expect(createWorld({})).toBeInstanceOf(World))
})
