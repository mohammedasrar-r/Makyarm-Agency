import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

const FlashMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {message}
    </motion.div>
  );
};

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 
    try {
        const response = await axios.post("http://localhost:3000/api/user/login", 
            { email, password }, 
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        console.log("Server Response:", response.data);

        if (response.status === 200) {
            setMessage({ text: "Login Successful!", type: "success" });
            Cookies.set("token", response.data.token, { expires: 1 });

            // Trigger navbar update
            window.dispatchEvent(new Event("authChange"));

            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    } catch (error) {
        console.error("Login Error:", error);
        if (error.response) {
            setMessage({ text: error.response.data.msg || "Login Failed! Try again.", type: "error" });
        } else {
            setMessage({ text: "Network Error. Please try again later.", type: "error" });
        }
    }

    setIsLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-24">
      <AnimatePresence>
        {message.text && <FlashMessage message={message.text} type={message.type} onClose={() => setMessage({ text: '', type: '' })} />}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center align-middle">
              Welcome to Makyarm Agency
            </h2>
            <p className="text-gray-600">Get your things done at best price</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              className="w-full px-4 py-3 border rounded-xl" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              className="w-full px-4 py-3 border rounded-xl" 
              required 
            />
            
            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forget-password" className="text-blue-600 hover:underline text-sm font-medium">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
