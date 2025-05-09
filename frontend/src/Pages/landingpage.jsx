import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight ,Instagram , Linkedin, Facebook} from 'lucide-react';
import { Link } from 'react-router-dom';


// Fade in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Improved 3D Floating Animation Component
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

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* 3D Floating Shapes with improved rendering */}
      <FloatingShape color="#FFD700" size="80px" delay={0} duration={3} className="top-1/4 left-1/4" />
      <FloatingShape color="#3AB4F2" size="120px" delay={0.5} duration={4} className="bottom-1/4 right-1/4" />
      <FloatingShape color="#D1D5DB" size="60px" delay={1} duration={3.5} className="top-3/4 left-1/3" />
      <FloatingShape color="#FFD700" size="100px" delay={1.5} duration={5} className="top-1/2 right-1/3" />
      <FloatingShape color="#3AB4F2" size="50px" delay={2} duration={4.5} className="bottom-1/3 left-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="relative z-10">
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
  <motion.div className="flex justify-center mb-6" variants={fadeInUp}>
  <div className="w-28 h-28 rounded-full bg-white  shadow-lg ring-1 ring-blue-300">
    <img 
      src="public/Logo.jpeg" 
      alt="MAKYARM Logo" 
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</motion.div>


            
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-6"
              variants={fadeInUp}
            >
              <span style={{ color: '#3AB4F2' }}>MAKYARM</span> Agencies
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Grow with Us, Shine in the Digital World.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
            <Link to="/services">
              <motion.button
              
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg flex items-center mx-auto"
                style={{ backgroundColor: '#3AB4F2', color: 'white' }}
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#f9fafb" />
      </svg>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to boost your online presence",
      icon: "📊"
    },
    {
      title: "Web Development",
      description: "Custom websites with cutting-edge technologies",
      icon: "💻"
    },
    {
      title: "Brand Strategy",
      description: "Comprehensive brand identity and positioning",
      icon: "🎯"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
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
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#121212' }}
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            We offer comprehensive digital solutions to elevate your business.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="text-4xl mb-4" style={{ color: '#FFD700' }}>{service.icon}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#121212' }}>
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 flex items-center text-sm font-medium"
                style={{ color: '#3AB4F2' }}
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      quote: "MAKYARM transformed our digital strategy completely. Our online presence has never been stronger.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowFast",
      quote: "Working with MAKYARM has been a game-changer for our brand. Highly recommended!",
      avatar: "MC"
    },
    {
      name: "Jessica Williams",
      role: "Founder, CreativeHub",
      quote: "The team at MAKYARM brings both creativity and strategic thinking to every project.",
      avatar: "JW"
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
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-300 max-w-xl mx-auto"
          >
            Don't just take our word for it - hear from our satisfied clients.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gray-800 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#3AB4F2' }}>
                  <span className="text-white font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Ready to Elevate Your Digital Presence?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white opacity-90 max-w-xl mx-auto mb-8"
          >
            Join hundreds of businesses that have grown with MAKYARM's expertise.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg"
              style={{ backgroundColor: '#FFD700', color: '#121212' }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}