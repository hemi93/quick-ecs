import FakeComponentWithArgs from "../../__fakes__/FakeComponentWithArgs.fake";
import FakeComponentWithNoArgs from "../../__fakes__/FakeComponentWithNoArgs.fake";
import FakeSystem, {
  TFakeSystemWithNoArgsComponents
} from "../../__fakes__/FakeSystem";
import Entity from "../../entity/Entity";
import { IEntity } from "../../entity/types";
import { ISystem } from "../../system/types";
import { IWorld } from "../types";
import World from "../World";

describe("World", () => {
  const deps = {
    test: "a"
  };

  type TDependencies = typeof deps;

  let world: IWorld<TDependencies>;

  beforeEach(() => {
    world = new World<TDependencies>(deps);
  });

  describe("addSystem", () => {
    let system: ISystem<TFakeSystemWithNoArgsComponents>;

    beforeEach(() => {
      world.addSystem(FakeSystem);
      system = world.systems[0];
    });

    it("creates and adds system", () => expect(system).toBeDefined());
  });

  describe("createEntity", () => {
    let entity: IEntity<TFakeSystemWithNoArgsComponents>;

    beforeEach(() => {
      entity = world.createEntity();
    });

    it("creates valid entity", () => expect(entity).toBeInstanceOf(Entity));

    it("getEntityComponents returns value for created entity", () => {
      expect(world.getEntityComponents(entity)).toEqual(new Map());
    });
  });

  describe("addEntityComponent", () => {
    let entity: IEntity<TFakeSystemWithNoArgsComponents>;

    beforeEach(() => {
      entity = world.createEntity();
    });

    describe("for component with initialization arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithArgs, [0]);
      });

      it("getComponent in entity returns component", () => {
        const { args } = entity.getComponent(FakeComponentWithArgs);

        expect(args).toEqual(0);
      });
    });

    describe("for component with no initialization arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithNoArgs);
      });

      it("getComponent in entity returns component", () => {
        const { value } = entity.getComponent(FakeComponentWithNoArgs);

        expect(value).toBeDefined();
      });
    });
  });

  describe("init", () => {
    let systemInitSpy: jest.SpyInstance;

    beforeEach(async () => {
      world.addSystem(FakeSystem);
      systemInitSpy = jest.spyOn(world.systems[0], "init");

      await world.init();
    });

    it("initializes systems with dependencies", () =>
      expect(systemInitSpy).toHaveBeenCalledWith(deps));
  });

  describe("update", () => {
    let systemUpdateSpy: jest.SpyInstance;
    let systemPreUpdateSpy: jest.SpyInstance;
    let entity: IEntity<TFakeSystemWithNoArgsComponents>;

    beforeEach(async () => {
      world.addSystem(FakeSystem);
      entity = world
        .createEntity<TFakeSystemWithNoArgsComponents>()
        .addComponent(FakeComponentWithNoArgs)
        .addComponent(FakeComponentWithArgs);
      systemUpdateSpy = jest.spyOn(world.systems[0], "update");
      systemPreUpdateSpy = jest.spyOn(world.systems[0], "preUpdate");
      await world.init();
      world.update();
    });

    it("runs preUpdate with deps", () =>
      expect(systemPreUpdateSpy).toHaveBeenCalledWith(deps));

    it("runs update with matching entity and deps", () =>
      expect(systemUpdateSpy).toHaveBeenCalledWith(entity, deps));
  });
});
