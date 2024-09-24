import React, { useRef } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import Services from './Services_Section'
import "./style/Home.scss"

export default function Home() {
  // const navRef = useRef();
  // const slidRef = useRef();
  // const servicesRef = useRef();
  return (
    <div>
      {/* <div style={{height: "100vh", backgroundColor: "dark"}}></div> */}
        <Navbar />
        <Slider />
        <Services />
    </div>
  )
}
