import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AccessDeniedMessage = ({ status = 'pending', onClose }) => {
  const navigate = useNavigate();
  
  // Le numéro de téléphone de l'administrateur
  const adminWhatsAppNumber = "+212681783861";
  
  // Message préformaté pour WhatsApp
  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أنا مستخدم في موقع ArbiTre. حساب المستخدم الخاص بي ${status === 'pending' ? 'في انتظار التفعيل' : 'مرفوض'} وأحتاج إلى المساعدة. أنا حكم وأريد استخدام المنصة.`
  );
  
  // Lien WhatsApp
  const whatsappLink = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;

  React.useEffect(() => {
    showAccessDeniedModal();
  }, []);

  const showAccessDeniedModal = () => {
    Swal.fire({
      title: status === 'pending' ? 'حسابك قيد الانتظار' : 'تم رفض حسابك',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; text-align: right;">
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
            ${status === 'pending' 
              ? 'حسابك لا يزال قيد المراجعة من قبل المشرف. تمت هذه الخطوة للتأكد من أنك حكم فعلاً. يرجى التواصل مع المشرف للحصول على المساعدة أو لتسريع عملية التفعيل.' 
              : 'لقد تم رفض طلب حسابك. تمت هذه الخطوة للتأكد من أنك حكم فعلاً. يرجى التواصل مع المشرف لمعرفة السبب وكيفية حل المشكلة.'
            }
          </p>
          <p style="margin: 0 0 20px; font-size: 15px;">
            يمكنك التواصل مع المشرف مباشرة عبر واتساب بالضغط على الزر أدناه.
          </p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-brands fa-whatsapp" style="margin-left: 8px;"></i> تواصل مع المشرف',
      cancelButtonText: 'العودة للصفحة الرئيسية',
      confirmButtonColor: '#25d366',
      cancelButtonColor: '#3085d6',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Ouvrir WhatsApp
        window.open(whatsappLink, '_blank');
      } else {
        // Retour à la page d'accueil ou appeler la fonction onClose
        if (onClose) onClose();
      }
    });
  };

  return null; // Ce composant n'affiche rien directement dans le DOM
};

export default AccessDeniedMessage;
