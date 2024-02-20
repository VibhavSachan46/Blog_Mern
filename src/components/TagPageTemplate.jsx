import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TagPagePostTemplate from './TagPagePostTemplate';
const TagPageTemplate = () => {
    const { id } = useParams();
    console.log("tagId", id);

    const [details, setDetails] = useState(null);
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/post/getTag/${id}`);
                const data = await response.json();

                if (data.success) {
                    setDetails(data.data);
                    setPosts(data.data.Posts)
                    console.log("tag page tag detail fetched", data.data.Posts)
                } else {
                    console.error('Failed to fetch tag details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching tag details:', error.message);
            }
        };

        fetchTagDetails();
    }, [id]);

    console.log("printing details", details);
    console.log("Printing all posts", posts)

    return (
        <div className='px-16'>
            {details && (
                <div className='p-4 '>
                    <div className='p-4'>
                        <h2 className='text-3xl font-mono'>
                            Tag name: {details.name}
                        </h2>
                        <p className='font-serif mt-2 text-lg'>
                            {details.description}
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        {/* Displaying all posts related to this tag */}
                        {
                            posts.map(post => (
                                <TagPagePostTemplate key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagPageTemplate;
