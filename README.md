# Quick ECS

![License: MIT](https://img.shields.io/npm/l/quick-ecs?style=flat)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/quick-ecs?style=flat)
![npm](https://img.shields.io/npm/v/quick-ecs?style=flat)
[![Maintainability](https://api.codeclimate.com/v1/badges/92c6671bbb5283ee1c3c/maintainability)](https://codeclimate.com/github/hemi93/quick-ecs/maintainability)

Bring ECS architecture to JS project in quick, simple and powerful manner.
Currenly in early stages of development, but already delivering basic toolset. Contributors are welcome!

## Features

- Injecting Dependencies into your Systems
- Lifecycle methods for Systems (init, preUpdate, update) that allow for easy setup
- You can define any combination of Components for System at startup
- Minimal amount of package dependencies (which is planned to be reduced to 0)
- Tiny, less than 8 kB packed!
- Supports method chaining for convenient entity manipulation

## Installation

```bash
yarn add quick-ecs
```

## Usage example

Following code samples are written in TypeScript, but pure JS can be used as well.

```typescript
import { ComponentConstructor, IEntity, System } from "quick-ecs";

// Define System dependencies (optional)

interface IExampleDependencies {
  timer: {
    getDeltaTime(): number;
  };
}

/**
 * Define example Component.
 *
 * In pure ECS this only contains data describing the Component.
 *
 * However, if you need to you can easily use this as wrapper for objects
 * which are used by engine of your choice and manipulate them - just pass them in constructor.
 */
class ExampleComponent {
  private _prop: number;

  constructor(initialValue: number) {
    this._prop = initialValue;
  }

  public get prop() {
    return this._prop;
  }

  public updateProp = (value: number) => {
    this._prop = value;
  };
}

// Define example System

export default class ExampleSystem extends System<
  [ComponentConstructor<ExampleComponent>],
  IExampleDependencies
> {
  constructor() {
    super();
    // Remember to set component types for the system to use. This is also type-safe.
    this.setComponents(ExampleComponent);
  }

  public update(entity: IEntity, { timer }: IExampleDependencies) {
    const { prop, updateProp } = entity.getComponent(ExampleComponent);

    updateProp(prop * timer.getDeltaTime());
  }
}

// Create and run!

interface IExampleEngine {
  timer: {
    getDeltaTime: () => Math.random()
  };
  runRenderLoop(renderFunction: () => void): void
}

export const main = async ({timer, onBeforeFrameRender}: IExampleEngine) => {
  // Create World and add system
  const world = new World<IExampleDependencies>({ timer });
  world.addSystem(ExampleSystem);

  /**
   * Create Entity and add Component to it.
   * Second argument of addComponent accepts array of constructor params, type safe!
   */
  const entity = world.createEntity();
  entity.addComponent(ExampleComponent, [0]);

  // Initialize the World. This runs all init functions in added Systems.
  await world.init();

  /**
   * Following step runs the World and depends on engine you're using.
   * This is generic - you just need to run update in render loop.
   */
  runRenderLoop(() => {
    world.update();
  })
};
```
