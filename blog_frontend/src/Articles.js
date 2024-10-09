import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Banner from './Banner';
import './Blog.css';

const Articles = ({ selectedCategory }) => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://blog-website-articles.vercel.app/articles/');
                console.log(response.data);
                const sortedArticles = response.data.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB - dateA; 
                });
                setArticles(sortedArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, []);

    const handleClick = (article) => {
        navigate(`/articles/${article.id}`);
    };

    const filteredArticles = selectedCategory
        ? articles.filter(article => article.category === selectedCategory)
        : articles;

    const [firstArticle, ...remainingArticles] = filteredArticles;
    const bannerarticle = firstArticle;

    return (
        <>
            <Grid container justifyContent={'center'} >
                <Grid item sm={9} className='banner-article'>
                    <Banner bannerarticle={bannerarticle} />
                </Grid>
                <Grid item sm={9}>
                    <Grid container className='article-container' >
                        {remainingArticles.map(article => (
                            <Grid item sm={12} md={4} key={article.id} className='articles' >
                                <Card className='article' onClick={() => handleClick(article)}>
                                    <CardMedia
                                        className='article-img'
                                        component="img"
                                        image={article.image}
                                        alt={article.title}
                                    />
                                    <CardContent>
                                        <Typography >
                                            {article.title.length > 60 ? article.title.slice(0, 60) + '...' : article.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Grid>
            </Grid>

        </>
    );
};

export default Articles;
