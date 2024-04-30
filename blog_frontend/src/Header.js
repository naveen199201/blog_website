import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Blog.css';
const Header = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    let firstLetter;
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (user) {
        firstLetter = user.charAt(0);
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Box >
            <Grid container >
                <Grid item sm={2} xs={0}  >
                </Grid>
                <Grid item sm={8} xs={7} className='header' >
                    <h1 className='header-title'> Blog</h1>
                </Grid>
                <Grid item sm={2} xs={5} className={`${isAuthenticated ? 'logout' : 'login'}`}>
                    {isAuthenticated &&
                        <div >
                            <Grid container className='user-profile'>
                                <Grid sm={4}>
                                    <span className='avatar'><Avatar >{firstLetter}</Avatar></span>
                                </Grid>
                                <Grid sm={4}>
                                    <span className='username'>{user}</span>
                                </Grid>
                                <Grid sm={4}>
                                    <Button
                                        className='logout-button'
                                        variant='contained'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    }
                    {!isAuthenticated &&
                        <Button href="/login" className='login-button' >
                            Login
                        </Button>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}
export default Header