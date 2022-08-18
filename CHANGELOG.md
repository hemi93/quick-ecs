# CHANGELOG

## 1.0.0

BREAKING CHANGES:

- refactor: IEntity is now typed differently - it requires `typeof` modifier for components.
- feat: All argument types are now correctly inferred for Components which use constructor args.
- feat: `addComponent` now accepts arguments positionally rather than packed in an Array.

Example for above changes:

```tsx
  class FakeComponentWithArgs {
    private _arg1: number;
    private _arg2: string;

    constructor(arg1: number, arg2: string) {
      this._arg1 = arg1;
      this._arg2 = arg2;
    }
  }

  let entity: IEntity<
    [
      typeof FakeComponentWithNoArgs,
      typeof FakeComponentWithArgs
    ]
  >;

  (...)

  entity.addComponent(FakeComponentWithArgs, 1, "test"); // this now correctly infers types.
```

## 0.3.0

- docs: Added CHANGELOG.
- feat: [#11](https://github.com/hemi93/quick-ecs/issues/11) - added `Entity.removeComponent` method.
- chore: When called for non-existent Component, `Entity.getComponent` now returns `undefined` instead of throwing:
  - Should support the functional paradigm better.
  - Makes code more explicit.
- refactor: Source code was reformatted with new linting settings.
- chore: Updated dependencies (mainly to use `TypeScript 4.0.5`).
