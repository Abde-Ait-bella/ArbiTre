import React, { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { axiosClinet } from "./Api/axios";

function ResetPassword() {

    const [values, setValues] = useState({
        password: ''
    });
    const [isValide, setIsValide] = useState(false);
    const [visible, setVisible] = useState();
    const [errors, setErrors] = useState();
    const [errorBack, setErrorBack] = useState();
    const [loading, setLoading] = useState();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState();
    const { token } = useParams();
    const { email } = useParams();

    useEffect(() => {
    }, [email, token])


    const handelCHange = (e) => {
        const newObject = { ...values, [e.target.name]: e.target.value };
        setValues(newObject);
        Validation(values);
    }

    const Validation = (values) => {

        const errors = {}
        let formIsValid = true

        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9\S]{8,}$/;

        if (values?.password == "") {
            errors.password = "ادخل الرمز السري";
            formIsValid = false
        }
        else if (!password_pattern.test(values?.password)) {
            errors.password = "الرمز السري يجب ان يتكون على ارقام وحروف";
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
        setStatus('')
        setErrorBack('')

        if (isValide) {
            setLoading(true)
            await axiosClinet.post('/resetPassword', { ...values, email, 'resetToken': token }).then(
                (response) => {
                    setLoading(false)
                    setStatus(response?.data.data)
                }
            ).catch(({ response }) => {
                setLoading(false);
                setErrorBack(response?.data.message === "The password field confirmation does not match." ? " . تأكيد حقل كلمة المرور غير متطابق" : response?.data.error)
            })

        }
    }


    return (
        <>
            <div className="container-fluid position-relative d-flex p-0">
                {/* <!-- Sign Up Start --> */}
                <div className="container-fluid">
                    <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                                {status && <div class="p-3 mb-4 bg-success text-white text-center rounded">{status}
                                    <p className="mb-0"> الان قم <a className="text-warning" href="/login">بتسجيل الدخول</a></p>
                                </div>}
                                {errorBack && <div dir="ltr" class="p-3 mb-4 bg-danger text-white text-center rounded">{errorBack}</div>}
                                <div className="d-flex align-items-center justify-content-center mb-lg-4">
                                    <a href="/" className="">
                                        <h3 className="text-primary"><i class="text-primary fa-solid fa-flag-checkered ms-2"></i> ArbiTre</h3>
                                    </a>
                                    {/* <h3>Reset PW</h3> */}
                                </div>
                                <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-floating col-11">
                                        <input type={inputType} name="password" className="form-control" dir="ltr" id="floatingPassword1" placeholder="password" onChange={handelCHange} />
                                        <label for="floatingPassword1">الرمز السري</label>
                                    </div>
                                    <i className={`${iconType} me-2`} onClick={togglePassword} ></i>
                                </div>
                                {errors?.password && <p className="text-danger me-3">{errors?.password}</p>}
                                <div className="form-floating d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-floating col-12">
                                        <input type={inputType} name="password_confirmation" className="form-control" dir="ltr" id="floatingPassword2" placeholder="password" onChange={handelCHange} />
                                        <label for="floatingPassword2">تأكيد الرمز السري </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger py-3 w-100 mb-4 fw-bold" onClick={handleSubmit}>إرســـــــــال
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>) : ''}
                                </button>
                                <p className="text-center mb-0 fw-bold"><a href="/login">تسجيل الدخول</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Sign Up End --> */}
            </div>
        </>
    )
}

export default ResetPassword;