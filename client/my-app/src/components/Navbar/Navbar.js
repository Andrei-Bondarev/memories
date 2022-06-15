import React, {useEffect, useState} from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@mui/material";
import memories from '../../images/memories.png'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import jwtDecode from "jwt-decode";
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const logout = () => {
      dispatch({ type: 'LOGOUT' });
      navigate('/',{replace:true});
      setUser(null);
      window.location.reload();
    }
    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = jwtDecode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    return(

        <AppBar position='static' color='inherit' sx={{
            borderRadius: 15,
            margin: '30px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 50px',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Typography sx={{
                    color: 'rgba(0,183,255, 1)',
                    textDecoration: 'none',
                }} variant='h2' align='center' component={Link} to='/'>
                    Memories
                </Typography>
                <img src={memories} style={{marginLeft: '15px'}} alt="icon" height='60'/>
            </div>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '400px',
            }}>
                {
                    user ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '400px',
                        }}>
                            <Avatar sx={{
                                backgroundColor: '#570861'
                            }} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}
                            </Avatar>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }} variant='h6'>{user.result.name}</Typography>
                            <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                        )
                }
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;