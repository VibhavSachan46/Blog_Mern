import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/post/getPost/${id}`);
                const data = await response.json();

                if (data.success) {
                    setPost(data.data);
                } else {
                    console.error('Failed to fetch post:', data.message);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center gap-y-5 mt-8'>
            {post && (
                <>
                    <div className='font-bold text-3xl'>
                        <h2>{post.title}</h2>
                    </div>

                    <div className='flex gap-2 justify-start '>
                        <img src={post.Author.image} className='h-[32px] w-[32px] rounded-full' alt="Author" />
                        <Link to="/Profile">
                            <h3 className='text-black'>{`${post.Author.firstName} ${post.Author.lastName}`}</h3>
                        </Link>
                    </div>

                    <div>
                        <img src={post.thumbnail} alt="Post Thumbnail" className="w-full" />
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </>
            )}
        </div>
    );
}

export default PostPage;
