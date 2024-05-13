import React, { useState } from "react";
import axios from 'axios';
import Navbar from "./navbar";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";

function Posts() {
  const [newPost, setNewPost] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setNewPost({ ...newPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };
  
  const handleDescriptionChange = (value) => {
    setNewPost({ ...newPost, description: value });
  };

  const addPost = () => {
    axios.post("https://apitest.reachstar.io/blog/add", newPost)
      .then(function (response) { 
      setNewPost({ title: "", description: "" }); 
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container post">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="form-group">
              <input type="text" placeholder="Title" name="title" value={newPost.title} onChange={handleInputChange} className="form-control mb-3 mt-3" />
              <ReactQuill
                value={newPost.description}
                onChange={handleDescriptionChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Description"
                className="form-control mb-3"
                style={{ width: '100%', minHeight: '100px' }} 
              />
              <Link to="/home" className="btn btn-primary btn-lg" onClick={addPost}>Add</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Posts;

// Quill editor modules and formats
const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'link', 'image',
  'list', 'bullet',
];
