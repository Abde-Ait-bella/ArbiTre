import React, { useEffect, useRef, useState } from 'react'
import "../src/style/Slider.scss"
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Slider() {

  const textRef = useRef();
  const textRefArab = useRef();


  useEffect(() =>{
    
        const splitText = new SplitType(textRef.current, {
          type: "words",
          wordDelimiter: " ",
          wordsClass: "word"
        });

      gsap.to(splitText.words,
        {
          scrollTrigger:{
            trigger: splitText.words,
            toggleActions: "restart  pause reverse pause",
          },
        y: 50,
        delay: 1,
        ease: "back.inOut(8)",
        stagger: 0.2,
      });
      
      gsap.fromTo(textRefArab.current,
        { opacity: 0 }, 
        {
        opacity: 1,
        y: 50,
        delay: 2.5,
        ease: "back.inOut(8)",
        stagger: 0.2,
        duration: 1,
        scrollTrigger:{
          trigger: splitText.words,
          toggleActions: "restart  pause reverse pause",
        },
        // ease: 'back.inOut',
      });
      
      
    },[])

  return (
    <div className='slider' >
          <div className='slider-title'>
            <p ref={textRefArab} style={{ marginTop: "-40px" }} dir='rtl' className='text-arab text-white'>أول منصة خاصة بالحكام بالمغرب</p>
            <p ref={textRef} style={{ marginTop: "-40px" }} dir='ltr' className='text-white'>La première plateforme pour les arbitres au Maroc</p>
          </div>
    </div>
  )
}

export default Slider