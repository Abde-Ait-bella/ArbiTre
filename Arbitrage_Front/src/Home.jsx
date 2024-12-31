import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Navbar_Res from './Navbar_Res'
import Slider from './Slider'
import "./style/Home.scss"

export default function Home() {


  return (
    <div className='home' dir='ltr'>
        {
          window.innerWidth > 992 ? <Navbar /> :  <Navbar_Res />
        }
        <Slider />
    </div>
  )
}
