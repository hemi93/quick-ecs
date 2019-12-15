import { IEntity } from "../entity/types";
import { System } from "../system";
import { ComponentConstructor } from "../types";
import FakeComponentWithNoArgs from "./FakeComponentWithNoArgs.fake";

/* eslint-disable @typescript-eslint/no-empty-function */

export default class FakeSystemWithNoArgs extends System<
  [ComponentConstructor<FakeComponentWithNoArgs>],
  any
> {
  constructor() {
    super();
    this.setComponents(FakeComponentWithNoArgs);
  }

  public update(_entity: IEntity, _dependencies: any): void {}
  public async init() {}
  public preUpdate() {}
}
