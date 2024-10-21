import { React, useRef } from 'react'
import "./style/Navbar.scss"
import { Link } from 'react-router-dom'
import { AuthUser } from './AuthContext'
import "./style/Navbar-Res.scss"
import { motion, useScroll } from "framer-motion"
import "./style/Slider.scss"

function Navbar() {
    const logoRef = useRef();
    const {user} = AuthUser();
  const { scrollYProgress } = useScroll();


  return (
    <>
      <motion.div className='scroll-mobile' style={{ scaleX: scrollYProgress }} />  
       <div className='navbarRes-home' dir='rtl'>
            <div className='nav-top'>
                <Link to='/dashboard/home' className="link-logo">
                    <i class="fa-solid fa-flag-checkered ms-2 fs-2 my-2 text-white"></i>
                    <h1 dir='ltr' ref={logoRef} className="logo">
                        <span>ArbiTre</span>
                    </h1>
                </Link>
            </div>
            <div className='nav-bottom'>
                <div className='nav-links'>
                    {user ? 
                      <Link to='/dashboard/home' className="w-100">
                      لوحة التحكم
                    </Link>
                    :
                    <>
                        <Link to='/register' className="w-50">
                            انشاء الحساب
                        </Link>
                        <Link to='/login' className="w-50">
                            تسجيل الدخول
                        </Link>
                    </>
                  }
                </div>
            </div>
        </div> 
    </>
  )
}

export default Navbar