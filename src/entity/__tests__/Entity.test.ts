import FakeComponentWithNoArgs from '../../__tests__/__fakes__/FakeComponentWithNoArgs.fake'
import {IEcsWorld} from '../../world/types'
import World from '../../world/World'
import {IEntity} from '../types'

describe('Entity', () => {
  let world: IEcsWorld
  let entity: IEntity<[FakeComponentWithNoArgs]>

  beforeEach(() => {
    world = new World({})
    entity = world.createEntity()
  })

  describe('addComponent/getComponent', () => {
    it('adds component instance', () => {
      entity.addComponent(FakeComponentWithNoArgs)

      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeInstanceOf(FakeComponentWithNoArgs)
    })
  })

  describe('getComponent', () => {
    it('returns undefined when trying to get Component which has not been added to entity', () => {
      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeUndefined()
    })
  })

  describe('addComponent/removeComponent', () => {
    it('adds component instance', () => {
      entity.addComponent(FakeComponentWithNoArgs)
      entity.removeComponent(FakeComponentWithNoArgs)

      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeUndefined()
    })
  })
})
