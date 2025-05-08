import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart, Briefcase, Code, Globe, Users, ShieldCheck, Heart } from 'lucide-react';
import {Link} from 'react-router-dom'

// Fade in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Staggered text animation
const AnimatedText = ({ text }) => {
  return (
    <div className="overflow-hidden">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03
            }
          }
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 30px 60px rgba(0,0,0,0.12)" 
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, role, description, image, delay = 0 }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col"
    >
      <TiltCard className="flex flex-col h-full">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-400 text-white text-5xl font-bold">
              {name.split(' ').map(part => part[0]).join('')}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-blue-300">{role}</p>
            </div>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <p className="text-gray-700">{description}</p>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// Parallax Section Component
const ParallaxSection = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <motion.div 
      style={{ y }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

// Mission Vision Card Component
const MissionCard = ({ icon: Icon, title, description }) => {
  return (
    <TiltCard className="p-6 md:p-8 h-full">
      <div className="mb-4 text-blue-500">
        <Icon size={36} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </TiltCard>
  );
};

// Floating Shape Background
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

export default function AboutUs() {
  return (
    <div className="min-h-screen  pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden" style={{ backgroundColor: '#121212' }}>
        {/* 3D Floating Shapes */}
        <FloatingShape color="#FFD700" size="80px" delay={0} duration={3} className="top-1/4 left-1/4" />
        <FloatingShape color="#3AB4F2" size="120px" delay={0.5} duration={4} className="bottom-1/4 right-1/4" />
        <FloatingShape color="#D1D5DB" size="60px" delay={1} duration={3.5} className="top-3/4 left-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="relative z-10">
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
              <motion.div
                variants={fadeInUp}
                className="inline-block px-4 py-1 rounded-full bg-blue-900/30 text-blue-300 mb-4"
              >
                About Our Company
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-extrabold text-white mb-6"
              >
                About <span style={{ color: '#3AB4F2' }}>MAKYARM</span> Agencies
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Transforming ideas into digital realities since 2020
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <motion.div variants={fadeInUp} className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                  Our Story
                </span>
              </motion.div>
              <AnimatedText text="Transforming Ideas Into Digital Realities" />
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6">
                At MAKYARM Agencies, we believe in transforming ideas into digital realities. Founded by visionary entrepreneur Mohammed Abdul Khaleel, MAKYARM is a creative tech-driven agency dedicated to empowering brands, startups, and businesses with powerful digital solutions that drive success.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6">
                With innovation at our core, we bring together a passionate team of strategists, designers, developers, and marketers who are committed to excellence. Our approach combines creativity with technical expertise to deliver solutions that not only look great but perform exceptionally.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 rounded-lg font-medium"
                  style={{ backgroundColor: '#3AB4F2', color: 'white' }}
                >
                  Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>
            
            <ParallaxSection>
              <TiltCard className="overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="MAKYARM Team at Work" 
                  className="w-50% h-full object-cover" 
                />
              </TiltCard>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24 bg-gray-100">
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
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                Meet Our Team
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Minds Behind MAKYARM
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership and key team members bring diverse expertise and a shared passion for digital excellence.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TeamMemberCard 
              name="Mohammed Abdul Khaleel" 
              role="Founder & CEO" 
              description="Khaleel is a tech-savvy innovator and the brain behind multiple successful ventures including Advance Developers, AuraAlley, TrendAura, and now, MAKYARM Agencies. With a sharp eye for design and technology, his leadership is fueled by a mission to make high-quality digital services accessible to all businesses."
              delay={0.1}
            />
            
            <TeamMemberCard 
              name="Yasser Abdul Rahman Mohammed" 
              role="Manager" 
              description="Yasser brings strategic clarity, operational efficiency, and a client-first mindset to MAKYARM. As the Manager, he oversees projects, maintains high service standards, and ensures that every client interaction reflects our commitment to professionalism and value."
              delay={0.2}
            />
            
            <TeamMemberCard 
              name="Asrar Abdullah" 
              role="Web Developer" 
              description="Asrar is our backend genius who ensures every website we build is fast, secure, and scalable. With deep knowledge of front-end frameworks and backend architecture, he plays a crucial role in shaping the online presence of our clients."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <FloatingShape color="#FFD700" size="100px" delay={0.2} duration={4} className="top-1/2 right-10 hidden md:block" />
        <FloatingShape color="#3AB4F2" size="80px" delay={0.7} duration={3.5} className="bottom-1/4 left-10 hidden md:block" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                Our Purpose
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guiding principles that drive everything we do at MAKYARM Agencies.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <MissionCard 
                icon={ShieldCheck} 
                title="Our Mission" 
                description="To deliver affordable, creative, and powerful digital services that help brands grow fearlessly in the digital era. We believe in democratizing access to high-quality digital solutions for businesses of all sizes."
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <MissionCard 
                icon={Globe} 
                title="Our Vision" 
                description="To become the most trusted digital growth partner for ambitious businesses worldwide, known for our creativity, technical excellence, and commitment to client success in an ever-evolving digital landscape."
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <MissionCard 
                icon={Code} 
                title="Innovation" 
                description="We constantly push boundaries to find creative solutions to complex digital challenges."
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <MissionCard 
                icon={Users} 
                title="Collaboration" 
                description="We believe in working closely with our clients as partners in their digital journey."
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <MissionCard 
                icon={Heart} 
                title="Excellence" 
                description="We are committed to delivering work that exceeds expectations in every aspect."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
        <FloatingShape color="#FFD700" size="80px" delay={0.5} duration={4} className="top-1/4 left-1/4" />
        <FloatingShape color="#3AB4F2" size="120px" delay={1} duration={3.5} className="bottom-1/4 right-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium">
                What We Do
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Comprehensive Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-2xl mx-auto">
              We offer end-to-end digital solutions to help your business thrive online.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Creative & Design",
                icon: Briefcase,
                items: [
                  "Logo & Branding Design",
                  "Social Media Post Design",
                  "Motion Graphics & Video Editing",
                  "UI/UX Design for Websites and Apps"
                ]
              },
              {
                title: "Web & App Development",
                icon: Code,
                items: [
                  "Business Websites",
                  "E-Commerce Stores",
                  "Custom Web Portals",
                  "Mobile App Development"
                ]
              },
              {
                title: "Digital Marketing",
                icon: BarChart,
                items: [
                  "Email Marketing Campaigns",
                  "SEO & Local SEO",
                  "Google Ads & Meta Ads",
                  "Content Marketing"
                ]
              },
              {
                title: "Business Solutions",
                icon: Globe,
                items: [
                  "Startup Launch Packages",
                  "Growth Strategy & Consulting",
                  "Social Media Management",
                  "Virtual Assistance for Entrepreneurs"
                ]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard className="p-6 bg-gray-800 text-white h-full border border-gray-700">
                  <div className="mb-4 text-blue-400">
                    <service.icon size={30} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative" style={{ backgroundColor: '#3AB4F2' }}>
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
              Let's Build Your Digital Success Story
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white opacity-90 max-w-xl mx-auto mb-8"
            >
              At MAKYARM Agencies, we're not just service providers – we're your creative growth partners.
            </motion.p>
            <motion.div variants={fadeInUp}>
            <Link to='/contact'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg"
                style={{ backgroundColor: '#FFD700', color: '#121212' }}
              >
                Contact Us Today
              </motion.button>
             </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}