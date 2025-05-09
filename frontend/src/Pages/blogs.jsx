import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Card hover effect
const cardHover = {
  rest: { 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
  },
  hover: { 
    scale: 1.03,
    rotateX: 5,
    rotateY: 5,
    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
    }
  }
};

// Mock blog data - replace with your real data


// Get all unique categories

// BlogHeader Component
const BlogHeader = () => {
  return (
    <div className="relative bg-gray-900 pt-24 pb-16 overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* 3D Floating Shapes */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-lg" style={{ 
        backgroundColor: '#FFD70080',
        transform: "perspective(1500px) rotateX(15deg) rotateY(15deg)",
        boxShadow: `0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.1)`,
        border: `1px solid #FFD70040`,
        animation: "float 4s ease-in-out infinite"
      }} />
      
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-lg" style={{ 
        backgroundColor: '#3AB4F280',
        transform: "perspective(1500px) rotateX(15deg) rotateY(15deg)",
        boxShadow: `0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.1)`,
        border: `1px solid #3AB4F240`,
        animation: "float 6s ease-in-out infinite reverse"
      }} />
      
      <style jsx>{`
        @keyframes float {
          0% { transform: perspective(1500px) translateY(0) rotateX(15deg) rotateY(15deg); }
          50% { transform: perspective(1500px) translateY(-15px) rotateX(20deg) rotateY(20deg); }
          100% { transform: perspective(1500px) translateY(0) rotateX(15deg) rotateY(15deg); }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            variants={fadeInUp}
          >
            <span style={{ color: '#3AB4F2' }}>MAKYARM</span> Blog
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Insights & expertise on digital marketing, web development, and brand strategy
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom wave */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#f9fafb" />
      </svg>
    </div>
  );
};

// Blog Search & Filter Component


// Blog Card Component


const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg"
      variants={fadeInUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <motion.div variants={cardHover}>
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#121212' }}>{post.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p> {/* Optional truncation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center text-blue-500 font-medium"
            style={{ color: '#3AB4F2' }}
            onClick={() => navigate(`/blog/${post._id}`)}
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-md ${
          currentPage === 1 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`flex items-center justify-center w-10 h-10 rounded-md ${
            currentPage === i + 1
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          style={currentPage === i + 1 ? { backgroundColor: '#3AB4F2' } : {}}
        >
          {i + 1}
        </button>
      ))}
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-md ${
          currentPage === totalPages 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
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
// Main Blog Page Component
const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://makyarmagenciespvt-backend.vercel.app/api/user/getallblog');

        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load blogs', err);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = posts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p className="text-gray-600 mb-8" variants={fadeIn} initial="hidden" animate="visible">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </motion.p>
          {filteredPosts.length > 0 ? (
            <>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                {currentPosts.map(post => <BlogCard key={post.id} post={post} />)}
              </motion.div>
              {totalPages > 1 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
            </>
          ) : (
            <motion.div className="text-center py-12" variants={fadeIn} initial="hidden" animate="visible">
              <p className="text-gray-500 text-lg">No articles found. Try adjusting your search criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;