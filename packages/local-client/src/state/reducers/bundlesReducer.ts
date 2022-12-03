import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

// This is the interface of the bundle state....
interface BundlesState {
  [key: string]: { loading: boolean; code: string; err: string } | undefined;
}

const initialState: BundlesState = {};

// ! produce ---> allow us to make direct mutations on the object
const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // if we start bundle, we clean all data from previous operation
        state[action.payload.cellId] = { loading: true, code: '', err: '' };
        return state;

      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
