export default class FakeComponentWithArgs {
  private _args: any

  constructor(args: number) {
    this._args = args
  }

  public get args() {
    return this._args
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public update(): void {}
}
