import React from 'react';
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from 'react-redux';

const Comment = ({ comment }) => {
    const { user } = useSelector((state) => state.profile);
    console.log("Author email is",comment.Author.email)
    console.log("Current user email is",user?.email)

    return (
        <div className="border border-richblack-100 p-4 rounded-xl my-2 lg:mx-16 sm:mx-2">
            <div className=" flex items-center justify-between">
                <div className='flex gap-2 items-center'>
                    <img src={comment.Author.image} alt="Author" className="h-8 w-8 rounded-full mr-2" />
                    <span className="font-bold">{comment.Author.firstName}</span>
                    <p className="text-richblack-500">Posted on {moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

                </div>
                {
                    user?.email === comment.Author.email ? (<div>
                        <AiOutlineDelete className='text-xl cursor-pointer' />
                    </div>):(<div></div>)
                }
            </div>
            <div>
                <p className="mt-2">{comment.comment}</p>
            </div>

        </div>
    );
};

export default Comment;

