const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const user = await User.create({
      email,
      fullname,
      lastname,
      password: hashedPassword, 
    });

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({
      message: "User registered successfully.",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
const login = async(req, res)=>{
    const {email , password } = req.body
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
     const user = await User.findOne({email})
     if(!user){
         return res.status(400).json({message:"User not found"})
     }   
     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch){
         return res.status(400).json({message:"Invalid credentials"})
     }
     const payload = {id:user._id}
     const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'1h'})
     res.cookie("token", token, {
        httpOnly: true,
      });
     res.status(200).json({
        message:"User logged in successfully",
        token
     })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
}
const logout = async(req, res)=>{
    try {
        res.cookie("token", null, {
            httpOnly: true,
            expires: new Date(0)
          });
          res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
   

}
module.exports = { register,login,logout };
