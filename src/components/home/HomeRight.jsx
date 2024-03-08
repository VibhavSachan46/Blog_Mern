import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrendingPost from './TrendingPost';
import { apiConnector } from '../../services/apiconnector';
import { TagEndpoints } from '../../services/apis';
import { fetchTagsFailure, fetchTagsRequest, fetchTagsSuccess, } from '../../slices/Tag';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomeRight = () => {
  // const [tags, setTags] = useState([]);
  const TAGS_API = TagEndpoints.TAGS_API;

  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  // const { user } = useSelector((state) => state.profile);

  // const tags = "heleloeo"
  const { loading } = useSelector((state) => state.tags);
  // const loading = false

  const [randomPosts, setRandomPosts] = useState([])



  useEffect(() => {
    const fetchTags = async () => {
      dispatch(fetchTagsRequest());
      try {
        const response = await apiConnector("GET", TAGS_API);
        dispatch(fetchTagsSuccess(response.data.data));
        console.log("response is", response.data.data)
      } catch (error) {
        dispatch(fetchTagsFailure(error.message));
      }
    };

    const fetchRandomPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/post/getRandomPosts");
        console.log("responsesssss is", response)
        console.log("response.data.success", response.data.success)
        console.log("response.data.data", response.data.posts)
        if (response.data.success === true) {
          setRandomPosts(response.data.posts);
        }else{
          toast.error("Could not fetch recommended posts")
        }
      } catch (error) {
        console.log("Could not fetch random posts");
      }
    };


    fetchTags();
    fetchRandomPosts()
  }, [dispatch]);

  console.log("Tags are ", tags.map(tag => tag.name).join(", "));
  console.log("random posts are", randomPosts);

  return (
    <div className="">
      {/* Recommended posts */}
      <div className="flex flex-col justify-start items-start gap-6 mt-16">
        <h2 className="text-2xl">
          <span className="border-b inline-block">Tags</span>
        </h2>
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <div>Loading......</div>
          ) : (
            Array.isArray(tags) &&
            tags.map((tag, index) => (
              <Link to={`/tags/${tag._id}`} key={index}>
                <p className="border border-richblack-50 rounded-3xl px-3 py-1">{tag.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Trending Posts */}
      <div className="mt-8">
        <h2 className="text-2xl">
          <span className="border-b inline-block">Trending Posts</span>

        </h2>
        <div className="flex flex-col gap-8 mt-8">
          {/* <TrendingPost post={randomPosts}/> */}
          {
            randomPosts.map((post) => (
              <TrendingPost key={post._id} post={post}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
