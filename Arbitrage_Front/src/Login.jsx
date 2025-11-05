import { useEffect, useState } from "react";
import { axiosClinet } from "./Api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "./AuthContext";
import Logo from "./Component/Utils/Logo";
import { showSuccessToast, showAccessDeniedToast } from "./Component/Utils/ToastProvider";

// Styles CSS pour les champs en erreur
const loginStyles = {
  formError: {
    border: "1px solid #dc3545",
    boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginTop: "-0.5rem",
    marginBottom: "1rem"
  },
  errorIcon: {
    marginRight: "0.5rem"
  },
  errorAlert: {
    animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
    backgroundColor: "#dc3545",
    border: "none"
  }
};

// Animation CSS pour l'effet de tremblement
const shakeAnimation = `
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
`;

// Ajouter l'animation à la page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = shakeAnimation;
document.head.appendChild(styleSheet);

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState();
    const [errorBack, setErrorBack] = useState('');
    const [isValide, setIsValide] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const { userDataLogin } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem('AUTHENTICATED')) {
            navigate('/dashboard/home')
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])



    const handelCHange = (e) => {
        const newObject = { ...values, [e.target.name]: e.target.value };
        setValues(newObject);
        Validation(values);
    }

    const Validation = (values) => {
        const errors = {}
        let formIsValid = true

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9\S]{8,}$/;

        if (values?.email === "") {
            errors.email = "ادخل البريد الالكتروني";
            formIsValid = false
        }
        else if (!email_pattern.test(values?.email)) {
            errors.email = "البريد الالكتروني غير صحيح";
            formIsValid = false
        }

        if (values?.password === "") {
            errors.password = "ادخل الرمز السري";
            formIsValid = false
        }
        else if (!password_pattern.test(values?.password)) {
            errors.password = `الرمز السري غير صالح "يجب أن يتكون على أرقام وحروف"`;
            formIsValid = false
        }

        setIsValide(formIsValid)
        setErrors(errors)
        return errors;
    }

    // show password
    const togglePassword = () => {
        setVisible((visible) => !visible)
    }
    const inputType = visible ? "text" : "password"
    const iconType = visible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        setErrorBack(false)

        if (isValide) {
            setLoadingLogin(true);
            await axiosClinet.post('/login', values).then(
                (response) => {
                    const { status, data } = response;
                    userDataLogin(data.user)
                    console.log("status:", status);
                    
                    if (status === 200) {
                        setLoadingLogin(false)
                        localStorage.setItem('token', data.authorisation.token)
                        localStorage.setItem('AUTHENTICATED', true)
                        
                        // Vérification du statut de l'utilisateur
                        if (data.user.status === 'accepted') {
                            showSuccessToast("تم تسجيل الدخول بنجاح! مرحبا بك.");
                            navigate('/dashboard/home');
                        } else if (data.user.status === 'pending') {
                            showAccessDeniedToast('pending');
                            navigate('/dashboard/home');
                        } else if (data.user.status === 'rejected') {
                            showAccessDeniedToast('rejected');
                            navigate('/dashboard/home');
                        } else {
                            navigate('/dashboard/home');
                        }
                    }
                }
            ).catch((error) => {
                const response = error.response;
                // Gestion des erreurs d'authentification
                if (response?.data?.message === "These credentials do not match our records.") {
                    setErrorBack("هذه المعلومات لا تتطابق مع سجلاتنا .");
                    // showErrorToast("الاسم أو كلمة المرور غير صحيحة، يرجى التحقق والمحاولة مرة أخرى.");
                } else if (response?.data?.message === "Too many login attempts. Please try again in 12 seconds.") {
                    setErrorBack("هناك عدد كبير جدًا من محاولات تسجيل الدخول. يرجى المحاولة مرة أخرى خلال 12 ثانية.");
                    // showErrorToast("عدد كبير من محاولات تسجيل الدخول. يرجى الانتظار قليلاً قبل المحاولة مرة أخرى.");
                } else if (response?.status === 403 && response?.data?.user_status) {
                    // Gestion des erreurs de statut utilisateur
                    showAccessDeniedToast(response.data.user_status);
                    // Stocker le statut pour l'affichage sur la page d'accueil
                    localStorage.setItem('ACCESS_DENIED_STATUS', response.data.user_status);
                    navigate('/');
                } else if (response?.status === 401) {
                    // Erreur d'authentification
                    setErrorBack("جلسة العمل منتهية أو غير صالحة.");
                    // showErrorToast("جلسة العمل منتهية، يرجى تسجيل الدخول مرة أخرى.");
                } else if (response?.status === 422) {
                    // Erreur de validation
                    const validationErrors = response.data.errors;
                    let errorMessage = "يرجى تصحيح الأخطاء التالية:";
                    
                    for (const field in validationErrors) {
                        errorMessage += `\n- ${validationErrors[field][0]}`;
                    }
                    
                    setErrorBack(errorMessage);
                    // showErrorToast("هناك أخطاء في البيانات المدخلة.");
                } else if (response?.status === 500) {
                    // Erreur serveur
                    setErrorBack("حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.");
                    // showErrorToast("خطأ في الخادم. يرجى المحاولة لاحقاً أو الاتصال بالدعم الفني.");
                } else if (error.message === "Network Error") {
                    // Erreur de connexion réseau
                    setErrorBack("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك.");
                    // showErrorToast("لا يمكن الاتصال بالخادم. تحقق من اتصال الإنترنت.");
                } else {
                    // Autres erreurs
                    setErrorBack("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
                    // showErrorToast("حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.");
                    
                    // Journalisation de l'erreur pour le débogage
                    console.error("Erreur de connexion:", error);
                }
                setLoadingLogin(false);
            })
        }
    }

    return (
        <>
            {
                loading ?
                    < div id="spinner" class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                        <div class="spinner-border border-none text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="container-fluid">
                                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                                    <div className="col-md-5">
                                        <div className="p-4 mx-3 rounded bg-secondary p-sm-5">
                                            {errorBack && (
                                                <div 
                                                    dir="rtl" 
                                                    className="p-3 mb-4 text-white rounded bg-danger" 
                                                    style={loginStyles.errorAlert}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-exclamation-triangle ms-2"></i>
                                                        <div className="text-right">{errorBack}</div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mb-5 d-flex align-items-center justify-content-between">
                                                <span className="pt-2 fs-2 fw-bold">ت الدخول</span>
                                                <Link to="/" className="logo">
                                                    <Logo variant="red" size="medium" className="text-primary" />
                                                </Link>
                                            </div>
                                            <div className={`mb-3 form-floating ${errors?.email ? 'has-error' : ''}`}>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    className={`form-control ${errors?.email ? 'is-invalid' : ''}`} 
                                                    dir="ltr" 
                                                    id="floatingInput" 
                                                    placeholder="name@example.com" 
                                                    onChange={handelCHange} 
                                                />
                                                <label style={{right: "0"}} htmlFor="floatingInput">البريد الالكتروني</label>
                                            </div>
                                            {errors?.email && (
                                                <p className="text-center text-danger me-3 d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-exclamation-circle me-1"></i>
                                                    {errors?.email}
                                                </p>
                                            )}

                                            <div className="mb-4 form-floating d-flex align-items-center justify-content-around">
                                                <div className={`form-floating col-10 ${errors?.password ? 'has-error' : ''}`}>
                                                    <input 
                                                        type={inputType} 
                                                        name="password" 
                                                        className={`form-control ${errors?.password ? 'is-invalid' : ''}`} 
                                                        dir="ltr" 
                                                        id="floatingPassword" 
                                                        placeholder="Password" 
                                                        onChange={handelCHange} 
                                                    />
                                                    <label style={{right: "0"}} htmlFor="floatingPassword">الرمز السري</label>
                                                </div>
                                                <i className={`${iconType} me-2`} onClick={togglePassword} ></i>
                                            </div>
                                            
                                            {errors?.password && (
                                                <p className="text-center text-danger me-3 d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-exclamation-circle me-1"></i>
                                                    {errors?.password}
                                                </p>
                                            )}
                                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                                <div className="form-check">
                                                </div>
                                                <a href="/forgot-password">نسيت الرمز السري !</a>
                                            </div>
                                            <button 
                                                type="submit" 
                                                className="py-3 mb-4 btn btn-danger w-100 fw-bold" 
                                                disabled={loadingLogin}
                                            >
                                                {!loadingLogin ? 'تسجيل الدخول' : 'جاري التحميل...'}
                                                {loadingLogin && (
                                                    <div className="spinner-border spinner-border-sm me-3" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                )}
                                            </button>
                                            <p className="pb-1 mb-0 text-center fw-bold">ليس لديك حساب ؟ <a href="/register">إنشاء الحساب</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <!-- Sign In End --> */}
                    </div>}
        </>
    )
}
export default Login;