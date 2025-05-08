import './App.css'
import AboutUs from './Pages/aboutus';
import ContactPage from './Pages/contact-us';
import LandingPage from './Pages/landingpage'
import BlogPage from './Pages/blogs.jsx'
import ServicesPage from './Pages/services.jsx'
import Dashboard from './Pages/dashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import AddBlog from './Pages/AddBlog.jsx';
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path ="/admin-dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
