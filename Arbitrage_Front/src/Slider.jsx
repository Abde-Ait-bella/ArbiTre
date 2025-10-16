import { useEffect, useRef, useState } from 'react'
import "../src/style/Slider.scss"
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom';
import { motion, useScroll } from "framer-motion"
import dataImage from "../public/img/png/data.png"
import saveImage from "../public/img/jpg/save.jpg"
import analyseImage from "../public/img/jpg/analyse.jpg"
import rapportImage from "../public/img/jpg/rapportpdf.jpg"
import refreeImage from "../public/img/jpg/refree.jpg"

function Slider() {
  const videoRef = useRef(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const textRef = useRef();
  const textRefArab = useRef();
  const refHome = useRef();
  const { scrollYProgress } = useScroll();

  const [ref, inView1] = useInView({ threshold: 0.5 });
  const [ref1, inView2] = useInView({ threshold: 0.5 });
  const [ref2, inView3] = useInView({ threshold: 0.5 });

  useEffect(() => {
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

  }, [inView1, inView2, inView3])


  useEffect(() => {

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

    if (window.innerWidth > 992) {
      const contents = gsap.utils.toArray("#section-parent .section");

      gsap.to(contents, {
        xPercent: -100 * (contents.length - 1),
        scrollTrigger: {
          trigger: refHome.current,
          scrub: 0.2,
          // end: '+=' + refHome.current.offsetWidth,
//           end: '+=' + refHome.current.offsetWidth * (contents.length - 1), 
//           pin : true,
//           // snap : 1 / (refHome.current - 1),
//           // snap: {
//           //   snapTo: 1 / (contents.length - 1), // يعني غادي ينتقل من section لآخر مباشرة
//           //   duration: {min: 0.2, max: 0.5}, // مدة الانتقال، يمكن تعدلها 
//           //   ease: "power1.inOut" // تخلي الحركة سلسة
//           // },
//           // delay: 1, // يمكن تزيد هاد الـ delay باش تعطي فرصة للتوقف في كل عنصر
          end: '+=' + refHome.current.offsetWidth * (contents.length - 1),
          pin: true,
          snap: 1 / (refHome.current - 1),
          delay: 0.1, // يمكن تزيد هاد الـ delay باش تعطي فرصة للتوقف في كل عنصر
          pinSpacer: true,
        }
      });
    }
  }, [])

  // Add new effect to handle video sound based on visibility
  useEffect(() => {
    if (window.innerWidth <= 992) {
      // Create intersection observer for video element
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // When video is visible and more than 50% in view
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              if (videoRef.current) {
                videoRef.current.play();
              }
            } else {
              if (videoRef.current) {
                // Ne pas mettre en sourdine automatiquement
                // videoRef.current.muted = true; // SUPPRIMER CETTE LIGNE
                // Optionnel: mettre en pause quand hors de vue
                // videoRef.current.pause();
              }
            }
          });
        },
        { threshold: [0.5] } // Trigger when 50% of element is visible
      );

      // Start observing video element
      if (videoRef.current) {
        videoObserver.observe(videoRef.current);
      }

      // Cleanup observer on unmount
      return () => {
        if (videoRef.current) {
          videoObserver.unobserve(videoRef.current);
        }
      };
    }
  }, []);

  // Effet pour gérer la lecture automatique de la vidéo
  useEffect(() => {
    if (window.innerWidth <= 992 && videoRef.current) {
      // Gérer le chargement de la vidéo
      const handleVideoLoaded = () => {
        setVideoLoaded(true);
        
        // Tenter la lecture automatique dès que la vidéo est chargée
        const playPromise = videoRef.current.play();
      };
      
      // Ajouter l'événement de chargement
      videoRef.current.addEventListener('loadeddata', handleVideoLoaded);
      
      // Si la vidéo est déjà chargée (mise en cache par le navigateur)
      if (videoRef.current.readyState >= 3) {
        handleVideoLoaded();
      }
      
      return () => {
        videoRef.current?.removeEventListener('loadeddata', handleVideoLoaded);
      };
    }
  }, []);
  
  // Effet pour gérer l'activation du son après interaction utilisateur
  useEffect(() => {
    if (window.innerWidth <= 992) {
      const handleUserInteraction = () => {
        if (videoRef.current && videoRef.current.muted) {  // Vérifier si la vidéo est encore en sourdine
          videoRef.current.muted = false;
          setVideoMuted(false);
          
          // Assurer que la vidéo joue si elle ne l'est pas déjà
          if (videoRef.current.paused) {
            videoRef.current.play().catch(e => console.log("Impossible de lire la vidéo après interaction"));
          }
          
          // Supprimer les écouteurs après activation
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
          document.removeEventListener('scroll', handleUserInteraction);
        }
      };
      
      // Ajouter plusieurs types d'écouteurs pour capter toute interaction
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('scroll', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };
    }
  }, [videoLoaded]);
  
  return (
    <div ref={refHome} className='sections' style={{ minHeight: "100vh" }} >
      <motion.div className='scroll' style={{ scaleX: scrollYProgress }} />
      <div className={`row section-parent ${window.innerWidth > 992 ? 'row' : ''}`} id='section-parent' >
        <div className='p-0 m-0 home-section section'>
          {window.innerWidth <= 992 && (
            <>
              <video 
                ref={videoRef}
                className="bg-video" 
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/videos/triller.mp4" type="video/mp4" />
              </video>
              <div 
                className="unmute-overlay"
                // style={`${videoMuted ? '' : {right: 'calc(50% - 30%)'}}`}
                  style={videoMuted ? {} : { right: 'calc(50% - 28%)' }}
                onClick={() => {
                  if (videoRef.current) {
                    // Toggle muted state
                    const newMutedState = !videoRef.current.muted;
                    videoRef.current.muted = newMutedState;
                    setVideoMuted(newMutedState);
                    
                    // S'assurer que la vidéo se lance si ce n'est pas déjà le cas
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    }
                  }
                }}
              >
                <i className={`fas ${videoMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                <span style={{fontFamily: "Cairo"}}>{videoMuted ? 'ضغط باش تخدم الصوت' : 'ضغط باش تسككت الصوت'}</span>
              </div>
            </>
          )}
          <p ref={textRefArab} style={{ marginTop: "-40px" }} dir='rtl' className='text-white text-arab'>أول منصة خاصة بالحكام بالمغرب</p>
          <p ref={textRef} style={{ marginTop: "-40px", whiteSpace: "nowrap" }} dir='ltr' className='text-white fr'>La première plateforme pour les arbitres au Maroc</p>
          <div className='scroll-down'>
            <p>إ سحب للأسفل</p>
            <p className='mt-5'><i class="fa-arrow-down fa-solid"></i></p>
          </div>
          <div className='blob-home'></div>
        </div>
        <div ref={ref} className='m-0 about-section section'>
          <p dir='rtl' className='title'>من نحن</p>
          <p dir='rtl' className='text-justify text-arab'>
            {inView1 & window.innerWidth > 992 ?
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
              :
              <span className='text-arab'>أهلاً بكم في منصة ArbiTre.ma ، التي تهدف إلى تسهيل العمل الإداري للحكام بعد المباريات . نسعى من خلال هذه المنصة إلى مساعدة الحكام على تنظيم المهام الإدارية المتعلقة بالمباريات بشكل أسرع وأسهل</span>
            }
          </p>
          <div className='blobs-about'>
            <div className="blob_1"></div>
            <div className="blob_2"></div>
          </div>
        </div>
        <div ref={ref1} className='p-0 m-0 section services-section'>
          <div className="cards">
            <div className="data" >
              <label htmlFor="">معلومات جاهزة ومسبقة الإعداد</label>
              <p>واحدة من أقوى ميزات منصة Arbitre هي أنها توفر لك جميع المعلومات اللازمة بشكل جاهز ومسبق الإعداد الحكام , الأندية , الملاعب . وتمكنك من استرجاع إحصائيات أو تقارير حول مباراة معينة</p>
            </div>
            <div className="save">
              <label htmlFor="">تسجيل وإدارة المباريات</label>
              <p>يمكنك إنشاء تقارير دقيقة وشاملة بشكل تلقائي بعد كل مباراة ، مما يوفر لك الوقت والجهد في كتابة التقارير اليدوية.</p>
            </div>
            <div className="analyse">
              <label htmlFor="">إحصائيـــــــــــــات وأداء</label>
              <p>تحصل على إحصائيات حول أدائك كحكم في المباريات السابقة، مما يساعدك على تحسين مستواك واتخاذ قرارات أفضل في المستقبل .</p>
            </div>
            <div className="print">
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
          <div className="cards_res">
            <div className="data" >
              <h3 htmlFor="">معلومات جاهزة ومسبقة الإعداد</h3>
              <div className="img">
                <img src={dataImage} alt="" />
              </div>
              <p>واحدة من أقوى ميزات منصة Arbitre هي أنها توفر لك جميع المعلومات اللازمة بشكل جاهز ومسبق الإعداد الحكام , الأندية , الملاعب . وتمكنك من استرجاع إحصائيات أو تقارير حول مباراة معينة</p>
            </div>
            <div className="save" >
              <h3 htmlFor="">تسجيل وإدارة المباريات</h3>
              <div className="img">
                <img src={saveImage} alt="" />
              </div>
              <p>يمكنك إنشاء تقارير دقيقة وشاملة بشكل تلقائي بعد كل مباراة ، مما يوفر لك الوقت والجهد في كتابة التقارير اليدوية.</p>
            </div>
            <div className="analyse" >
              <h3 htmlFor="">إحصائيـــــــــــــات وأداء</h3>
              <div className="img">
                <img src={analyseImage} alt="" />
              </div>
              <p>تحصل على إحصائيات حول أدائك كحكم في المباريات السابقة، مما يساعدك على تحسين مستواك واتخاذ قرارات أفضل في المستقبل .</p>
            </div>
            <div className="print">
              <h3 htmlFor=""> إنتــــــاج تقــــــاريــر <span className='me-3'>PDF</span></h3>
              <div className="img">
                <img src={rapportImage} alt="" />
              </div>
              <p>بعد كل مباراة ، توفر لك المنصة إمكانية إنتاج تقارير مفصلة على شكل <span>PDF</span> ، بحيث يمكنك تحميلها أو طباعتها وتقديمها للجهات المسؤولة</p>
            </div>
            <div className="but" >
              {window.innerWidth > 992 ?   <h3 htmlFor="">أهدافنـــــــــــــــــــــــــــــــــــــــــا</h3> :   <h3 htmlFor="">أهدافنـــــــــا</h3>}
              <div className="img">
                <img src={refreeImage} alt="" />
              </div>
              <p>
                هدفنا هو تسهيل الأعمال الإدارية للحكام التي تأتي بعد كل مباراة , مع تمكينهم من التركيز على اللعبة واتخاذ قراراتهم بطمأنينة
              </p>
            </div>
          </div>
        </div>
        <div ref={ref2} className='p-0 m-0 letsgo-section section'>
          <div className='image'>
            <img className='free' src={"../img/png/pngwing.png"} alt="" />
            <img src={"../img/png/Yellow-red_card.png"} alt="" />

            <div dir='rtl' className='letsgo'>
              <h1 className='letsgo-title'>انضم إلينا</h1>
              <Link to={'/dashboard/home'} className='letsgo-button' >لنبدأ</Link>
            </div>
          </div>
        </div>
        <div className='info-contact' dir='rtl'>
        <div>
            <label htmlFor="">الهاتف</label>
            <p dir='ltr'>+212 681783861</p>
          </div>
          <div>
            <label htmlFor="">البريد الاكتروني</label>
            <p>contact@arbitre.ma</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Slider