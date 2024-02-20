import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrendingPost from './TrendingPost';
import { apiConnector } from '../../services/apiconnector';
import { TagEndpoints } from '../../services/apis';
import { fetchTagsFailure, fetchTagsRequest, fetchTagsSuccess, } from '../../slices/Tag';
import { useDispatch, useSelector } from 'react-redux';

const HomeRight = () => {
  // const [tags, setTags] = useState([]);
  const TAGS_API = TagEndpoints.TAGS_API;

  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  // const { user } = useSelector((state) => state.profile);
  
  // const tags = "heleloeo"
  const { loading } = useSelector((state) => state.tags);
  // const loading = false



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

    fetchTags();
  }, [dispatch]);

  console.log("Tags are ", tags.map(tag => tag.name).join(", "));

  return (
    <div className="w-[30%] overflow-y-auto">
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
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
