import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useSelector } from 'react-redux'

const Comments = ({ postId }) => {
    const [allComment, setAllComment] = useState([])
    const [newComment, setNewComment] = useState('');
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    console.log("id is", postId)
    console.log("user id is", user?._id)
    console.log("token is",token)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/post/${postId}/getComments`);
                console.log("response is ", response.data)
                console.log("author is ", response.data.comments)
                setAllComment(response.data.comments)

            } catch (error) {
                console.log("Couldnot fetch comments")
            }
        }

        fetchComments()
    }, [])
    console.log("All comments are", allComment)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/v1/post/${postId}/addComment`,
                {
                    comment: newComment,
                    authorId: user?._id
                }
            );
            setAllComment([...allComment, response.data.comment]);
            setNewComment('');
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.log("Could not add comment");
        }
    };


    return (
        <div className='w-full justify-center items-center'>
            {/* Input to create new comment */}
            {
                token ? (<div>
                    <div className='flex flex-row justify-center'>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                rows={4}
                                cols={50}
                                className="w-full border p-2 my-2 rounded-xl"
                            ></textarea>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Comment
                            </button>
                        </form>
                    </div>
                </div>) : (<div></div>)
            }

            {/* showing all comments */}
            <div className='justify-center items-center'>
                {allComment.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}

            </div>
        </div>
    )
}

export default Comments