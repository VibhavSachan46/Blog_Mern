import React from 'react';
import { useDispatch, useSelector } from "react-redux"

const ProfilePage = () => {

  const { user } = useSelector((state) => state.profile);
  console.log("Posts are", user.Posts)

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <div className="flex items-center">
        <img
          src={user.image}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Additional user details or features can be added here */}

      <h2 className="mt-6 text-xl font-semibold">Posts</h2>
      <ul className="list-disc pl-6">
        {user.Posts.map((postId) => (
          <li key={postId}>{postId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
