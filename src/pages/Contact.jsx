import React from 'react'

const Contact = () => {

    const containerStyle = {
        overflow: 'hidden',
    };


    return (
        <div name="contact" className="w-full h-full p-4 text-white" style={containerStyle}>
            <div className="flex flex-col p-4 mx-auto h-full">
                <div className="flex pb-8 justify-center text-3xl">
                    <p>Submit the form below to get in touch with me</p>
                </div>

                <div className=" flex justify-center items-center">
                    <form
                        action="https://getform.io/f/bcbb9138-9afc-4306-a8eb-3e0741f38f3f"
                        method="POST"
                        className=" flex flex-col w-full md:w-1/2"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="p-4 bg-transparent border-2 rounded-md text-white focus:outline-none tracking-widest"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            className="my-4 p-4 bg-transparent border-2 rounded-md text-white focus:outline-none tracking-widest"
                        />
                        <textarea
                            name="message"
                            placeholder="Enter your message ...."
                            rows="10"
                            className="p-4 bg-transparent border-2 rounded-md text-white focus:outline-none tracking-widest	"
                        ></textarea>

                        <button className="text-white bg-gradient-to-b from-richblue-200 to-richblue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                            Submit Response
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact