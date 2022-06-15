import React from "react";
import {useState, useEffect} from "react";
import {TextField, Button, Typography, Paper} from "@mui/material";
import FileBase from "react-file-base64"
import {useDispatch} from "react-redux";
import {createPost,updatePost} from "../../actions/posts";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const Form = (props) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => props.currentId ? state.posts.posts.find((p) => p._id === props.currentId) : null);
    const [postData,setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    useEffect(() => {
        if(post)
            setPostData(post);
    },[post])
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.currentId){
            dispatch(updatePost(props.currentId,{ ...postData, name: user?.result?.name}));
        }else {
            dispatch(createPost({ ...postData, name: user?.result?.name},navigate));
        }
        clear();
    }
    const clear = () => {
        props.setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    if(!user?.result?.name) {
        return (
            <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant={'h6'} align={'center'}>
                    Please sign in to create memories
                </Typography>
            </Paper>
        )
    }

    return(
        <Paper sx={{
            padding: '50px',
        }} elevation={6}>
            <form action="" autoComplete="off" noValidate onSubmit={handleSubmit} style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                <Typography variant="h6">{props.currentId ? 'Edit' : 'Create'} a memory</Typography>
                <TextField sx={{marginBottom: '10px'}} name="title" label="Title" variant="outlined" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                <TextField sx={{marginBottom: '10px'}} name="message" label="Message" variant="outlined" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                <TextField sx={{marginBottom: '10px'}} name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
                <div style={{
                    width: '97%',
                    margin: '10px 0',
                }}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                </div>
                <Button sx={{
                    marginBottom: '10px',
                }} variant="contained" type="submit" color="primary" size="large" fullWidth>
                    Submit
                </Button>
                <Button variant="contained" onClick={clear} color="secondary" size="small" fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}
export default Form;