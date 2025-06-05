import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Navbar_Res from './Navbar_Res'
import Slider from './Slider'
import Swal from 'sweetalert2'
import "./style/Home.scss"

export default function Home() {
  useEffect(() => {
    // Show development notice when component mounts
    showDevelopmentNotice();
  }, []);

  const showDevelopmentNotice = () => {
    // Check if we've shown this already in this session
    const noticeShown = sessionStorage.getItem('devNoticeShownHomepage');
    if (!noticeShown) {
      Swal.fire({
        title: 'تنبيه!',
        html: `
          <p> أخي الحكم العصبوي المنصة قيد التطوير ونرحب بكل .</p>
           <p> هذه المنصة غير تجارية, بحكم الممارسة فالميدان كانت فقط فكرة تم تحقيقها يعني ماعندها تامعنى ايلا ماستافدتي منها "داكشي علاش أي ملاحضة مهمة بالنسبة لينا وأي حاجة مامفهومة ماتبخلش علينا بيها ".</p>
          <p dir="ltr" style="text-align: center; margin-top: 10px;">
            <span dir="ltr">+212 681783861</span> <strong">  : للتواصل</strong> 
          </p>
        `,
        icon: 'info',
        confirmButtonText: 'فهمت',
        confirmButtonColor: '#fbab00',
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      });
      
      // Mark as shown for this session
      sessionStorage.setItem('devNoticeShownHomepage', 'true');
    }
  };

  return (
    <div className='home' dir='ltr'>
      {
        window.innerWidth > 992 ? <Navbar /> : <Navbar_Res />
      }
      <Slider />
    </div>
  )
}
