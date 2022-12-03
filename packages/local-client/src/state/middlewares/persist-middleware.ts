import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      // ! next will pass every action we receive w/out stopping it, (no matter what we want to proceed)
      next(action);
      // ? use of the middleware - if you receive one of those actions,
      // ? dispatch save action and proceed w/ the flow ( the proceed happened in the next above!)
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        // ! debouncing the save operation
        if (timer) {
          clearTimeout(timer);
        }
        // We immediately invoke getState because our saveCells is redux Thunk which call immediate the second async function
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
