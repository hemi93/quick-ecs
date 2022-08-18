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
import FakeSystemSingleComponent, {
  TFakeSystemSingleComponents
} from "../../__tests__/__fakes__/FakeSystemSingleComponent";

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
    let system1UpdateSpy: jest.SpyInstance;
    let system2UpdateSpy: jest.SpyInstance;
    let system1PreUpdateSpy: jest.SpyInstance;
    let entity1: IEntity<TFakeSystemComponents>;
    let entity2: IEntity<TFakeSystemSingleComponents>;

    beforeEach(async () => {
      world.addSystem(FakeSystem);
      world.addSystem(FakeSystemSingleComponent);
      entity1 = world
        .createEntity<TFakeSystemComponents>()
        .addComponent(FakeComponentWithNoArgs)
        .addComponent(FakeComponentWithArgs, 0, "test");
      entity2 = world
        .createEntity<TFakeSystemSingleComponents>()
        .addComponent(FakeComponentWithArgs, 0, "test");
      system1UpdateSpy = jest.spyOn(world.systems[0], "update");
      system1PreUpdateSpy = jest.spyOn(world.systems[0], "preUpdate");

      system2UpdateSpy = jest.spyOn(world.systems[1], "update");
      await world.init();
      world.update();
    });

    it("runs preUpdate with deps", () =>
      expect(system1PreUpdateSpy).toHaveBeenCalledWith(deps));

    it("tuns system 1 update only for matching entity", () =>
      expect(system1UpdateSpy).toHaveBeenCalledTimes(1));

    it("runs system 1 update with matching entity and deps", () =>
      expect(system1UpdateSpy).toHaveBeenCalledWith(entity1, deps));

    it("tuns system 2 update for both matching entities", () =>
      expect(system2UpdateSpy).toHaveBeenCalledTimes(2));

    it("runs system 2 update with matching entity and deps", () =>
      expect(system2UpdateSpy).toHaveBeenNthCalledWith(1, entity1, deps));

    it("runs system 2 update with matching entity and deps", () =>
      expect(system2UpdateSpy).toHaveBeenNthCalledWith(2, entity2, deps));
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
