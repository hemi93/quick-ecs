import { uuidv4 } from "../utils";
import { IEntity } from "./types";
import { ComponentConstructor } from "../types";
import { IWorld } from "../world/types";

export default class Entity implements IEntity {
  private readonly _id: string;
  private readonly _world: IWorld;

  constructor(world: IWorld) {
    this._world = world;
    this._id = uuidv4();
  }

  public get id() {
    return this._id;
  }

  public addComponent = <T extends ComponentConstructor<object>>(
    Component: T,
    initialValues?: ConstructorParameters<T>
  ): IEntity => {
    this._world.addEntityComponent(this, Component, initialValues);

    return this;
  };

  public getComponent = <T extends object>(
    Component: ComponentConstructor<T>
  ): T => {
    const entityComponents = this._world.getEntityComponents(this);

    if (!entityComponents) {
      throw new Error(`Entity ${this.id} is not initialized in World!`);
    }

    const component = entityComponents.get(Component.name);

    if (!component) {
      throw new Error(
        `Entity ${this.id} is missing component "${Component.name}"!`
      );
    }

    return component as T;
  };

  public debug = () => {
    console.debug({
      id: this.id,
      components: this._world.getEntityComponents(this)
    });
  };
}
