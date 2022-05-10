import {
    LOG_IN,
    SIGN_UP,
    ADD_BLOG,
    GET_BLOG,
    GET_MY_BLOG,
    WRITE_NEW_BLOG,
    USER_LOGOUT,
    BLOG_LOGOUT,
    GET_TAGS,
} from "./actions";

export const tagReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TAGS:
            return {...state, tags: action.payload};
        default:
            return state;
    }
};
export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {};
        case LOG_IN:
            return {...state, user: action.payload};
        case SIGN_UP:
            return {...state, newUser: action.payload};
        default:
            return state;
    }
};

export const blogReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_LOGOUT:
            return {};
        case WRITE_NEW_BLOG:
            const anew = [state.myBlogs];
            anew.push(action.payload);
            return {...state, myBlogs: anew};
        case ADD_BLOG:
            return {...state, newBlog: action.payload};
        case GET_BLOG:
            return {...state, allBlogs: action.payload};
        case GET_MY_BLOG:
            return {...state, myBlogs: action.payload};
        default:
            return state;
    }
};
/*
  LOG_IN:{
    userResponse:{
      user:{}
    }
  }






*/
