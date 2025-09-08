import { React,useEffect, useRef } from 'react'
import "./style/Navbar.scss"
import { Link } from 'react-router-dom'
import SplitType from 'split-type'
import gsap from 'gsap';
import { AuthUser } from './AuthContext';
import logo_red from "../public/img/png/logo_white.png"
import Logo from './Component/Utils/Logo';

function navbar() {
    const logoRef = useRef();
    const {user} = AuthUser();

    useEffect(() =>{
        new SplitType(logoRef.current, { types: 'words, chars' });
        gsap.to('.char', { y: 0, stagger: 0.05, delay: 0.2, duration: .1 });
    },[])
  return (
    <>
       <div className='navbar-home' dir='rtl'>
            <div className='nav-left'>
                <Link to='/dashboard/home' className="link-logo">
                    <Logo variant="dark" size="medium" />
                </Link>
                <div className='skew'></div>
            </div>
            <div className='nav-right'>
                <div className='info-contact'>
                    <div>
                        <label htmlFor="">البريد الاكتروني</label>
                        <p>abdessamadaitbella1998@gmail.com</p>
                    </div>
                    <div>
                    <label htmlFor="">الهاتف</label>
                    <p dir='ltr'>+212 681783861</p>
                    </div>
                </div>
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

export default navbar