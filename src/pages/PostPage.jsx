import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/profileSlice';
import { addPost, removePost } from '../slices/savedSlice'; // Import addPost and removePost actions
import Comments from '../components/Comments';

const PostPage = () => {
    const { id } = useParams();
    // const { user } = useSelector((state) => state.profile);
    const [post, setPost] = useState(null);
    const [readingTime, setReadingTime] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [user,setUser] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/post/getPost/${id}`);
                const data = response.data;

                if (data.success) {
                    setPost(data.data);
                    setIsSaved(user?.savedPosts?.some(post => post._id === data.data._id));
                } else {
                    console.error('Failed to fetch post:', data.message);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };
        const getUserDetails = async () => {
            try {
                console.log("token is ", token)
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("http://localhost:5000/api/v1/auth/getProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response) {
                    console.log("profile fetched", response.data.user)
                    setUser(response.data.user)
                }
                else {
                    console.log("cannot fetch profile", response)

                }

            } catch (error) {
                toast.error("could not fethc user details")
                console.log("error is", error)
            }
        }

        getUserDetails()

        fetchPost();
    }, [id, user]);

    useEffect(() => {
        if (post) {
            const wordsPerMinute = 100; // Average reading speed
            const numberOfWords = post.content.split(/\s/g).length;
            const minutes = numberOfWords / wordsPerMinute;
            setReadingTime(Math.ceil(minutes));
        }
    }, [post]);

    const handleSavePost = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/auth/savePost/${post._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                dispatch(addPost(post));
                setIsSaved(true);
                toast.success('Post saved successfully');
            } else {
                toast.error('Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error.message);
            toast.error('Failed to save post');
        }
    };

    const handleUnsavePost = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/auth/unsavePost/${post._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                dispatch(removePost(post._id));
                setIsSaved(false);
                toast.success('Post unsaved successfully');
            } else {
                toast.error('Failed to unsave post');
            }
        } catch (error) {
            console.error('Error unsaving post:', error.message);
            toast.error('Failed to unsave post');
        }
    };


    return (
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center gap-y-5 mt-8'>
            {post && (
                <>
                    <div className='font-bold text-3xl'>
                        <h2>{post.title}</h2>
                    </div>

                    <div className='flex gap-2 justify-start '>
                        <img src={post.Author.image} className='h-[32px] w-[32px] rounded-full' alt="Author" style={{ zIndex: -50 }} />
                        <Link to="/Profile">
                            <h3 className='text-black'>{`${post.Author.firstName} ${post.Author.lastName}`}</h3>
                        </Link>
                        <div>
                            {
                                ((user?.email === post?.Author.email)) ? (
                                    <Link to={`/edit-post/${post._id}`}>
                                        Edit post
                                    </Link>
                                ) : (<div></div>)
                            }
                            <br />
                            {user && (
                                <>
                                    {isSaved ? (
                                        <button onClick={handleUnsavePost}>Unsave</button>
                                    ) : (
                                        <button onClick={handleSavePost}>Save</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        Estimated reading time: {readingTime} minute{readingTime !== 1 ? 's' : ''}
                    </div>

                    <div className='h-96' style={{ zIndex: -50 }}>
                        <img src={post.thumbnail} alt="Post Thumbnail" className="w-full h-full rounded-xl" />
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: post.content }} className='p-6 ml-6 w-11/12 overflow-hidden' />
                    <Comments postId={id}/>
                </>
            )}
        </div>
    );
}

export default PostPage;
