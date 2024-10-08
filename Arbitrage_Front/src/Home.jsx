import React from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import Services from './Services_Section'
import "./style/Home.scss"

export default function Home() {

  return (
    <div className='home' dir='ltr'>
        <Navbar />
        <Slider />
    </div>
  )
}
