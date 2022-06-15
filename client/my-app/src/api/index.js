import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const getPosts = (page,pagesize) => API.get('/posts?page='+page+'&pagesize='+pagesize);
export const getPost = (id) => API.get('/posts/'+id);
export const createPost = (post) => API.post('/posts',post);
export const updatePost = (currentId,post) => API.patch('/posts' + '/' + currentId,post);
export const deletePost = (currentId) => API.delete('/posts' + '/' + currentId);
export const likePost = (currentId) => API.patch('/posts' + '/' + currentId + '/likePost')
export const comment = (value,currentId) => API.post('/posts' + '/' + currentId + '/commentPost',{ value });
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);