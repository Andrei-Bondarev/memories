import React, {useEffect} from "react";
import {Pagination, PaginationItem} from "@mui/material";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Paginator = (props) => {
    const { numberOfPages } = useSelector((state) => state.posts )
    const page  = props.page;
    const pagesize = props.pagesize || 8;
    const dispatch = useDispatch();
    useEffect(() => {
        if(page) dispatch(getPosts(page,pagesize))
    },[page,pagesize])

    return (
        <Pagination
            sx={{
                ul: {
                    justifyContent: 'space-around',
                },
            }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant={'outlined'}
            color={'primary'}
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}&pagesize=${pagesize}`}/>
            )}
        />
    )
}

export default Paginator;