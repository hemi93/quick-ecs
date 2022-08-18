import FakeComponentWithArgs from "../../__tests__/__fakes__/FakeComponentWithArgs.fake";
import FakeComponentWithNoArgs from "../../__tests__/__fakes__/FakeComponentWithNoArgs.fake";
import { IEntity } from "../../entity/types";
import { IEcsWorld } from "../types";
import { collectEntities } from "../utils";
import World from "../World";

const entity1Components = [FakeComponentWithArgs];

describe("World utils", () => {
  let world: IEcsWorld;

  beforeEach(() => {
    world = new World({});
  });

  describe("collectEntities", () => {
    let entity1: IEntity<[typeof FakeComponentWithArgs]>;

    beforeEach(() => {
      entity1 = world
        .createEntity<[typeof FakeComponentWithArgs]>()
        .addComponent(FakeComponentWithArgs, 0, "test");
      world
        .createEntity<[typeof FakeComponentWithNoArgs]>()
        .addComponent(FakeComponentWithNoArgs);
    });

    it("returns correct set of entities", () => {
      const result = collectEntities(entity1Components, world.entitiesMap);

      expect(result).toEqual([entity1]);
    });

    it("returns memoized result", () => {
      const getResult = () =>
        collectEntities(entity1Components, world.entitiesMap);

      expect(getResult()).toBe(getResult());
    });

    describe("after entities have changed", () => {
      let prevEntities: readonly IEntity<[typeof FakeComponentWithArgs]>[];
      let entity2: IEntity<[typeof FakeComponentWithArgs]>;

      beforeEach(() => {
        prevEntities = collectEntities(entity1Components, world.entitiesMap);
      });

      describe("when added entities", () => {
        describe("which match", () => {
          beforeEach(() => {
            entity2 = world
              .createEntity<[typeof FakeComponentWithArgs]>()
              .addComponent(FakeComponentWithArgs, 0, "test");
          });

          it("returns new matching entities", () => {
            expect(
              collectEntities(entity1Components, world.entitiesMap)
            ).toEqual([entity1, entity2]);
          });
        });

        describe("which do not match", () => {
          beforeEach(() => {
            world
              .createEntity<[typeof FakeComponentWithNoArgs]>()
              .addComponent(FakeComponentWithNoArgs);
          });

          it("invalidates cache", () => {
            expect(
              collectEntities(entity1Components, world.entitiesMap)
            ).not.toBe(prevEntities);
          });
        });
      });
    });
  });
});
