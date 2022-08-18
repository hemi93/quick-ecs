import { OneOf, IAbstractConstructor, TAnyConstructors } from "../types";
import { IEcsWorld } from "../world/types";
import { IEntity } from "./types";

export default class Entity<TComponents extends TAnyConstructors>
  implements IEntity<TComponents>
{
  private readonly _world: IEcsWorld;

  constructor(world: IEcsWorld) {
    this._world = world;
  }

  public addComponent = <U extends OneOf<TComponents>>(
    Component: U,
    ...initialValues: ConstructorParameters<U>
  ): IEntity<TComponents> => {
    this._world.addEntityComponent<TComponents, U>(
      this,
      Component,
      ...initialValues
    );

    return this;
  };

  public getComponent = <U extends OneOf<TComponents>>(
    Component: IAbstractConstructor<U>
  ): U | undefined =>
    this._world.getEntityComponents(this)?.get(Component.name) as U | undefined;

  public removeComponent = <U extends OneOf<TComponents>>(
    Component: IAbstractConstructor<U>
  ): IEntity<TComponents> => {
    this._world.removeEntityComponent<TComponents, U>(this, Component);

    return this;
  };

  /* istanbul ignore next */
  public debug = (): void => {
    console.debug({
      entity: this,
      components: this._world.getEntityComponents<TComponents>(this)
    });
  };
}
