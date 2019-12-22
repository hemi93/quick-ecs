import { IWorld } from "../types"
import World from "../World"
import { IEntity } from "../../entity/types"
import FakeComponentWithArgs from "../../__tests__/__fakes__/FakeComponentWithArgs.fake"
import FakeComponentWithNoArgs from "../../__tests__/__fakes__/FakeComponentWithNoArgs.fake"
import { collectEntities } from "../utils"

const entity1Components = [FakeComponentWithArgs]

describe("World utils", () => {
  let world: IWorld<any>

  beforeEach(() => {
    world = new World({})
  })

  describe("collectEntities", () => {
    let entity1: IEntity<[FakeComponentWithArgs]>

    beforeEach(() => {
      entity1 = world.createEntity<[FakeComponentWithArgs]>().addComponent(FakeComponentWithArgs, [0])
      world.createEntity<[FakeComponentWithNoArgs]>().addComponent(FakeComponentWithNoArgs)
    })

    it("returns correct set of entities", () => {
      const result = collectEntities(entity1Components, world.getEntitiesMap())

      expect(result).toEqual([entity1])
    })

    it("returns memoized result", () => {
      const getResult = () => collectEntities(entity1Components, world.getEntitiesMap())

      expect(getResult()).toBe(getResult())
    })

    describe("after entities have changed", () => {
      let prevEntities: readonly IEntity<any>[]
      let entity2: IEntity<[FakeComponentWithArgs]>

      beforeEach(() => {
        prevEntities = collectEntities(entity1Components, world.getEntitiesMap())
      })

      describe("when added entities", () => {
        describe("which match", () => {
          beforeEach(() => {
            entity2 = world.createEntity<[FakeComponentWithArgs]>().addComponent(FakeComponentWithArgs, [0])
          })

          it("returns new matching entities", () => {
            expect(collectEntities(entity1Components, world.getEntitiesMap())).toEqual([entity1, entity2])
          })
        })

        describe("which do not match", () => {
          beforeEach(() => {
            world.createEntity<[FakeComponentWithNoArgs]>().addComponent(FakeComponentWithNoArgs)
          })

          it("invalidates cache", () => {
            expect(collectEntities(entity1Components, world.getEntitiesMap())).not.toBe(prevEntities)
          })
        })
      })
    })
  })
})