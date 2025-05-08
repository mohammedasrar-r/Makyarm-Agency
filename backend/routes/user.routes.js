const express = require('express');
const router = express.Router();
const { 
    formSubmit,
    getAllSubmissions,
    updateTaskStatus,
    addBlog,
    getAllBlogs,
    getBlog
} = require('../controllers/user.controller');

// Auth routes
router.post('/submit', formSubmit);
router.get('/submissions', getAllSubmissions);
router.patch('/submissions/:id/status', updateTaskStatus);
router.get('/getallblog',getAllBlogs);
router.get("/getblog/:id",getBlog)
router.post('/addblog', addBlog);

module.exports = router;