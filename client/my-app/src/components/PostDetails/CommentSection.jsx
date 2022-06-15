import React , { useState, useRef } from "react";
import {Typography, TextField, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {commentPost} from '../../actions/posts'
const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const commentsRef = useRef();
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    return(
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    height: '200px',
                    overflowY: 'auto',
                    marginRight: '30px'
                }}>
                    <Typography gutterBottom variant={'h6'}>
                        comments
                    </Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {
                    user?.result?.name &&
                    (<div style={{
                        width: '70%'
                    }}>
                        <Typography gutterBottom variant={'h6'}>
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant={'outlined'}
                            label={'comment'}
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant={'contained'} onClick={handleClick} color={'primary'}>
                            Comment
                        </Button>
                    </div>)
                }
            </div>
        </div>
    )
}
export default CommentSection;

