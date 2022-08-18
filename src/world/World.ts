import Entity from "../entity/Entity";
import { IEntity } from "../entity/types";
import { ISystem } from "../system/types";
import {
  IAbstractConstructor,
  TAnyConstructor,
  TComponentConstructors
} from "../types";
import { IEcsWorld, TEntityComponentMap } from "./types";
import { collectEntities } from "./utils";

export default class World<
  TDependencies extends Record<string, unknown> | never
> implements IEcsWorld<TDependencies>
{
  private _entitiesMap: TEntityComponentMap;
  private readonly _dependencies: TDependencies;
  private readonly _systems: ISystem<[], TDependencies>[] = [];

  public get systems(): ISystem<[], TDependencies>[] {
    return this._systems;
  }

  public get entitiesMap(): TEntityComponentMap {
    return this._entitiesMap;
  }

  constructor(dependencies: TDependencies) {
    this._dependencies = dependencies;
    this._entitiesMap = new Map();
  }

  public addSystem = <
    U extends TAnyConstructor[],
    T extends IAbstractConstructor<ISystem<U, TDependencies>>
  >(
    Constructor: T
  ): IEcsWorld<TDependencies> => {
    this._systems.push(new Constructor() as ISystem<[], TDependencies>);

    return this;
  };

  public createEntity = <T extends TAnyConstructor[]>(): IEntity<T> => {
    const entity = new Entity(this);
    this._entitiesMap = new Map(this._entitiesMap).set(entity, new Map());

    return entity;
  };

  public addEntityComponent = <
    U extends TAnyConstructor,
    T extends IAbstractConstructor<U>
  >(
    entity: IEntity<[]>,
    Constructor: T,
    ...initialValues: ConstructorParameters<T>
  ): void => {
    const instance = new Constructor(...initialValues);

    this._entitiesMap = new Map(this._entitiesMap).set(
      entity,
      new Map(this.getEntityComponents(entity) ?? []).set(
        Constructor.name,
        instance
      )
    );
  };

  public removeEntityComponent = <
    U extends TAnyConstructor,
    T extends IAbstractConstructor<U>
  >(
    entity: IEntity<[U]>,
    Constructor: T
  ): void => {
    const newEntityComponents = new Map(this.getEntityComponents(entity) ?? []);
    newEntityComponents.delete(Constructor.name);

    this._entitiesMap = new Map(this._entitiesMap).set(
      entity,
      newEntityComponents
    );
  };

  public init = async (): Promise<void> => {
    for (const system of this._systems) {
      await system.init(this._dependencies);
    }
  };

  public update = (): void => {
    for (const system of this._systems) {
      system.preUpdate(this._dependencies);

      for (const entity of this.getEntities(system.components)) {
        system.update(entity, this._dependencies);
      }
    }
  };

  public removeEntity = <T extends TAnyConstructor[]>(
    entity: IEntity<T>
  ): void => {
    const newEntitiesMap = new Map(this._entitiesMap);
    newEntitiesMap.delete(entity);
    this._entitiesMap = newEntitiesMap;
  };

  public getEntityComponents = <T extends TAnyConstructor[]>(
    entity: IEntity<T>
  ): ReadonlyMap<string, TAnyConstructor> | undefined =>
    this._entitiesMap.get(entity);

  private getEntities = <T extends TAnyConstructor[]>(
    components: TComponentConstructors<T>
  ) => collectEntities(components, this._entitiesMap);
}
