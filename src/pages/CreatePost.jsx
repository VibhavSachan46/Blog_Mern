import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const user = ""

  const handleSubmit = async (e) => {

  };
  return (
    <div className="bg-blue-900 text-white">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex items-center justify-center border-2 border-gray-300 rounded-md p-2"
          >
            <i className="writeIcon fas fa-plus"></i> Add Image
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput mt-4 p-2 border-2 border-gray-300 rounded-md"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">

        </div>
        <button className="writeSubmit mt-4 bg-blue-500 text-white p-2 rounded-md">
          Publish
        </button>
      </form>
    </div>
  )
}

export default CreatePost