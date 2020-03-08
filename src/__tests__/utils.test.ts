import {createWorld, uuidv4} from '../utils'
import World from '../world/World'
import {uuidRegex} from './constants'

describe('utils', () => {
  describe('uuidv4', () => {
    test('generates uuidv4 compliant id', () => {
      const generatedId = uuidv4()
      const match = uuidRegex.test(generatedId)

      expect(match).toBe(true)
    })
  })

  describe('createWorld', () => {
    test('creates world', () => expect(createWorld({})).toBeInstanceOf(World))
  })
})
