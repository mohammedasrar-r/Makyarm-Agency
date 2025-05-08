import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const FlashMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </motion.div>
  );
};

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6-digit OTP
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Cooldown timer for resending OTP
  const otpInputs = useRef([]); // Ref to handle input focus
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and password from previous step
  const { email, password, fullname } = location.state || {};

  if (!email || !password || !fullname) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Invalid request. Please restart signup.</p>
      </div>
    );
  }

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  // Handle backspace key to move to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  // Submit OTP for verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredOtp = otp.join(""); // Convert array to string

    try {
      const response = await axios.post("http://localhost:3000/api/verify-otp", {
        email,
        otp: enteredOtp,
        password,
        fullname,
      });

      setMessage({ text: response.data.msg, type: "success" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.msg || "OTP verification failed",
        type: "error",
      });
    }

    setIsLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (cooldown > 0) return; // Prevent resending if cooldown is active

    setCooldown(60); // Set cooldown to 60 seconds

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        fullname,
        email,
        password,
      });

      setMessage({ text: response.data.msg, type: "success" });

      // Start countdown
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setMessage({
        text: "Failed to resend OTP. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-24">
      <AnimatePresence>
        {message.text && (
          <FlashMessage
            message={message.text}
            type={message.type}
            onClose={() => setMessage({ text: "", type: "" })}
          />
        )}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h2>
            <p className="text-gray-600">Enter the OTP sent to your email</p>
          </motion.div>

          {/* OTP Inputs */}
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (otpInputs.current[index] = el)}
                  className="w-12 h-12 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="1"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center text-gray-600">
            {cooldown > 0 ? (
              <p className="text-gray-400">Resend OTP in {cooldown}s</p>
            ) : (
              <p>
                Didn't receive an OTP?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={handleResendOtp}
                >
                  Resend
                </span>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
