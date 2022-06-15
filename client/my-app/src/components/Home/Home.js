import React, {useEffect, useState} from "react";
import {Container, Grid, Grow, Paper, AppBar, TextField, Button, Chip} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useDispatch} from "react-redux";
import {getPosts, getPostsBySearch} from "../../actions/posts";
import Paginator from "../Pagination";
import {useNavigate, useLocation} from "react-router-dom";
import "./style.css";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);


    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const pagesize = query.get('pagesize') || 8;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    }

    const [tags, setTags] = useState([]);
    const addTag = (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                setTags([...tags, e.target.value]);
                e.target.value = "";
            }
        }
    };
    const removeTag = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };
    
    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostsBySearch({ search,tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      } else {
          navigate('/');
      }
    }
    
    return (
        <Grow in>
            <Container maxWidth={'xl'}>
                <Grid sx={{
                    flexDirection:'row',
                    '@media (max-width:600px)': {
                        flexDirection:'column-reverse',
                    }
                }} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar sx={{borderRadius: 4,
                            marginBottom: '1rem',
                            display: 'flex',
                            padding: '16px',}}
                        position={'static'} color={'inherit'}>
                            <TextField
                                name={'search'}
                                variant={'outlined'}
                                label={'Search Memories'}
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="tag-container">
                                {tags.map((tag, index) => {
                                    return (
                                        <div key={index} className="tag">
                                            {tag} <span onClick={() => removeTag(tag)}><HighlightOffTwoToneIcon sx={{
                                                color: '#838282'
                                        }} fontSize="small" /></span>
                                        </div>
                                    );
                                })}

                                <input onKeyDown={addTag} />
                            </div>
                            <Button onClick={searchPost} sx={{
                                marginTop:'10px'
                            }} color={'primary'} variant={'contained'}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {
                            (!searchQuery && !tags.length) && (
                                <Paper sx={{
                                    borderRadius: 4,
                                    marginTop: '1rem',
                                    padding: '16px',
                                }}
                                       elevation={6}>
                                    <Paginator page={page} pagesize={pagesize}/>
                                </Paper>
                            )
                        }

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;