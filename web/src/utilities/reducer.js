/**
 * redux store
 * @author: Arie M. Prasetyo (2020)
 */

// import {composeWithDevTools} from 'redux-devtools-extension'; // development
import {createStore} from 'redux';

const defaultState = {
	user: {id: 99, type: 'superadmin'}
};

const reducer = (state = defaultState, action) => {
	return state;
};

// export const store = createStore(reducer, composeWithDevTools()); // development
export const store = createStore(reducer); // production