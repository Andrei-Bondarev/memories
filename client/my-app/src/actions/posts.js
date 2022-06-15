import * as api from '../api'
import {CREATE, DELETE, FETCH_ALL, LIKE, UPDATE,FETCH_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from "../constants/actionTypes";

export const getPosts = (page,pagesize) => async (dispatch) => {

    try{

        dispatch({ type: START_LOADING })
        const { data } = await api.getPosts(page,pagesize);
        dispatch( {
            type: FETCH_ALL,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch (e){
        console.log(e.message)
    }
}
export const getPost = (id) => async (dispatch) => {

    try{

        dispatch({ type: START_LOADING })
        const { data } = await api.getPost(id);
        dispatch( {
            type: FETCH_POST,
            payload: data
        })
        dispatch({ type: END_LOADING })
    }catch (e){
        console.log(e.message)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const {data} = await api.createPost(post)
        navigate('/posts/'+data._id);
        dispatch({type:CREATE, payload: data});
        dispatch({ type: END_LOADING })
    }catch (e){
        console.log(e.message);
    }
}
export const updatePost = (currentId,post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(currentId,post);
        dispatch({type: UPDATE,payload: data});
    }catch (e){
        console.log(e.message);
    }
}
export const deletePost = (currentId) => async (dispatch) => {
    try{
        await api.deletePost(currentId);

        dispatch({type: DELETE,payload: currentId})
    }catch (e){
        console.log(e);
    }
}
export const likePost = (currentId) => async (dispatch) => {
    try {
        const {data} = await api.likePost(currentId);
        dispatch({type: LIKE,payload: data})
    }catch (e){
        console.log(e);
    }
}
export const commentPost = (value,id) => async (dispatch) => {
    try {
       const { data } = await api.comment(value,id);
       dispatch({type: COMMENT, payload: data});
       return data.comments;

    }catch (e){
        console.log(e);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};



