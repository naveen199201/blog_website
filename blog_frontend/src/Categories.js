import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articles from './Articles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Blog.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://blog-website-articles.vercel.app/categories/');
                setCategories(response.data); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    const handleClick = (category) => {
        setSelectedCategory(category.id)
    }
    const handleAllClick = () => {
        setSelectedCategory(null); // Set selectedCategory to null to view articles from all categories
    }

    return (
        <div>
            <Box >
                <ul className='category-list'>
                    <Button onClick={handleAllClick}>All</Button>
                    {categories.map(category => (
                        <Button key={category.id} onClick={() => handleClick(category)}>{category.name}</Button>
                    ))}
                </ul>
            </Box>
            <Articles selectedCategory={selectedCategory} />
        </div >
    );
};

export default Categories;
