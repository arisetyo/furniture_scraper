/**
 * redux store
 * @author: Arie M. Prasetyo (2020)
 */

import {createStore} from 'redux';

const defaultState = {
	user: {}
};

const reducer = (state = defaultState, action) => {
	return state;
};

export const store = createStore(reducer);