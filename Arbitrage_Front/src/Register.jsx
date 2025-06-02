import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { axiosClinet } from "./Api/axios";
import { AuthUser } from "./AuthContext";

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isValide, setIsValide] = useState(false);
    const [visible, setVisible] = useState();
    const [errors, setErrors] = useState();
    const [errorBack, setErrorBack] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const { userDataLogin } = AuthUser();

    const handelCHange = (e) => {
        const newObject = { ...values, [e.target.name]: e.target.value };
        setValues(newObject);
        Validation(values);
    }

    const Validation = (values) => {

        const errors = {}
        let formIsValid = true
        const name_pattern = /^(?!\d+$).*/;
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9\S]{8,}$/;

        if (values?.name == "") {
            errors.name = "ادخل الاسم";
            formIsValid = false
        } else if (!name_pattern.test(values?.name)) {
            errors.name = "الاسم غير صحيح";
            formIsValid = false
        }

        if (values?.email == '') {
            errors.email = "ادخل البريد الالكتروني";
            formIsValid = false
        }
        else if (!email_pattern.test(values?.email)) {
            errors.email = "البريد الالكتروني غير صحيح";
            formIsValid = false
        }

        if (values?.password == "") {
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

    const togglePassword = () => {
        setVisible((visible) => !visible)
    }
    const inputType = visible ? "text" : "password"
    const iconType = visible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorBack("")
        if (isValide) {
            setLoading(true)
            await axiosClinet.post('/register', values).then(
                (response) => {
                    setLoading(false);
                    
                    const {status, data} = response;
                    
                    if (status === 200) {
                        // Stocker les données utilisateur
                        localStorage.setItem('token', data.authorisation.token);
                        localStorage.setItem('AUTHENTICATED', true);
                        
                        // Utiliser la méthode existante pour connecter l'utilisateur
                        userDataLogin(data.user);
                        
                        // Rediriger vers le tableau de bord
                        navigate('/dashboard/home');
                    }
                }
            ).catch(({ response }) => {
                setLoading(false);
                setErrorBack(response?.data?.message === "The email has already been taken." ? "البريد الالكتروني تم استعماله من قبل" : response?.data?.message)
            })
        }
    }

    return (
        <>
            <div class="container-fluid position-relative d-flex p-0">
                <div className="container-fluid">
                    <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className="col-md-5">
                            <div className="bg-secondary rounded px-5 py-4 my-4 mx-3">
                                {errorBack && <div dir="rtl" class="p-3 mb-4 bg-danger text-white text-center rounded">{errorBack}</div>}
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <p className="fs-3 pt-2 fw-bold">إنشاء حساب</p>
                                        <Link to="/" className="">
                                            <h3 className="text-primary"><i class="text-primary fa-solid fa-flag-checkered ms-2 me-3"></i> ArbiTre</h3>
                                        </Link>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingText" placeholder="jhondoe" name="name" onChange={handelCHange} />
                                    <label style={{right: "0"}} for="floatingText">الاسم الشخصي</label>
                                </div>
                                {errors?.name && <p className="text-danger me-3">{errors?.name}</p>}
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handelCHange} />
                                    <label style={{right: "0"}} for="floatingInput">البريد الالكتروني</label>
                                </div>
                                {errors?.email && <p className="text-danger me-3">{errors?.email}</p>}
                                <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-floating col-11">
                                        <input type={inputType} name="password" className="form-control" id="floatingPassword" placeholder="password" onChange={handelCHange} />
                                        <label style={{right: "0"}} for="floatingPassword">الرمز السري</label>
                                    </div>
                                    <i className={`${iconType} me-2`} onClick={togglePassword} ></i>
                                </div>
                                {errors?.password && <p className="text-danger me-3">{errors?.password}</p>}
                                <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-floating col-12">
                                        <input type={inputType} name="password_confirmation" className="form-control" id="floatingPassword" placeholder="password" onChange={handelCHange} />
                                        <label style={{right: "0"}} for="floatingPassword">تأكيد الرمز السري </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger py-3 w-100 mb-4 fw-bold" onClick={handleSubmit}>إرســـــــــال
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>) : ''}
                                </button>
                                <p className="text-center fw-bold mb-0"><a href="/login">العودة الى صفحة تسجيل الدخول</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Sign Up End --> */}
            </div>
        </>
    )
}

export default Register;