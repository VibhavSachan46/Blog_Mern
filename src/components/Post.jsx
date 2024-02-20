import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

const Post = ({ post }) => {
    const [tagName, setTagName] = useState('');
    const [author, setAuthor] = useState(null);
    const [saved, setSaved] = useState(false)

    console.log("Printing post details", post);

    const fetchTagName = async () => {
        try {
            const response = await apiConnector('GET', `/api/tags/${post.Tag}`);
            if (response.data && response.data.success) {
                setTagName(response.data.data.tagName);
            } else {
                console.log('Error fetching tag name:', response);
            }
        } catch (error) {
            console.error('Error fetching tag name2:', error);
        }
    };

    const fetchAuthorDetails = async () => {
        try {
            // Assuming the user details are included in the 'Author' field of the post
            setAuthor(post.Author);
        } catch (error) {
            console.error('Error fetching author details:', error);
        }
    };

    useEffect(() => {
        fetchTagName();
        fetchAuthorDetails();
    }, []);

    const savePost = () => {
        setSaved(!saved); // Toggle the value of saved
    };

    return (
        <div className='flex flex-row max-w-full mt-8 border-b-[1px] border-richblack-50 py-4'>
            {/* left section */}
            <div className='flex flex-col w-[80%] gap-2'>
                {/* info */}
                {author && (
                    <Link to={`/Profile/${author._id}`}>
                        <div className='flex gap-3 items-center'>
                            <img src={author.image} className='h-[32px] w-[32px] rounded-full' alt="Author" />
                            <h3 className=''>{author.firstName} {author.lastName}</h3>
                        </div>
                    </Link>
                )}

                {/* heading */}
                <Link to={`/post/${post._id}`}>
                    <h3 className='font-bold'>{post.title}</h3>
                </Link>

                {/* summary */}
                <div className=''>
                    <p>{post.summary}</p>
                </div>

                <div className='flex gap-8 items-center'>
                    {/* Tag */}
                    <Link to={`/Tags/${post.Tag._id}`} className='border border-richblack-50 rounded-2xl px-2 py-1'>
                        {post.Tag.name || 'Loading...'} {/* Display tag name or "Loading..." while fetching */}
                    </Link>
                    {/* time */}
                    <div className='text-richblack-400'>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {/* Saved Post */}
                    {/* <div className='mr-4 cursor-pointer' onClick={savePost}>
                        {
                            saved ? (<FaBookmark />):(<FaRegBookmark />)
                        }
                    </div> */}
                </div>
            </div>
            {/* image */}
            <div className=''>
                <Link to={`/post/${post._id}`}>
                    <img className="h-48 w-48 object-cover rounded-xl" src={post.thumbnail} alt={post.title} />
                </Link>
            </div>
        </div>
    );
};

export default Post;