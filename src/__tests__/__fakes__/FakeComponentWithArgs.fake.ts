export default class FakeComponentWithArgs {
  private _arg1: number;
  private _arg2: string;

  constructor(arg1: number, arg2: string) {
    this._arg1 = arg1;
    this._arg2 = arg2;
  }

  public get arg1() {
    return this._arg1;
  }

  public get arg2() {
    return this._arg2;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public update(): void {}
}
