import React from "react";
import {Container} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/posts' element={
                    user ? (
                        <Container maxWidth={"xl"}>
                            <Navbar/>
                            <Home/>
                        </Container>
                    ) : (
                        <Auth/>
                    )
                }/>
                <Route path='/posts/search' element={
                    <Container maxWidth={"xl"}>
                        <Navbar/>
                        <Home/>
                    </Container>
                }/>

                <Route path='/posts/:id' element={
                    <Container maxWidth={"xl"}>
                        <Navbar/>
                        <PostDetails/>
                    </Container>
                }/>
                <Route path='/auth' element={
                    !user ?
                        (<Container maxWidth={"xl"}>
                        <Navbar/>
                        <Auth/>
                    </Container>)
                        : <Navigate to="/posts" replace />
                }/>
                <Route
                    path="*"
                    element={<Navigate to="/posts" replace />}
                />
            </Routes>
        </BrowserRouter>
    )
}
export default App