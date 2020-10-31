import {TComponentBase} from '../types'
import System from './System'

export {System}

export type ISystem<T extends TComponentBase[]> = import('./types').ISystem<T>
