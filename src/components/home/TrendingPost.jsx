import React from 'react'
import { Link } from 'react-router-dom'

const TrendingPost = ({ post }) => {
    console.log("trending posts post is", post)
    return (
        <div>
            <Link to={`/post/${post._id}`}>
                <div className='flex flex-col w-[80%] gap-2'>

                    {/* info */}
                    <div className='flex felx-row gap-2 items-center'>
                        <img src={post.Author.image} className='h-[32px] w-[32px] rounded-full'></img>
                        <h3 className=''>{post.Author.firstName} {post.Author.lastName}</h3>
                    </div>

                    {/* heading */}
                    <h3 className='font-bold'>{post.title}</h3>

                    {/* summary */}
                    <div className=''>
                        <p>{post.summary}</p>
                    </div>

                    <div className='flex gap-8'>
                        {/* Tag */}
                        
                        {/* time */}
                        <div className='text-richblack-400'>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TrendingPost