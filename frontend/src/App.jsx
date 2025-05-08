import './App.css'
import AboutUs from './Pages/aboutus';
import ContactPage from './Pages/contact-us';
import LandingPage from './Pages/landingpage'
import BlogPage from './Pages/blogs.jsx'
import ServicesPage from './Pages/services.jsx'
import Dashboard from './Pages/dashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx'
import AddBlog from './Pages/AddBlog.jsx';
import BlogPostDetail from './Pages/BlogPostDetail.jsx'
import ChatbotToggle from './components/ChatbotToggle.jsx';
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path ="/admin-dashboard" element={<Dashboard/>}/>
        </Routes>
        <ChatbotToggle />
      </BrowserRouter>
    </>
  )
}

export default App
