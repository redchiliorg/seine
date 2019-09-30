// @flow
import type { BlocksAction, BlocksState } from './reduceBlocks';
import type { ElementsAction, ElementsState } from './reduceElements';

export type State = BlocksState | ElementsState;
export type Action = BlocksAction | ElementsAction;

export * from './reduceBlocks';
export * from './reduceElements';
