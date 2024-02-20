import React from 'react'
import { Link } from 'react-router-dom'

const TrendingPost = () => {
    return (
        <div>
            <Link to="/Post">
                <div className='flex flex-col w-[80%] gap-2'>

                    {/* info */}
                    <div className='flex felx-row gap-2 h-'>
                        <img src="http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg" className='h-[32px] w-[32px] rounded-full'></img>
                        <h3 className=''>Vibhav Sachan</h3>
                    </div>

                    {/* heading */}
                    <h3 className='font-bold'>AI predictions: Top 13 AI trends for 2024</h3>

                    {/* summary */}
                    <div className=''>
                        <p>Explore the future with our comprehensive guide to the top 13 AI trends anticipated for 2024. — Did you know that the global AI market is expected to reach a staggering $190.61 billion by 2025, growing at a</p>
                    </div>

                    <div className='flex gap-8'>
                        {/* Tag */}
                        <button className='border border-richblack-50 rounded-2xl px-1'>
                            Ai trends
                        </button>
                        {/* time */}
                        <div className='text-richblack-400'>
                            Dec 10
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TrendingPost