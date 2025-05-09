import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Mail, Phone, MapPin, Send ,Menu ,ChevronDown,Instagram , Linkedin , Facebook} from 'lucide-react';
import axios from 'axios';
import {Link} from 'react-router-dom'
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Improved 3D Floating Animation Component (same as in Landing Page)
const FloatingShape = ({ color, size, delay, duration, className }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -15, 0],
        rotateX: [0, 5, 0],
        rotateY: [0, 8, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay
      }}
    >
      <div 
        className="rounded-lg backdrop-blur-sm"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: `${color}80`,
          transform: "perspective(1500px) rotateX(15deg) rotateY(15deg)",
          boxShadow: `0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.1)`,
          border: `1px solid ${color}40`
        }}
      />
    </motion.div>
  );
};

// Input field with floating label
const FormField = ({ label, type = "text", name, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative mb-6">
      <motion.label 
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          isFocused || value ? 'text-xs text-blue-500 -top-2 bg-white px-1' : 'text-gray-500 top-3'
        }`}
        initial={false}
        animate={{ 
          top: isFocused || value ? '-0.5rem' : '0.75rem',
          fontSize: isFocused || value ? '0.75rem' : '0.875rem',
          color: isFocused ? '#3AB4F2' : value ? '#3AB4F2' : '#6B7280'
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border-2 rounded-lg outline-none transition-all duration-200"
        style={{ 
          borderColor: isFocused ? '#3AB4F2' : '#E5E7EB',
          boxShadow: isFocused ? '0 0 0 3px rgba(58, 180, 242, 0.2)' : 'none'
        }}
        required={required}
      />
    </div>
  );
};

// Textarea with floating label
const TextareaField = ({ label, name, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative mb-6">
      <motion.label 
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          isFocused || value ? 'text-xs text-blue-500 -top-2 bg-white px-1' : 'text-gray-500 top-3'
        }`}
        initial={false}
        animate={{ 
          top: isFocused || value ? '-0.5rem' : '0.75rem',
          fontSize: isFocused || value ? '0.75rem' : '0.875rem',
          color: isFocused ? '#3AB4F2' : value ? '#3AB4F2' : '#6B7280'
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border-2 rounded-lg outline-none transition-all duration-200 min-h-32"
        style={{ 
          borderColor: isFocused ? '#3AB4F2' : '#E5E7EB',
          boxShadow: isFocused ? '0 0 0 3px rgba(58, 180, 242, 0.2)' : 'none'
        }}
        required={required}
      />
    </div>
  );
};

// 3D Tilt effect component for form
const TiltContainer = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the container
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  }
  
  function resetPosition() {
    x.set(0);
    y.set(0);
  }
  
  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={resetPosition}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      {children}
    </motion.div>
  );
};

// Main Contact Us section
const ContactUsSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await axios.post("https://makyarmagenciespvt-backend.vercel.app/api/user/submit", formState);
      if (response.status === 200) {
        setIsSubmitted(true);
        // Reset form fields immediately
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
  
        // Keep the "Message Sent!" state for 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 6000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally, show an error state/message
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Background floating shapes */}
      <FloatingShape color="#FFD700" size="60px" delay={0} duration={3} className="top-1/4 left-1/5 hidden md:block" />
      <FloatingShape color="#3AB4F2" size="100px" delay={0.5} duration={4} className="bottom-1/5 right-1/4 hidden md:block" />
      <FloatingShape color="#D1D5DB" size="40px" delay={1} duration={3.5} className="top-3/4 left-1/3 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <div className="bg-blue-100 text-blue-500 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ color: '#121212' }}
          >
            Contact <span style={{ color: '#3AB4F2' }}>MAKYARM</span> Agencies
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            Have questions or ready to start your digital journey? Our team is here to help.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* Contact Information Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900 rounded-2xl p-8 h-full" style={{ backgroundColor: '#121212' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center" style={{ backgroundColor: '#3AB4F2' }}>
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Email Us</h4>
                    <p className="text-gray-400 mt-1">makyarmagencies@hotmail.com</p>
                    <p className="text-gray-400">support@makyarm.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center" style={{ backgroundColor: '#3AB4F2' }}>
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Call Us</h4>
                    <p className="text-gray-400 mt-1">+91 9618820792</p>
                    <p className="text-gray-400">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center" style={{ backgroundColor: '#3AB4F2' }}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Visit Us</h4>
                    <p className="text-gray-400 mt-1">123 Digital Avenue</p>
                    <p className="text-gray-400">Tech City, TC 10101</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  {['🔹', '🔹', '🔹', '🔹'].map((icon, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-3"
          >
            <TiltContainer>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#121212' }}>
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <FormField 
                    label="Your Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <FormField 
                    label="Your Email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  
                  <FormField 
                    label="Subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                  
                  <TextareaField
                    label="Your Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-4 rounded-lg text-white font-medium mt-4 flex items-center justify-center ${isSubmitted ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ backgroundColor: isSubmitted ? '#10B981' : '#3AB4F2' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : isSubmitted ? (
                      <>
                        Message Sent!
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="ml-2"
                        >
                          ✓
                        </motion.div>
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </TiltContainer>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-16"
        >
          <div className="bg-white p-1 rounded-2xl shadow-lg">
            {/* Map placeholder - Replace with actual map component in production */}
            <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
              <div className="w-full h-full relative">
                <img 
                  src="/api/placeholder/1200/400" 
                  alt="Map location" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <MapPin className="w-12 h-12 text-blue-500" style={{ color: '#3AB4F2' }} />
                  <span className="bg-white px-4 py-2 rounded-full shadow-md mt-2 font-medium">
                    MAKYARM Headquarters
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              We're located in the heart of Tech City. Feel free to visit us during business hours!
            </p>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="mt-24"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
            style={{ color: '#121212' }}
          >
            Frequently Asked Questions
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What services does MAKYARM provide?",
                answer: "MAKYARM provides a full range of digital services including digital marketing, web development, brand strategy, and SEO optimization tailored to your business needs."
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on scope and complexity. A website development project typically takes 4-8 weeks, while ongoing marketing campaigns are structured around quarterly goals."
              },
              {
                question: "Do you work with small businesses?",
                answer: "Absolutely! We work with businesses of all sizes, from startups to enterprises, and tailor our solutions to fit your specific needs and budget."
              },
              {
                question: "What makes MAKYARM different from other agencies?",
                answer: "Our approach combines strategic thinking with creative execution, focusing on measurable results and long-term partnerships rather than one-off projects."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold mb-2" style={{ color: '#121212' }}>
                  {faq.question}
                </h4>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Import Navbar and Footer from the main page
// For the example, I'll add simplified versions

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-10 w-32 flex items-center"
            >
              <span className="text-white font-bold">MAKYARM</span>
            </motion.div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            {[
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
].map((item) => (
  <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
    <Link
      to={item.path}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {item.name}
    </Link>
  </motion.div>
))}

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/contact"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  style={{ backgroundColor: '#3AB4F2' }}
                >
                  Get Started
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ].map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {item.name}
    </Link>
  ))}
            <Link
              to="/signup"
              className="bg-blue-500 text-white block px-3 py-2 rounded-md text-base font-medium"
              style={{ backgroundColor: '#3AB4F2' }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="h-10 w-32 mb-4 flex items-center">
              <span className="font-bold text-xl" style={{ color: '#3AB4F2' }}>MAKYARM</span>
            </div>
            <p className="text-gray-400">
              Growing businesses through strategic digital solutions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Website Development</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Graphic Designing</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Email Marketing</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Banner Ads</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Our Team</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
  <Link to="https://www.instagram.com/makyarmagencies/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Instagram />
  </Link>
  <Link to="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFzN8_L4ZWe2wAAAZavRGAAR3Hjm17DF1061ZDJUalZHDwooaA-F33D1gyI_Icca38MdqbKUkgJi8Xzp9lQJSENPyJOcmiPmq9lf69FAn9eDWwjQo0o8mEjEwi599VQU64ggNc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmakyarm-agencies-private-ltd%2F" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Linkedin />
  </Link>
  <Link to="https://www.facebook.com/confirmemail.php?next=https%3A%2F%2Fwww.facebook.com%2Fpeople%2FMakyarm-Agencies%2F61564953929825%2F#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Facebook />
  </Link>
</div>
            <p className="mt-4 text-gray-400">
              contact@makyarm.com<br />
              +91 96188 20792
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 MAKYARM Agencies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Page Header with animated background
const PageHeader = () => {
  return (
    <div className="relative bg-gray-900 pt-20 pb-32 overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* 3D Floating Shapes with improved rendering */}
      <FloatingShape color="#FFD700" size="80px" delay={0} duration={3} className="top-1/4 left-1/4" />
      <FloatingShape color="#3AB4F2" size="120px" delay={0.5} duration={4} className="bottom-1/4 right-1/4" />
      <FloatingShape color="#D1D5DB" size="60px" delay={1} duration={3.5} className="top-3/4 left-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Get in Touch With <span style={{ color: '#3AB4F2' }}>MAKYARM</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            We're here to answer your questions and help you grow your business
          </motion.p>
        </div>
      </div>
      
      {/* Bottom wave */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#f9fafb" />
      </svg>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageHeader />
      <ContactUsSection />
      <Footer />
    </div>
  );
}