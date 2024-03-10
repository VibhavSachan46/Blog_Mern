import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiseLoader } from "react-spinners"
const BASE_URL = process.env.REACT_APP_BASE_URL

const SavedPosts = () => {
    // const { cart } = useSelector((state) => state.saved)
    // const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setLoading(true)
                console.log("token is ", token)
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${BASE_URL}/auth/getProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response) {
                    // console.log("profile fetched", response.data.user)
                    setUser(response.data.user)
                }
                else {
                    console.log("cannot fetch profile", response)
                    toast.error("Failed to fetch profile")

                }
                setLoading(false)
            } catch (error) {
                toast.error("could not fethc user details")
                console.log("error is", error)
            }
        }

        getUserDetails()
    }, [])

    console.log("user is", user)
    return (
        <div className='flex flex-col p-4'>
            {
                loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <RiseLoader color="#999DAA" />
                    </div>
                ) : (
                    <div className='mx-auto flex flex-col items-center'>
                        <h2 className='text-4xl p-4'>
                            Saved Posts
                        </h2>
                        <div className='grid grid-cols-3 gap-4'>
                            {user?.savedPosts?.map((postId) => (
                                // <li key={postId}>{postId.title}</li>
                                <div className=''>
                                    <div className='flex'>
                                        <div className='mt-4 p-4'>
                                            <div className='cursor-pointer'>
                                                <Link to={`/post/${postId._id}`}>
                                                    <div className='border border-gray-200 p-4 rounded-xl'>
                                                        <div className='h-64 overflow-hidden'>
                                                            <img src={postId.thumbnail} alt={postId.title} className='w-full h-full object-cover mb-4 rounded-xl' />
                                                        </div>
                                                        <h2 className='text-xl font-bold mb-2 mt-2 line-clamp-2'>{postId.title}</h2>
                                                        <p className='text-md line-clamp-3'>{postId.summary}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default SavedPosts