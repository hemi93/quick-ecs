import FakeComponentWithArgs from "../../__tests__/__fakes__/FakeComponentWithArgs.fake";
import FakeComponentWithNoArgs from "../../__tests__/__fakes__/FakeComponentWithNoArgs.fake";
import FakeSystem, {
  TFakeSystemComponents
} from "../../__tests__/__fakes__/FakeSystem";
import Entity from "../../entity/Entity";
import { IEntity } from "../../entity/types";
import { ISystem } from "../../system/types";
import { IEcsWorld } from "../types";
import World from "../World";

type TTestDeps = {
  test: string;
};

describe("World", () => {
  const deps = {
    test: "a"
  };

  type TDependencies = typeof deps;

  let world: IEcsWorld<TDependencies>;

  beforeEach(() => {
    world = new World<TDependencies>(deps);
  });

  describe("addSystem", () => {
    let system: ISystem<TFakeSystemComponents, TTestDeps>;

    beforeEach(() => {
      world.addSystem(FakeSystem);
      system = world.systems[0];
    });

    it("creates and adds system", () => expect(system).toBeDefined());
  });

  describe("createEntity", () => {
    let entity: IEntity<TFakeSystemComponents>;

    beforeEach(() => {
      entity = world.createEntity();
    });

    it("creates valid entity", () => expect(entity).toBeInstanceOf(Entity));

    it("getEntityComponents returns value for created entity", () => {
      expect(world.getEntityComponents(entity)).toEqual(new Map());
    });
  });

  describe("addEntityComponent", () => {
    let entity: IEntity<TFakeSystemComponents>;

    beforeEach(() => {
      entity = world.createEntity();
    });

    describe("for component with initialization arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithArgs, 0, "test");
      });

      it("getComponent in entity returns component", () => {
        expect.assertions(1);
        const component = entity.getComponent(FakeComponentWithArgs);

        if (component) {
          expect(component.arg1).toEqual(0);
        }
      });
    });

    describe("for component with no initialization arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithNoArgs);
      });

      it("getComponent in entity returns component", () => {
        expect.assertions(1);
        const component = entity.getComponent(FakeComponentWithNoArgs);

        if (component) {
          expect(component.value).toBeDefined();
        }
      });
    });
  });

  describe("removeEntityComponent", () => {
    let entity: IEntity<TFakeSystemComponents>;

    beforeEach(() => {
      entity = world.createEntity();
    });

    describe("for component with initialization arguments", () => {
      beforeEach(() => {
        entity.addComponent(FakeComponentWithArgs, 0, "test");
        entity.removeComponent(FakeComponentWithArgs);
      });

      it("getComponent in entity returns component", () => {
        expect.assertions(1);
        const component = entity.getComponent(FakeComponentWithArgs);

        expect(component).toBeUndefined();
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
    let entity: IEntity<TFakeSystemComponents>;

    beforeEach(async () => {
      world.addSystem(FakeSystem);
      entity = world
        .createEntity<TFakeSystemComponents>()
        .addComponent(FakeComponentWithNoArgs)
        .addComponent(FakeComponentWithArgs, 0, "test");
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

  describe("removeEntity", () => {
    let entity: IEntity<TFakeSystemComponents>;

    beforeEach(() => {
      entity = world.createEntity();
      world.removeEntity(entity);
    });

    it("getEntityComponents returns undefined for removed entity", () => {
      expect(world.getEntityComponents(entity)).toEqual(undefined);
    });
  });
});
