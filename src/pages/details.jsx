import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  

  useEffect(() => {
    axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
      .then(response => {
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedDescription(response.data.description);
        setComments(response.data.comments || []); 
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  const handleTitleChange = event => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = value => {
    setEditedDescription(value);
  };

  const handleEditPost = async () => {
    try {
      const response = await axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      console.log('Post updated successfully:', response.data);
      setPost({ ...post, description: editedDescription });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
      console.log('Post deleted successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`https://apitest.reachstar.io/comment/add/${id}`, {
        postId: id, 
        comment: newComment,
      });
      const addedComment = { id: response.data.id, comment: newComment };
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`);
      console.log('Comment deleted successfully');
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container post">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                {isEditing ? (
                  <input type="text" value={editedTitle} onChange={handleTitleChange} />
                ) : (
                  <h3>{post.title}</h3>
                )}
              </div>
              <div className="card-body">
                {isEditing ? (
                  <ReactQuill
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                  />
                ) : (
                  <p>{post.description}</p>
                )}
              </div>
              <div className="card-footer">
                {isEditing ? (
                  <button onClick={handleEditPost} className="btn btn-primary">Save Changes</button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit</button>
                )}
                <button onClick={handleDeletePost} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container post">
        <div className="row justify-content-center mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <ReactQuill
                  value={newComment}
                  onChange={(value) => setNewComment(value)}
                />
              </div>
              <div className="card-footer">
                <button onClick={handleAddComment} className="btn btn-primary">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>

      
        <div className="row justify-content-center mt-4">
          <div className="col-12">
            <div className="card">
              <ul>
                {
                  comments.map((comment) => (
                    <li key={comment.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span dangerouslySetInnerHTML={{__html: comment.comment}} style={{ flex: '1', marginRight: '10px' }}></span>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="btn btn-danger"
                        style={{ width: '150px' }}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      
  
    </React.Fragment>
  );
};

export default Details;
