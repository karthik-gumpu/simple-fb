import * as constants from './../constants';

export const storePosts = (posts) => ({
    type: constants.STORE_POSTS,
    posts,
});

export const storeMorePosts = (posts) => ({
    type: constants.STORE_MORE_POSTS,
    posts,
});

export const storeComments = (comments) => ({
    type: constants.STORE_COMMENTS,
    comments,
});

export const storeMoreComments = (comments) => ({
    type: constants.STORE_MORE_COMMENTS,
    comments,
});