import { System, IEntity } from "..";

/* eslint-disable @typescript-eslint/no-empty-function */

export default class FakeComponentWithArgs extends System<any, any> {
  private _args: any;

  constructor(args: number) {
    super();
    this._args = args;
  }

  public get args() {
    return this._args;
  }

  public update(_entity: IEntity, _dependencies: any): void {}
}
