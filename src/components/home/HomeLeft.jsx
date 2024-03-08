import React, { useState } from 'react'
import Post from '../Post'
import { NavbarLinks } from '../../data/NavbarLinks'
import { Link } from 'react-router-dom'
import { PostEndPoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { useEffect } from 'react'

const HomeLeft = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const GETPost_API = PostEndPoints.GETPost_API

    const fetchPosts = async () => {
        try {
            setLoading(true)
            console.log("Fetching posts")
            const response = await apiConnector('GET', GETPost_API);
            console.log('Printing all posts', response);

            // Check if the response is successful and has the expected structure
            if (response.data && response.data.success) {
                setPosts(response.data.data); // Set the tags array
            } else {
                console.log('POSTS: Invalid response structure:', response);
                throw new Error('POSTS: Invalid response structure');
            }
            setLoading(false)
        } catch (error) {
            console.log('Could not fetch the post list');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='flex flex-col'>

            {
                loading ? (
                    <div className='flex items-center justify-center'>Loading........</div>
                ): (
                        <div className = 'px-40'>
                {/* Map over posts and render Post component for each post */ }
                {
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
                }
            </div>
    )
}

            
        </div >
    )
}

export default HomeLeft