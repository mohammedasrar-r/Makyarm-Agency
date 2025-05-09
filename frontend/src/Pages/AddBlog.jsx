import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddBlog = () => {
  const [form, setForm] = useState({ title: '', content: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('https://makyarmagenciespvt-backend.vercel.app/api/user/addblog', form); // Replace with your API endpoint
      setMessage('Blog added successfully!');
      setForm({ title: '', content: '', imageUrl: '' });
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>

        {message && <p className="text-center mt-4 text-green-600">{message}</p>}
      </form>
    </motion.div>
  );
};

export default AddBlog;
