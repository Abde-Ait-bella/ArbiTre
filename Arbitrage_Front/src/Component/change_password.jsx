import React, { useState } from "react";
import { axiosClinet } from "../Api/axios";

export function Change_password() {

    const [password, setPassword] = useState({
        old_password: "",
        new_password: ""
    });
    const [valide, setIsValide] = useState(false);
    const [errors, setErrors] = useState();
    const [response, setResponse] = useState();
    const [errorBack, setErrorBack] = useState();
    const [visible, setVisible] = useState();
    const [loading, setLoading] = useState(false);

    const handelCHange = (e) => {
        const newObject = { ...password, [e.target.name]: e.target.value };
        setPassword(newObject);
        Validation(newObject)
    }

    const Validation = (password) => {
        const errors = {}
        let formIsValid = true

        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9\S]{8,}$/;

        if (password?.old_password === "") {
            errors.old_password = "ادخل الرمز السري";
            formIsValid = false
        }
        else if (!password_pattern.test(password?.old_password)) {
            errors.old_password = `الرمز السري غير صالح "يجب أن يتكون على أرقام وحروف"`;
            formIsValid = false
        }

        if (password?.new_password === "") {
            errors.new_password = "ادخل الرمز السري";
            formIsValid = false
        }
        else if (!password_pattern.test(password?.new_password)) {
            errors.new_password = `الرمز السري غير صالح "يجب أن يتكون على أرقام وحروف"`;
            formIsValid = false
        }

        setIsValide(formIsValid)
        setErrors(errors)
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(Validation(password))
        {
            if (valide) {
                setLoading(true)
                await axiosClinet.post('/change_password', password).then(
                    (response) => {
                        setLoading(false);
                        setErrorBack('')
                        setResponse(response?.data?.message)

                    }).catch(({ response }) => {
                        setLoading(false);
                        setResponse('')
                        setErrorBack(response?.data?.message)
                    })
            }
        }
    }

    const togglePassword = () => {
        setVisible((visible) => !visible)
    }
    const inputType = visible ? "text" : "password"
    const iconType = visible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"


    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-md-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4 pt-5">
                        {response && <div class="p-3 mb-4 bg-success text-white text-center rounded">{response}</div>}
                        {errorBack && <div class="p-3 mb-4 bg-danger text-white text-center rounded">{errorBack}</div>}
                        <p class="mb-4 fs-2 fw-bold text-white">تغيير الرمز السري</p>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-4 mt-lg-5 mt-4 d-flex align-items-center justify-content-between">
                                <div class=" col-lg-11 col-10">
                                    <input type={inputType} dir="ltr" name="old_password" onChange={handelCHange} class="form-control" id="inputEmail3" placeholder="الرمز السري الحالي" />
                                </div>
                                <div className="col-lg-1 pe-lg-0 col-2">
                                    <i className={`${iconType}`} onClick={togglePassword} ></i>
                                </div>
                            </div>
                            {errors?.old_password && <p className="text-danger me-3 text-center">{errors?.old_password}</p>}
                            <div class="row mb-3 d-flex justify-content-center">
                                <div class="col-md-12">
                                    <input type={inputType} dir="ltr" name="new_password" onChange={handelCHange} class="form-control" id="inputEmail3" placeholder="الرمز  السري الجديد" />
                                </div>
                            </div>
                            {errors?.new_password && <p className="text-danger me-3 text-center">{errors?.new_password}</p>}
                            <div className="mt-5">
                                <button type="submit" class="btn btn-danger pe-5 ps-5">تعديــل
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>) : ''}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}