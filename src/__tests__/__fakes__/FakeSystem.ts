import { IEntity } from "../../entity/types";
import { System } from "../../system";
import FakeComponentWithArgs from "./FakeComponentWithArgs.fake";
import FakeComponentWithNoArgs from "./FakeComponentWithNoArgs.fake";

/* eslint-disable @typescript-eslint/no-empty-function */

export type TFakeSystemComponents = [
  typeof FakeComponentWithArgs,
  typeof FakeComponentWithNoArgs
];

export default class FakeSystem extends System<TFakeSystemComponents, never> {
  constructor() {
    super();
    this.setComponents(FakeComponentWithArgs, FakeComponentWithNoArgs);
  }

  public update(_entity: IEntity<TFakeSystemComponents>): void {}

  public async init() {}

  public preUpdate() {}
}
