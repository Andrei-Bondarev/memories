import React from "react";
import Post from "./Post/Post";
import {Grid, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
const Posts = (props) => {
    const { posts, isLoading } = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return 'No posts';

    return(
        isLoading ? <CircularProgress/> : (
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
            }} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={props.setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}
export default Posts;