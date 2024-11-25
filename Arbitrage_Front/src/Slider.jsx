import React, { useEffect, useRef } from 'react'
import "../src/style/Slider.scss"
import SplitType from 'split-type'
// import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom';
import { motion, useScroll } from "framer-motion"



function Slider() {

  const textRef = useRef();
  const textRefArab = useRef();
  const refHome = useRef();
  const { scrollYProgress } = useScroll();

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
          // snap : 1 / (refHome.current - 1),
          // snap: {
          //   snapTo: 1 / (contents.length - 1), // يعني غادي ينتقل من section لآخر مباشرة
          //   duration: {min: 0.2, max: 0.5}, // مدة الانتقال، يمكن تعدلها 
          //   ease: "power1.inOut" // تخلي الحركة سلسة
          // },
          // delay: 1, // يمكن تزيد هاد الـ delay باش تعطي فرصة للتوقف في كل عنصر
          pinSpacer: true,
        }
      });
    },[])

  return (
    <div ref={refHome} className='sections'  style={{  minHeight: "100vh" }} >
      <motion.div className='scroll' style={{ scaleX: scrollYProgress }} />  
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
              <p dir='rtl' className='text-arab text-justify'>
                {inView1 ?
                  <span >
                <Typewriter
                  words={[
                    '"أهلاً بكم في منصة ArbiTre.ma ، التي تهدف إلى تسهيل العمل الإداري للحكام بعد المباريات . نسعى من خلال هذه المنصة إلى مساعدة الحكام على تنظيم المهام الإدارية المتعلقة بالمباريات بشكل أسرع وأسهل . "',
                  ]}
                  cursor
                  // pauseFor={5000}
                  // cursorStyle=""
                  typeSpeed={30}
                  // deleteSpeed={50}
                  delaySpeed={100}
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
            <div ref={ref1} className='services-section section p-0 m-0 '>
                <div className="cards">
                  <div className="form" >
                    <label htmlFor="">معلومات جاهزة ومسبقة الإعداد</label>
                    <p>واحدة من أقوى ميزات منصة Arbitre هي أنها توفر لك جميع المعلومات اللازمة بشكل جاهز ومسبق الإعداد الحكام , الأندية , الملاعب . وتمكنك من استرجاع إحصائيات أو تقارير حول مباراة معينة</p>
                  </div>
                  <div className="print">
                    <label htmlFor="">تسجيل وإدارة المباريات</label>
                    {/* <label htmlFor="">إنشــــــــــاء التقــــاريــــر</label> */}
                    <p>يمكنك إنشاء تقارير دقيقة وشاملة بشكل تلقائي بعد كل مباراة ، مما يوفر لك الوقت والجهد في كتابة التقارير اليدوية.</p>
                  </div>
                  <div className="save">
                    <label htmlFor="">إحصائيـــــــــــــات وأداء</label>
                    <p>تحصل على إحصائيات حول أدائك كحكم في المباريات السابقة، مما يساعدك على تحسين مستواك واتخاذ قرارات أفضل في المستقبل .</p>
                  </div>
                  <div className="analyse">
                    <label htmlFor=""> إنتــــــاج تقــــــاريــر <span className='me-3'>PDF</span></label>
                    <p>بعد كل مباراة ، توفر لك المنصة إمكانية إنتاج تقارير مفصلة على شكل <span>PDF</span> ، بحيث يمكنك تحميلها أو طباعتها وتقديمها للجهات المسؤولة</p>
                  </div>
                  <div className="but">
                    <label htmlFor="">أهدافنـــــــــــــــــــــــــــــــــــــــــا</label>
                    <p>
                      هدفنا هو تسهيل الأعمال الإدارية للحكام التي تأتي بعد كل مباراة , مع تمكينهم من التركيز على اللعبة واتخاذ قراراتهم بطمأنينة
                    </p>
                  </div>
                </div>         
            </div>
            <div ref={ref2} className='letsgo-section section p-0 m-0'>
              <div className='image'>
                <img className='free' src={"../img/pngwing.png"} alt="" />
                <img src={"../img/Yellow-red_card.png"} alt="" />

              <div dir='rtl' className='letsgo'>
                <h1 className='letsgo-title'>انضم إلينا</h1>
                <Link to={'/dashboard'} className='letsgo-button' >لنبدأ</Link>
              </div>
              </div>
            </div>
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