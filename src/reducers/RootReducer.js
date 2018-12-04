import { combineReducers } from 'redux';

const posts = (state = [], action) => {
	switch (action.type) {
		case 'STORE_POSTS':
            return action.posts;
        case 'STORE_MORE_POSTS':
            return [...state, ...action.posts];
		default:
			return state;
	}
}

const comments = (state = [], action) => {
	switch (action.type) {
		case 'STORE_COMMENTS':
            return action.comments;
        case 'STORE_MORE_COMMENTS':
            return [...state, ...action.comments];
		default:
			return state;
	}
}
const user = (state = [], action) => {
	switch (action.type) {
		case 'STORE_USER':
			return action.user;
		default:
			return state;
	}
}

const RootReducer = combineReducers({
    posts,
    comments,
    user
});

export default RootReducer;
