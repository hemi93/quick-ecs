import { IWorld } from "../../world/types"
import World from "../../world/World"
import { IEntity } from "../types"
import FakeComponentWithNoArgs from "../../__tests__/__fakes__/FakeComponentWithNoArgs.fake"
import { uuidRegex } from "../../__tests__/constants"

describe("Entity", () => {
  let world: IWorld
  let entity: IEntity<[FakeComponentWithNoArgs]>

  beforeEach(() => {
    world = new World({})
    entity = world.createEntity()
  })

  describe("addComponent/getComponent", () => {
    it("adds component instance", () => {
      entity.addComponent(FakeComponentWithNoArgs)

      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeInstanceOf(FakeComponentWithNoArgs)
    })
  })

  describe("getComponent", () => {
    it("throws when trying to get component which has not been added to entity", () => {
      expect(() => entity.getComponent(FakeComponentWithNoArgs)).toThrow()
    })
  })

  describe("id getter", () => {
    it("returns id matching uuid schema", () =>
      expect(uuidRegex.test(entity.id)).toBe(true)
    )
  })
})