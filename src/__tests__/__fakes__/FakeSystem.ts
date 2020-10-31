import {IEntity} from '../../entity/types'
import {System} from '../../system'
import FakeComponentWithArgs from './FakeComponentWithArgs.fake'
import FakeComponentWithNoArgs from './FakeComponentWithNoArgs.fake'

/* eslint-disable @typescript-eslint/no-empty-function */

export type TFakeSystemWithNoArgsComponents = [
  FakeComponentWithArgs,
  FakeComponentWithNoArgs
]

export default class FakeSystem extends System<
  TFakeSystemWithNoArgsComponents,
  any
  > {
  constructor() {
    super()
    this.setComponents(FakeComponentWithArgs)
  }

  public update(
    _entity: IEntity<TFakeSystemWithNoArgsComponents>,
    _dependencies: any
  ): void { }

  public async init() { }

  public preUpdate() { }
}
