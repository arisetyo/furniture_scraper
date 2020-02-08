/**
 * redux store
 * @author: Arie M. Prasetyo (2020)
 */

import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore} from 'redux';

const defaultState = {
	user: {id: 99, type: 'superadmin'}
};

const reducer = (state = defaultState, action) => {
	return state;
};

export const store = createStore(reducer, composeWithDevTools());
// export const store = createStore(reducer);