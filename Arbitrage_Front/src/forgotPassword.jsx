import { React, useEffect, useState } from "react";
import { axiosClinet } from "./Api/axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ForgotPassword() {

    const [values, setValues] = useState({
        email: ''
    });
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState();
    const [responce, setResponce] = useState();

    useEffect(() => {
        if (window.localStorage.getItem('AUTHENTICATED')) {
            navigate('/dashboard/home')
        }
        setEmail(searchParams.get('email'))
    }, [])

    const [errors, setErrors] = useState();
    const [errorBack, setErrorBack] = useState('');
    const [isValide, setIsValide] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelCHange = (e) => {
        const newObject = { ...values, [e.target.name]: e.target.value };
        setValues(newObject);
        Validation(values);
    }

    const Validation = (values) => {
        const errors = {}
        let formIsValid = true

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

        if (values?.email === "") {
            errors.email = "ادخل البريد الالكتروني";
            formIsValid = false
        }
        else if (!email_pattern.test(values?.email)) {
            errors.email = "البريد الالكتروني غير صحيح";
            formIsValid = false
        }

        setIsValide(formIsValid)
        setErrors(errors)
        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        setErrorBack('')
        setResponce('')

        if (isValide) {
            setLoading(true)
            await axiosClinet.post('/sendPasswordResetLink', values).then(
                (response) => {
                    setLoading(false);
                    setResponce(response.data.data)
                }
            ).catch(({ response }) => {
                setErrorBack(response?.data?.error)
                setLoading(false)
            })
        }
    }

    return (
        <>
            <div>

                {/* <!-- Sign In Start --> */}
                <form action="" onSubmit={handleSubmit}>
                    <div className="container-fluid">
                        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                            <div className="col-md-5">
                                <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                                    {responce && <div class="p-3 mb-4 bg-success text-white text-center rounded">{responce}</div>}
                                    {errorBack && <div dir="ltr" class="p-3 mb-4 bg-danger text-white text-center rounded">{errorBack}</div>}
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <a href="/" className="">
                                            <h3 className="text-primary"><i class="text-primary fa-solid fa-flag-checkered ms-2 "></i> ArbiTre</h3>
                                        </a>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handelCHange} />
                                        <label for="floatingInput">البريد الالكتروني</label>
                                    </div>
                                    {errors?.email && <p className="text-danger me-3">{errors?.email}</p>}
                                    <button type="submit" className="btn btn-danger py-3 w-100 mb-4 fw-bold" onClick={handleSubmit}>إرســـــــــال
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>) : ''}
                                    </button>
                                    <p className="text-center mb-0 fw-bold" >العودة الى صفحة <a href="/login">تسجيل الدخول</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <!-- Sign In End --> */}
            </div>
        </>
    )
}
export default ForgotPassword;