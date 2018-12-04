import { combineReducers } from 'redux';

import * as constants from './../constants';

const posts = (state = [], action) => {
	switch (action.type) {
		case constants.STORE_POSTS:
            return action.posts;
        case constants.STORE_MORE_POSTS:
            return [...state, ...action.posts];
		default:
			return state;
	}
}

const comments = (state = [], action) => {
	switch (action.type) {
		case constants.STORE_COMMENTS:
            return action.comments;
        case constants.STORE_MORE_COMMENTS:
            return [...state, ...action.comments];
		default:
			return state;
	}
}

const RootReducer = combineReducers({
    posts,
    comments,
});

export default RootReducer;
