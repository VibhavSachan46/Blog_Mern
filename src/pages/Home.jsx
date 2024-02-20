import React, { useState } from 'react'
import Post from '../components/Post'
import HomeLeft from '../components/home/HomeLeft'
import HomeRight from '../components/home/HomeRight'

const Home = () => {

    const [fix,setFix] = useState(false)

    function setFixed () {
        if(window.scrollY >= 500){
            setFix(true)
        } else {
            setFix(false)
        }
    }

    window.addEventListener("scroll",setFixed)

    return (
        <div className='text-black flex flex-row'>

            {/* Left section */}
            <HomeLeft/>

            {/* vertical Border  */}
            <div className='border-r-[1px] border-richblack-100 mt-16 mb-16 mr-16'> </div>
            

            {/* Right half */}
                <HomeRight/>
        </div>
    )
}

export default Home