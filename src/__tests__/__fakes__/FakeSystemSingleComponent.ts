import { IEntity } from "../../entity/types";
import { System } from "../../system";
import FakeComponentWithArgs from "./FakeComponentWithArgs.fake";

/* eslint-disable @typescript-eslint/no-empty-function */

export type TFakeSystemSingleComponents = [typeof FakeComponentWithArgs];

export default class FakeSystemSingleComponent extends System<
  TFakeSystemSingleComponents,
  never
> {
  constructor() {
    super();
    this.setComponents(FakeComponentWithArgs);
  }

  public update(_entity: IEntity<TFakeSystemSingleComponents>): void {}

  public async init() {}

  public preUpdate() {}
}
