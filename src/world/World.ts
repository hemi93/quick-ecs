import Entity from "../entity/Entity";
import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import { ComponentConstructor, TSystemComponents } from "../types";
import { IWorld, TEntityComponentMap } from "./types";
import { collectEntities, fallbackConstructorArgs } from "./utils";

export default class World<TDependencies extends object> implements IWorld {
  private _entitiesMap: TEntityComponentMap;
  private readonly _dependencies: TDependencies;
  private readonly _systems: ISystem[] = [];

  constructor(dependencies: TDependencies) {
    this._dependencies = dependencies;
    this._entitiesMap = new Map();
  }

  public addSystem = <
    U extends TSystemComponents,
    T extends ComponentConstructor<ISystem<U, TDependencies>>
  >(
    Constructor: T,
    initialValues?: ConstructorParameters<T>
  ): IWorld => {
    const instance = new Constructor(...fallbackConstructorArgs(initialValues));

    this._systems.push(instance);

    return this;
  };

  public createEntity = (): IEntity => {
    const entity = new Entity(this);
    this.entitiesMap = new Map(this._entitiesMap).set(entity, new Map());

    return entity;
  };

  public addEntityComponent = <
    U extends object,
    T extends ComponentConstructor<U>
  >(
    entity: IEntity,
    Constructor: T,
    initialValues: ConstructorParameters<T>
  ): void => {
    const instance = new Constructor(...fallbackConstructorArgs(initialValues));

    this.entitiesMap = new Map(this._entitiesMap).set(
      entity,
      new Map(this._entitiesMap.get(entity) || []).set(
        Constructor.name,
        instance
      )
    );
  };

  public init = async () => {
    for (const system of this._systems) {
      await system.init(this._dependencies);
    }
  };

  public update = () => {
    for (const system of this._systems) {
      system.preUpdate(this._dependencies);

      for (const entity of this.getEntities(system.components)) {
        system.update(entity, this._dependencies);
      }
    }
  };

  public getEntityComponents = (entity: IEntity) =>
    this._entitiesMap.get(entity);

  private getEntities = (components: TSystemComponents): readonly IEntity[] =>
    collectEntities(components, this._entitiesMap);

  private set entitiesMap(value: TEntityComponentMap) {
    this._entitiesMap = value;
    collectEntities.clear();
  }
}
