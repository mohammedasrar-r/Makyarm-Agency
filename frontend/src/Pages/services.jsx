import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { Code, PenTool, Mail, Image, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
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

// Improved 3D Floating Element for background decoration
const FloatingShape = ({ color, size, delay, duration, className }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -15, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <div 
        className="rounded-lg"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          boxShadow: `0 10px 30px rgba(0,0,0,0.2)`,
          opacity: 0.7
        }}
      />
    </motion.div>
  );
};

// Navbar Component
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
                  to="/signup"
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

// 3D Service Card Component with hover effects
const ServiceCard = ({ title, description, Icon, color, delay }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay }
        }
      }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-xl overflow-hidden shadow-xl p-8 transform transition-all duration-300 relative"
    >
      {/* Card content */}
      <div className="relative z-10">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}80)`,
            boxShadow: `0 8px 16px ${color}40`
          }}
        >
          <Icon className="text-white h-8 w-8" />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <Link to="/contact">
  <motion.button
    whileHover={{ x: 5 }}
    className="flex items-center text-sm font-medium"
    style={{ color }}
  >
    Learn more <ArrowRight className="ml-1 h-4 w-4" />
  </motion.button>
</Link>

      </div>
      
      {/* 3D Decoration - Top left corner */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 -mt-12 -ml-12 rounded-full opacity-10"
        style={{ 
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(20px)"
        }} 
      />
      
      {/* 3D Decoration - Bottom right corner */}
      <div 
        className="absolute bottom-0 right-0 w-24 h-24 -mb-8 -mr-8 rounded-full opacity-10"
        style={{ 
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(15px)"
        }} 
      />
      
      {/* 3D effect divider line */}
      <div 
        className="absolute bottom-0 left-0 h-1 rounded-full"
        style={{ 
          width: '30%',
          background: `linear-gradient(90deg, ${color}, transparent)`,
          boxShadow: `0 0 8px ${color}80`
        }} 
      />
    </motion.div>
  );
};

// Services Header Section
const ServicesHeader = () => {
  return (
    <div className="relative pt-32 pb-16 bg-gray-900 overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* Background floating shapes */}
      <FloatingShape color="#FFD700" size="80px" delay={0} duration={3} className="top-1/4 left-1/4" />
      <FloatingShape color="#3AB4F2" size="120px" delay={0.5} duration={4} className="bottom-1/4 right-1/4" />
      <FloatingShape color="#D1D5DB" size="60px" delay={1} duration={3.5} className="top-3/4 left-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
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
          className="text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
          >
            Our <span style={{ color: '#3AB4F2' }}>Services</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We offer comprehensive digital solutions crafted to elevate your brand presence and drive results.
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

// Main Services Grid Section
const ServicesGrid = () => {
  const services = [
    {
      title: "Website Development",
      description: "Custom responsive websites built with modern technologies that engage your audience and drive conversions.",
      icon: Code,
      color: "#3AB4F2"
    },
    {
      title: "Graphic Designing",
      description: "Eye-catching logos, brand identity, and visual assets that make your brand stand out from the competition.",
      icon: PenTool,
      color: "#FFD700"
    },
    {
      title: "Email Marketing",
      description: "Strategic email campaigns that nurture leads, boost engagement, and increase customer retention.",
      icon: Mail,
      color: "#9333EA"
    },
    {
      title: "Banner Ads",
      description: "High-converting display advertisements designed to capture attention and drive traffic to your website.",
      icon: Image,
      color: "#EC4899"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              Icon={service.icon}
              color={service.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "We start with understanding your business needs and goals"
    },
    {
      number: "02",
      title: "Strategy",
      description: "Our team develops a customized plan for your project"
    },
    {
      number: "03",
      title: "Creation",
      description: "We bring your vision to life with expert execution"
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "We ensure a smooth launch and provide ongoing assistance"
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#121212' }}>
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
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Our Process
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-300 max-w-xl mx-auto"
          >
            How we work with you to bring your vision to reality.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }
              }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-xl p-8 h-full">
                <div 
                  className="text-5xl font-bold mb-4" 
                  style={{ 
                    color: '#3AB4F2',
                    opacity: 0.2,
                    position: 'absolute',
                    top: '10px',
                    right: '20px'
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call To Action Section
const CTASection = () => {
  return (
    <section className="py-20 relative" style={{ backgroundColor: '#3AB4F2' }}>
      {/* Background 3D effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #3AB4F2, #2980b9)',
          opacity: 0.9
        }}
      >
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full" 
          style={{ 
            backgroundColor: 'rgba(255, 215, 0, 0.15)',
            filter: 'blur(60px)'
          }} 
        />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(50px)'
          }} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
          >
            Let's Work Together
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white opacity-90 max-w-2xl mx-auto mb-8"
          >
            Ready to transform your digital presence? Our team of experts is here to help you achieve your goals.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg"
                style={{ backgroundColor: '#FFD700', color: '#121212' }}
              >
                Start Your Project
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
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
  <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Instagram />
  </Link>
  <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Linkedin />
  </Link>
  <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <Facebook />
  </Link>
</div>
            <p className="mt-4 text-gray-400">
              contact@makyarm.com<br />
              +1 (555) 123-4567
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

// Main Services Page Component
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ServicesHeader />
      <ServicesGrid />
      <ProcessSection />
      <CTASection />
      <Footer />
    </div>
  );
}