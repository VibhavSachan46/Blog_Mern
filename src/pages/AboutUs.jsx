import React from 'react'


const AboutUs = () => {

    return (
        <div className="container mx-auto p-8">
            <div className="text-center">
                <h1 className="text-3xl font-semibold mb-4">About Me</h1>
            </div>
            <div className="text-lg leading-relaxed">
                <p>
                    Hello! 👋 I'm <span className="text-blue-500 font-bold">Vibhav Sachan</span>, a passionate web developer excited about creating meaningful and innovative digital experiences. Currently diving into the MERN stack, I'm on a mission to turn ideas into elegant, functional, and user-friendly applications.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Education 🎓</h2>
                <p>
                    - <span className="text-blue-500 font-bold">Computer Science Engineering</span> from <span className="text-blue-500 font-bold">Chandigarh Univeristy</span>, Graduated in <span className="text-blue-500 font-bold">2024</span>
                </p>

                {/* Add sections for Skills, Projects, Work Experience, Learning Journey, Coding Philosophy, Interests, and Contact Information */}

                <h2 className="text-2xl font-semibold mt-4">Contact Information 📧</h2>
                <p>
                    Feel free to connect with me on:
                    <br />
                    - LinkedIn: <a href="https://www.linkedin.com/in/vibhav-sachan-9b8867214/"  target="_blank" className="text-blue-500 font-bold">[Your LinkedIn Profile]</a>
                    <br />
                    - GitHub: <a href="https://github.com/VibhavSachan46" className="text-blue-500 font-bold">[Your GitHub Profile]</a>

                    - Twitter: <a href="https://twitter.com/sachan_vibhav" className="text-blue-500 font-bold">[Your GitHub Profile]</a>
                    <br />
                    - Email: <span className="text-blue-500 font-bold">vibhavsachan743@gmail.com</span>
                </p>

                
            </div>
        </div>
    )
}

export default AboutUs