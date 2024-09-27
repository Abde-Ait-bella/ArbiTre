import React, { useEffect, useRef, useState } from 'react'
import "../src/style/Slider.scss"
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';



function Slider() {
  const [selectedId, setSelectedId] = useState(null)
  
  const cards = [{
    id: 1,
    subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, minima?',
    title: 'Card 1'
  }, {
    id: 2,
    subtitle: 'Lorem ipsum dolor sit amet.',
    title: 'Card 2'
  }, {
    id: 3,
    subtitle: 'Lorem ipsum dolor sit amet.',
    title: 'Card 3'
  }, {
    id: 4,
    subtitle: 'Lorem ipsum dolor sit amet.',
    title: 'Card 4'
  }]




  const textRef = useRef();
  const textRefArab = useRef();
  const refHome = useRef();


  const [ref, inView1] = useInView({ threshold: 0.5 });
  const [ref1, inView2] = useInView({ threshold: 0.5 });
  const [ref2, inView3] = useInView({ threshold: 0.5 });

  useEffect(() =>{
    refHome.current.style.transition = 'background-color 2s ease'; 
    switch (true) {
      case inView1:
        if (refHome.current) {
          refHome.current.style.backgroundColor = '#0b0b0e';
        }
        break;
        
        case inView2:
          if (refHome.current) {
            refHome.current.style.backgroundColor = '#8d0d0d';
          }
          break;
          
        case inView3:
          if (refHome.current) {
            refHome.current.style.backgroundColor = 'rgb(251, 171, 0)';
          }
          break;

      default:
        break;
    }
},[inView1, inView2, inView3])


  useEffect(() =>{
    
        const splitText = new SplitType(textRef.current, {
          type: "words",
          wordDelimiter: " ",
          wordsClass: "word"
        });

      gsap.to(splitText.words,
        {
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
      });
      

      const  contents = gsap.utils.toArray("#section-parent .section");

      gsap.to(contents, {
        xPercent: -100 * (contents.length - 1),
        scrollTrigger: {
          trigger : refHome.current,
          scrub: 0.2,
          // end: '+=' + refHome.current.offsetWidth,
          end: '+=' + refHome.current.offsetWidth * (contents.length - 1), 
          pin : true,
          snap : 1 / (refHome.current - 1),
          delay: 0.1, // يمكن تزيد هاد الـ delay باش تعطي فرصة للتوقف في كل عنصر
          pinSpacer: true,
        }
      });
    },[])

  return (
    <div ref={refHome} className='sections'  style={{  minHeight: "100vh" }} >
      <div className='row section-parent'id='section-parent' >
            <div className='home-section section p-0 m-0'>
              <p ref={textRefArab} style={{ marginTop: "-40px" }} dir='rtl' className='text-arab text-white'>أول منصة خاصة بالحكام بالمغرب</p>
              <p ref={textRef} style={{ marginTop: "-40px" }} dir='ltr' className='text-white'>La première plateforme pour les arbitres au Maroc</p>
              <div className='scroll-down'>
                <p>إ سحب للأسفل</p>
                <p className='mt-5'><i class="fa-solid fa-arrow-down"></i></p>
              </div>
              <div className='blob-home'></div>
            </div>
            <div ref={ref}  className='about-section section m-0'>
              <p dir='rtl' className='title'>من نحن</p>
              <p dir='rtl' className='text-arab text-center'>
                {inView1 ?
                  <span >
                <Typewriter
                  words={[
                    '" منصة تقوم تساعد العمل الاداري للحكم بعد المباراة عن طريق تسهيل عملية كتابة التقرير الخاص بالمباراة وتوفر العديد من المعلومات والميزات كإحصائيات خاصة بالحكم إلخ ... "',
                  ]}
                  cursor
                  // pauseFor={5000}
                  // cursorStyle=""
                  typeSpeed={70}
                  // deleteSpeed={50}
                  delaySpeed={1000}
                />
                  </span>
                  : ""
                }
              </p>
              <div className='blobs-about'>
                <div className="blob_1"></div>
                <div className="blob_2"></div>
              </div>
            </div>
            <div ref={ref1} className='section p-0 m-0 '>
              <div class="" style={{color:"black"}}>
                <h2 class="text-2xl font-bold flex justify-center">
                  Jobs
                </h2>
                {/* Jobs Tab */}
                <div class="grid grid-cols-4 bg-green-300 justify-between p-4 space-x-2" tyle={{color:"black"}}>
                    <motion.div className="bg-purple-600 flex items-center justify-center h-screen">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cards.map((item) => (
                          <motion.div
                            className={`card bg-white rounded-lg shadow-md cursor-pointer transform transition-transform duration-500 hover:scale-105 ${
                              selectedId === item.id ? 'card-selected' : ''
                            }`}
                            layoutId={`card-container-${item.id}`}
                            onClick={() => setSelectedId(item.id)}
                            key={item.id}
                            initial={{ scale: 1 }}
                            animate={{ scale: selectedId === item.id ? 1.1 : 1 }} // Increase scale on selected card
                            transition={{ duration: 0.3 }}
                          >
                            <div className="card-content">
                              <motion.h2 className="text-xl font-bold mb-2 text-purple-600">{item.title}</motion.h2>
                              <motion.h5 className="text-sm font-bold mb-1 text-gray-700">{item.subtitle}</motion.h5>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <AnimatePresence>
                        {selectedId && (
                          <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {cards.map((item) => (
                              item.id === selectedId && (
                                <motion.div
                                  className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto"
                                  layoutId={`card-container-${item.id}`}
                                  key={item.id}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                >
                                  <motion.div className="relative">
                                    <motion.button
                                      className="absolute top-2 right-2 py-1 px-2 text-center text-white bg-red-500 rounded-full"
                                      onClick={() => setSelectedId('')}
                                    >
                                      Close
                                    </motion.button>
                                    <motion.h2 className="text-xl font-bold mb-2 text-purple-600">{item.title}</motion.h2>
                                    <motion.h5 className="text-sm font-bold mb-1 text-gray-700">{item.subtitle}</motion.h5>
                                    <motion.p className="text-md text-gray-700 mb-4">{item.description}</motion.p>
                                    <motion.p
                                      className="text-md text-gray-700"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                    >
                                      Additional content can go here!
                                    </motion.p>
                                  </motion.div>
                                </motion.div>
                              )
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                </div>
              </div>
            </div>
            <h1 ref={ref2} className='section p-0 m-0 bg-white'>test4</h1>
            <h1  className='section p-0 m-0 bg-danger'>test5</h1>
      </div>
    </div>
  )
}

{/* 
<div className= about'>
  <p  dir='ltr' className='text-white'>About</p>
</div>
<div  className= services'>
  <p  dir='ltr' className='text-white'>Services</p>
</div>
<div  className= contact'>
  <p  dir='ltr' className='text-white'>Contact</p>
</div> */}
export default Slider