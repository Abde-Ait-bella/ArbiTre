import React, { useEffect, useRef } from 'react'
import "../src/style/Slider.scss"
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useInView } from 'react-intersection-observer';

function Slider() {

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
            refHome.current.style.backgroundColor = 'red';
          }
          break;
          
        case inView3:
          if (refHome.current) {
            refHome.current.style.backgroundColor = 'yellow';
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
      

      const  contents = gsap.utils.toArray("#hori .section");

      gsap.to(contents, {
        xPercent: -100 * (contents.length - 1),
        scrollTrigger: {
          trigger : refHome.current,
          scrub: 0.2,
          // end: '+=' + refHome.current.offsetWidth,
          end: '+=' + refHome.current.offsetWidth * (contents.length - 1), 
          pin : true,
          snap : 1 / (refHome.current - 1),
          // snap: {
          //   snapTo: 1 / (contents.length - 1), // تقسم المساحة على عدد العناصر
          //   duration: { min: 0.2, max: 1 }, // مدة السلاسة
          //   ease: "power1.inOut", // إضافة تأثير الحركة سلس
          // },
          delay: 0.1, // يمكن تزيد هاد الـ delay باش تعطي فرصة للتوقف في كل عنصر
          pinSpacer: true,
        }
      });
    },[])

  return (
    <div ref={refHome} className='sections'  style={{  minHeight: "100vh" }} >
      <div className='row slider-default'id='hori' >
            <div className='col-md-12 section slider home p-0 m-0'>
              <p ref={textRefArab} style={{ marginTop: "-40px" }} dir='rtl' className='text-arab text-white'>أول منصة خاصة بالحكام بالمغرب</p>
              <p ref={textRef} style={{ marginTop: "-40px" }} dir='ltr' className='text-white'>La première plateforme pour les arbitres au Maroc</p>
              <div className='scroll-down'>
                <p>إ نتقل للأسفل</p>
                <p className='mt-5'><i class="fa-solid fa-arrow-down"></i></p>
              </div>
            </div>
            <div ref={ref} className='col-md-12 section slider about m-0'>
              <p dir='rtl' className='text-arab'>من نحن</p>
              <p dir='rtl' className='text-arab'>منصة تقوم تساعد العمل الاداري للحكم بعد المباراة عن طريق تسهيل عملية كتابة التقرير الخاص بالمباراة وتوفر العديد من المعلومات والميزات كإحصائيات خاصة بالحكم إلخ ...</p>
            </div>
            <h1 ref={ref1} className='col-md-12 section p-0 m-0 '>test3</h1>
            <h1 ref={ref2} className='col-md-12 section p-0 m-0 bg-white'>test4</h1>
            <h1  className='col-md-12 section p-0 m-0 bg-danger'>test5</h1>
      </div>
    </div>
  )
}

{/* 
<div className='slider about'>
  <p  dir='ltr' className='text-white'>About</p>
</div>
<div  className='slider services'>
  <p  dir='ltr' className='text-white'>Services</p>
</div>
<div  className='slider contact'>
  <p  dir='ltr' className='text-white'>Contact</p>
</div> */}
export default Slider