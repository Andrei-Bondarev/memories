import React, {useState} from "react";
import {Avatar, Grid, Button, Container, Paper, Typography, } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from "./input";
import {GoogleLogin} from "react-google-login";
import Icon from './icon'
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {signin,signup} from '../../actions/auth.js'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmedPassword: ''}

const Auth = () => {
    const [isSignUp,setIsSignUp] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
        navigate('/',{replace:true});
    }
    const handleChange = (e) => {
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
    }
    const switchMode = () => {
        setIsSignUp((p) => !p);
        setShowPassword(false);
    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type:'AUTH', data: { result, token } })

            navigate('/',{replace:true});
        }catch (e){
            console.log(e);
        }
    }
    const googleFailure = () => {
        console.log('Google fail');
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    return(
        <Container component="main" maxWidth={"xs"}>
            <Paper sx={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
            }} elevation={3}>
                <Avatar sx={{
                    backgroundColor: '#d9427f'
                }}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
                <form style={{
                    width: '100%',
                    marginTop: '20px'
                }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label={"First Name"} handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label={"Last Name"} handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name={"email"} label={'Email address'} handleChange={handleChange} type={'email'}/>
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name={'confirmPassword'} label={'Repeat password'} handleChange={handleChange} type={'password'}/>}
                    </Grid>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} sx={{
                        marginTop:'15px'
                    }}>{isSignUp ? 'Sign up' : 'Sign in'}</Button>
                    <GoogleLogin
                        clientId={'277316542534-c0q6ceu2qlfc90d64qe51p2sdctlkfja.apps.googleusercontent.com'}
                        render={(renderProps) => (
                            <Button
                                sx={{
                                    marginBottom:'10px',
                                    marginTop:'10px'
                                }}
                                color={'primary'}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant={'contained'}
                            >
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justify={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign in' : 'Don`t have any account? Sign up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;