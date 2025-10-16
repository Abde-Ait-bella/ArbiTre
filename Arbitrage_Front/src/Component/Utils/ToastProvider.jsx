import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuration de base pour les toast notifications
const toastConfig = {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

// Fonctions pour afficher différents types de notifications
export const showSuccessToast = (message) => toast.success(message, toastConfig);
export const showErrorToast = (message) => toast.error(message, toastConfig);
export const showInfoToast = (message) => toast.info(message, toastConfig);
export const showWarningToast = (message) => toast.warning(message, toastConfig);

// Fonction pour afficher une notification avec contenu HTML
export const showHtmlToast = (content, type = "info") => {
  const options = {
    ...toastConfig,
    dangerouslySetInnerHTML: { __html: content }
  };
  
  switch (type) {
    case "success":
      return toast.success("", options);
    case "error":
      return toast.error("", options);
    case "warning":
      return toast.warning("", options);
    case "info":
    default:
      return toast.info("", options);
  }
};

// Fonction spécifique pour afficher une notification d'accès refusé avec lien WhatsApp
export const showAccessDeniedToast = (status = 'pending') => {
  // Le numéro de téléphone de l'administrateur
  const adminWhatsAppNumber = "+212681783861";
  
  // Message préformaté pour WhatsApp
  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أنا مستخدم في تطبيق ArbiTre. حساب المستخدم الخاص بي ${status === 'pending' ? 'في انتظار التفعيل' : 'مرفوض'} وأحتاج إلى المساعدة. أنا حكم وأريد استخدام المنصة.`
  );
  
  // Lien WhatsApp
  const whatsappLink = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;
  
  // Contenu HTML de la notification
  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; text-align: right;">
      <h4 style="margin: 0 0 10px; font-size: 16px; color: #fff;">
        ${status === 'pending' ? 'حسابك قيد الانتظار' : 'تم رفض حسابك'}
      </h4>
      <p style="margin: 0 0 10px; font-size: 14px;">
        ${status === 'pending' 
          ? 'حسابك لا يزال قيد المراجعة من قبل المشرف. تمت هذه الخطوة للتأكد من أنك حكم فعلاً.' 
          : 'لقد تم رفض طلب حسابك. تمت هذه الخطوة للتأكد من أنك حكم فعلاً. يرجى التواصل مع المشرف.'
        }
      </p>
      <a href="${whatsappLink}" target="_blank" style="display: flex; align-items: center; justify-content: center; background-color: #25d366; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none; margin-top: 8px;">
        <i class="fa-brands fa-whatsapp" style="margin-left: 8px; font-size: 16px;"></i>
        تواصل مع المشرف
      </a>
    </div>
  `;
  
  // Afficher la notification avec le contenu HTML
  return showHtmlToast(htmlContent, "error");
};

// Composant de conteneur Toast
export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default ToastProvider;
