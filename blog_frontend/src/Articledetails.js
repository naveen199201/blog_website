import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Header from './Header';
import './Blog.css'

function Articledetails() {
    const [article, setArticle] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const { articleId } = useParams();
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`https://blog-website-articles.vercel.app/articles/${articleId}/`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, [articleId,newCommentText]);


    const handleCommentSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const user = localStorage.getItem('user');
            const tokenString = 'Token ' + token;
            const formattedDate = new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });

            const response = await axios.post(
                'https://blog-website-articles.vercel.app/comments/',
                {
                    article: articleId,
                    text: newCommentText,
                    user: 1,
                },
                {
                    headers: {
                        Authorization: tokenString
                    }
                }
            );
            console.log(response.data)
            console.log(user)
            console.log(token)

            setArticle(prevArticle => ({
                ...prevArticle,
                comments: [...prevArticle.comments, {
                    "text": newCommentText,
                    "comment_created_at": new Date(),
                    "user": {
                        "username": localStorage.getItem('user')
                    }
                }]
            }));
            setNewCommentText('');
            console.log(formattedDate)
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleKeyPress = (e) => {
        console.log('event', e);
        if (e.key === 'Enter') {
            handleCommentSubmit(newCommentText);
        }
    };

    return (
        <>
        <Header/>
        <hr />
        <div>
            {article ? (
                <Grid item xs={12} sm={6} md={4} key={article.id} className='article-detail' >
                    <Card className='article-detail-card'  >
                        <CardMedia
                            className='article-detail-img'
                            image={article.image}
                            alt={article.title}
                        />
                        <CardContent className='article-detail-title'>
                            {article.title}
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" >
                                {article.description}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Grid item xs={12} sm={6}>
                        <Card className='comment-card'>
                            <CardActions className='comment-card-container'>
                                <input
                                    type="text"
                                    value={newCommentText}
                                    onChange={e => setNewCommentText(e.target.value)}
                                    placeholder="Add a comment"
                                    onKeyDown={handleKeyPress}                                    
                                    className='comment-card-input'
                                />
                                <Button className='post-button' onClick={handleCommentSubmit} variant='contained' >Post</Button>
                            </CardActions>
                            <CardContent >
                                <Typography gutterBottom variant="h5" className='comment-header' >
                                    Comments
                                </Typography>
                                {article?.comments.map(comment => (
                                    <Card className='comments-card' >
                                        <CardContent >
                                            <Typography key={comment.id} variant="body2" color="text.secondary" >
                                                <div className='comment-user' >
                                                    <Avatar className='comment-user-avatar' sx={{ bgcolor: 'primary.main' }}></Avatar>
                                                    <p >{comment.user.username}</p>
                                                    <div className='user-comment' >
                                                        <Stack spacing={2} direction="column ">
                                                            <p >{new Date(comment.comment_created_at).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                                                            <box>
                                                             {comment.comment}
                                                            </box>
                                                        </Stack>
                                                    </div>
                                                </div>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </>
    );
}

export default Articledetails;
