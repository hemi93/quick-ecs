import FakeComponentWithNoArgs from "../../__tests__/__fakes__/FakeComponentWithNoArgs.fake";
import { IEcsWorld } from "../../world/types";
import World from "../../world/World";
import { IEntity } from "../types";
import FakeComponentWithArgs from "../../__tests__/__fakes__/FakeComponentWithArgs.fake";

describe("Entity", () => {
  let world: IEcsWorld;
  let entity: IEntity<
    [typeof FakeComponentWithNoArgs, typeof FakeComponentWithArgs]
  >;

  beforeEach(() => {
    world = new World({});
    entity = world.createEntity();
  });

  describe("addComponent/getComponent", () => {
    it("adds component instance", () => {
      entity.addComponent(FakeComponentWithNoArgs);

      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeInstanceOf(
        FakeComponentWithNoArgs
      );
    });

    describe("adding component with arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithArgs, 1, "test");
      });

      it("adds component instance with arguments", () => {
        expect(entity.getComponent(FakeComponentWithArgs)).toBeInstanceOf(
          FakeComponentWithArgs
        );
      });

      it("has correct first argument", () => {
        expect(entity.getComponent(FakeComponentWithArgs)?.arg1).toEqual(1);
      });

      it("has correct second argument", () => {
        expect(entity.getComponent(FakeComponentWithArgs)?.arg2).toEqual(
          "test"
        );
      });
    });
  });

  describe("getComponent", () => {
    it("returns undefined when trying to get Component which has not been added to entity", () => {
      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeUndefined();
    });
  });

  describe("addComponent/removeComponent", () => {
    it("adds component instance", () => {
      entity.addComponent(FakeComponentWithNoArgs);
      entity.removeComponent(FakeComponentWithNoArgs);

      expect(entity.getComponent(FakeComponentWithNoArgs)).toBeUndefined();
    });
  });
});
