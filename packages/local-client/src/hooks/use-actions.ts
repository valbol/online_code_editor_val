import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

/* 
 useAction is a hook which bind between the action creators and the operation of dispatch
 action creator send the action + payload ===> dispatch it to the reducers, which listen to upcoming action
*/

export const useActions = () => {
  const dispatch = useDispatch();

  /* 
    we want to render this only once, memo do that, it work with dependency array and only will change if dispatch changed
    useMemo is like useState and useEffect put together - and here it will memoize the function once
    we will call it again whenever something in that array changes, so here we will call it only once
  */

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
    // ? in dependency array, need to include only what we get in the function or declared inside a component, not what we import
    // ? so here we don't need to add actionCreators as we import it
  }, [dispatch]);
};
