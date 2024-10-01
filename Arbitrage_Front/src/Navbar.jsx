import { React,useEffect, useRef } from 'react'
import "./style/Navbar.scss"
import { Link } from 'react-router-dom'
import SplitType from 'split-type'
import gsap from 'gsap';

function navbar() {
    const logoRef = useRef();

    useEffect(() =>{
        new SplitType(logoRef.current, { types: 'words, chars' });
        gsap.to('.char', { y: 0, stagger: 0.05, delay: 0.2, duration: .1 });
    },[])
  return (
    <>
       <div className='navbar-home' dir='rtl'>
            <div className='nav-left'>
                <Link to='/dashboard' className="link-logo">
                    <i class="fa-solid fa-flag-checkered ms-2 me-3 fs-2 mb-2 text-white"></i>
                    <h1 dir='ltr' ref={logoRef} className="logo">
                        <span>ArbiTre</span>
                    </h1>
                </Link>
                <div className='skew'></div>
            </div>
            <div className='nav-right'>
                <div className='info-contact'>
                    <div>
                        <label htmlFor="">البريد الاكتروني</label>
                        <p>arbitre@gmail.com</p>
                    </div>
                    <div>
                    <label htmlFor="">الهاتف</label>
                    <p dir='ltr'>+212 681783861</p>
                    </div>
                </div>
                <div className='nav-links'>
                    {/* <Link to='/dashboard' className="">
                        من نحن
                    </Link> */}
                    <Link to='/dashboard' className="">
                        لوحة التحكم
                    </Link>
                    <Link to='/register' className="">
                        انشاء الحساب
                    </Link>
                    <Link to='/login' className="">
                    تسجيل الدخول
                    </Link>
                
                </div>
            </div>
        </div> 
    </>
  )
}

export default navbar