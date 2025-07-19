import { React, useEffect, useState } from "react";
import { axiosClinet } from "./Api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "./AuthContext";

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
                    if (status === 200) {
                        setLoadingLogin(false)
                        localStorage.setItem('token', data.authorisation.token)
                        localStorage.setItem('AUTHENTICATED', true)
                        navigate('/dashboard/home');
                    }
                }
            ).catch(({ response }) => {
                setErrorBack(response?.data?.message === "These credentials do not match our records." ? "هذه المعلومات لا تتطابق مع سجلاتنا ." : "" || response?.data?.message === "Too many login attempts. Please try again in 12 seconds." ? "هناك عدد كبير جدًا من محاولات تسجيل الدخول. يرجى المحاولة مرة أخرى خلال 12 ثانية." : "")
                setLoadingLogin(false)
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
                                            {errorBack && <div dir="rtl" class="p-3 mb-4 bg-danger text-white text-center rounded">{errorBack}</div>}
                                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                                <p className="pt-2 fs-2 fw-bold">ت الدخول</p>
                                                <Link to="/" className="logo">
                                                    <h3 className="text-primary"><i class="text-primary fa-solid fa-flag-checkered ms-2 me-3"></i> ArbiTre</h3>
                                                </Link>
                                            </div>
                                            <div className="mb-3 form-floating">
                                                <input type="email" name="email" className="form-control" dir="ltr" id="floatingInput" placeholder="name@example.com" onChange={handelCHange} />
                                                <label style={{right: "0"}} for="floatingInput">البريد الالكتروني</label>
                                            </div>
                                            {errors?.email && <p className="text-center text-danger me-3">{errors?.email}</p>}

                                            <div className="mb-4 form-floating d-flex align-items-center justify-content-around">
                                                <div className="form-floating col-10">
                                                    <input type={inputType} name="password" className="form-control" dir="ltr" id="floatingPassword" placeholder="Password" onChange={handelCHange} />
                                                    <label style={{right: "0"}}  for="floatingPassword">الرمز السري</label>
                                                </div>
                                                <i className={`${iconType} me-2`} onClick={togglePassword} ></i>
                                            </div>
                                            
                                            {errors?.password && <p className="text-center text-danger me-3">{errors?.password}</p>}
                                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                                <div className="form-check">
                                                </div>
                                                <a href="/forgot-password">نسيت الرمز السري !</a>
                                            </div>
                                            <button type="submit" className="py-3 mb-4 btn btn-danger w-100 fw-bold">تسجيل الدخول
                                                {loadingLogin ? (
                                                    <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>) : ''}
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