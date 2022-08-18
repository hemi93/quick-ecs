# CHANGELOG

## 1.0.0

- [BREAKING] IEntity is now typed differently - it requires `typeof` modifier for components. Example:

```tsx
  let entity: IEntity<
    [
      typeof FakeComponentWithNoArgs,
      typeof FakeComponentWithArgs
    ]
  >;
```

## 0.3.0

- docs: Added CHANGELOG.
- feat: [#11](https://github.com/hemi93/quick-ecs/issues/11) - added `Entity.removeComponent` method.
- chore: When called for non-existent Component, `Entity.getComponent` now returns `undefined` instead of throwing:
  - Should support the functional paradigm better.
  - Makes code more explicit.
- refactor: Source code was reformatted with new linting settings.
- chore: Updated dependencies (mainly to use `TypeScript 4.0.5`).
