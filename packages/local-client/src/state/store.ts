import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
  reducers,
  {},
  // ! here we added the middlewares, our middleware as well - persistMiddleware
  applyMiddleware(persistMiddleware, thunk)
);
