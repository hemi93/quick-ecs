import System from './System'

export {System}

export type ISystem<T extends object[]> = import('./types').ISystem<T>;
