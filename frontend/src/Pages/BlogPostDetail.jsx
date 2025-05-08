import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/getblog/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to fetch blog post', err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{formattedDate} • {post.readTime}</p>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-80 object-cover rounded-xl shadow mb-6"
      />
      <div className="text-lg text-gray-800 leading-8 whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};

export default BlogPostDetail;
