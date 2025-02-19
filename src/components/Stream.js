"use client";

import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiSendPlane2Line } from "react-icons/ri";

export default function Stream({ classId, userId, isTeacher }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Mock fetching posts (Replace with actual API call later)
    setPosts([
      {
        id: 1,
        teacherId: "t1",
        content: "Welcome to the class!",
        timestamp: "2025-02-19 10:00",
        comments: [
          { id: 1, userId: "s1", content: "Excited!", timestamp: "2025-02-19 10:05" },
        ],
      },
    ]);
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      teacherId: userId,
      content: newPost,
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      userId,
      content: comment,
      timestamp: new Date().toISOString(),
    };
    
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="w-full px-6 ml-6 mr-6 mt-10">
      {isTeacher && (
        <div className="mb-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Post an announcement..."
          />
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Post
          </button>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{post.content}</h3>
            {isTeacher && (
              <div className="flex gap-2">
                <button onClick={() => handleDeletePost(post.id)} className="text-red-500">
                  <RiDeleteBin6Line />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm">{post.timestamp}</p>
          
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Comments</h4>
            {post.comments.map((comment) => (
              <div key={comment.id} className="border-l-2 pl-2 mt-1">
                <p>{comment.content}</p>
                <span className="text-xs text-gray-400">{comment.timestamp}</span>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border rounded p-2"
                onChange={(e) => setComments({ ...comments, [post.id]: e.target.value })}
              />
              <button
                onClick={() => handleComment(post.id, comments[post.id] || "")}
                className="ml-2 text-blue-500"
              >
                <RiSendPlane2Line />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}