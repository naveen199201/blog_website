import React from 'react'
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'

const Banner = ({ bannerarticle }) => {
    const navigate = useNavigate();
    const handleClick = (article) => {
        navigate(`/articles/${article.id}`);
    };

    return (
        <>
            {bannerarticle && (
                <Grid container >
                    <Grid item xs={12} >
                        <Card onClick={() => handleClick(bannerarticle)} style={{ position: 'relative' }}>
                            <CardMedia
                                className='banner-image'
                                component="img"
                                image={bannerarticle.image}
                                alt={bannerarticle.title}
                                style={{ position: 'relative' }}
                            />
                            <div className="banner-overlay" />
                            <div className="banner-content">
                                <Typography variant="body1" className='banner-content-title'>
                                    {bannerarticle.title.length > 60 ? bannerarticle.title.slice(0, 60) + '...' : bannerarticle.title}
                                </Typography>
                            </div>
                        </Card>

                    </Grid>
                </Grid>
            )}
        </>
    )
}
export default Banner