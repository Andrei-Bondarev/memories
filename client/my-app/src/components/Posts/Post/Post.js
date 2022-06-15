import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import {useDispatch} from "react-redux";
import {deletePost,likePost} from "../../../actions/posts";
import {useNavigate} from "react-router-dom";
const Post = (props) => {
    const dispatch = useDispatch();
    const post = props.post;
    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };
    const navigate = useNavigate();

    return(
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '15px',
            height: '100%',
            position: 'relative',
        }}
        raised
        elevation={6}>

                <CardMedia sx={{
                    height: 0,
                    paddingTop: '56.25%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'darken',
                }} image={props.post.selectedFile} title={props.post.title}/>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    color: 'white',
                }}>
                    <Typography variant="h6">{props.post.name}</Typography>
                    <Typography variant="body2">{moment(props.post.createdAt).fromNow()}</Typography>
                </div>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: 'white',
                }}>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <Button style={{color:'white'}} size='small' onClick={() => props.setCurrentId(props.post._id)}>
                        <MoreHorizIcon fontSize='default'/>
                    </Button>}

                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px',
                }}>
                    <Typography variant={'body2'} color='textSecondary'>{props.post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography sx={{
                    padding: '0 16px',
                }} variant='h5' gutterBottom>
                    {props.post.title}
                </Typography>
                <CardContent>
                    <Typography  variant='body2' color='textSecondary' component='p' gutterBottom>
                        {props.post.message}
                    </Typography>
                </CardContent>
            <CardActions sx={{
                padding: '0 16px 8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(props.post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <Button size='small' color='primary' onClick={() => dispatch(deletePost(props.post._id))}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>}

            </CardActions>
        </Card>
    )
}
export default Post;