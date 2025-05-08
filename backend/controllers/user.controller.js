const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Submission = require("../models/submission.model");
const Blog = require("../models/blogs.model");

// Register user with default role "user"
const register = async (req, res) => {
  try {
    const { email, fullname, lastname, password } = req.body;
    
    if (!email || !fullname || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Always set default role to "user" for regular registration
    const user = await User.create({
      email,
      fullname,
      lastname,
      password: hashedPassword,
      role: "user"  // Default role
    });
    
    const payload = { 
      id: user._id,
      role: user.role 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie("token", token, {
      httpOnly: true,
    });
    
    res.status(201).json({
      message: "User registered successfully.",
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Login with role in JWT
const login = async(req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    try {
      const user = await User.findOne({email});
      if(!user) {
          return res.status(400).json({message: "User not found"});
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
          return res.status(400).json({message: "Invalid credentials"});
      }
      
      // Include role in JWT payload
      const payload = {
        id: user._id,
        role: user.role
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
      
      res.cookie("token", token, {
         httpOnly: true,
      });
      
      res.status(200).json({
         message: "User logged in successfully",
         token,
         role: user.role
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

const logout = async(req, res) => {
    try {
        res.cookie("token", null, {
            httpOnly: true,
            expires: new Date(0)
        });
        
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

// Middleware to verify JWT and check roles
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to check for specific roles




const formSubmit = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newSubmission = new Submission({ name, email, message, status:"Pending" });
    await newSubmission.save();

    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Submission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addBlog = async(req,res)=>{
    const {title, content, imageUrl} = req.body;

    if(!title || !content || !imageUrl){
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const newBlog = new Blog({title, content, imageUrl});
        await newBlog.save();
        res.status(201).json({message: "Blog added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}
const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}
// Get all users (admin only)
const getBlog = async (req,res)=>{
  const { id } = req.params;
  const blog = await Blog.findById(id); // adjust according to your DB
  if (!blog) return res.status(404).send('Not found');
  res.json(blog);
}
module.exports = { 
    register,
    login, 
    logout,
    verifyToken, 
    formSubmit,
    getAllSubmissions,
    updateTaskStatus,
    addBlog,
    getAllBlogs,
    getBlog
};