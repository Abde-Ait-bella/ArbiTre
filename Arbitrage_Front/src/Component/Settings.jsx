import React, { useState } from "react";
import { axiosClinet } from "../Api/axios";
import { AuthUser } from "../AuthContext";


const Settings = () => {

    const [password, setPassword] = useState({
        old_password: null,
        new_password: null
    });

    const { user } = AuthUser();
    const [name, setName] = useState();


    const [valide, setIsValide] = useState(false);
    const [valideName, setIsValideName] = useState(false);
    const [errors, setErrors] = useState();
    const [response, setResponse] = useState();
    const [errorsBack, setErrorsBack] = useState();
    const [visible, setVisible] = useState();
    const [loading, setLoading] = useState(false);

    const handelCHangePassword = (e) => {
        const newObject = { ...password, [e.target.name]: e.target.value };
        setPassword(newObject);
        Validation(newObject)
    }

    const handelCHangeName = (e) => {
        const nameChange =  { [e.target.name]: e.target.value };
        setName(nameChange);
        Validation(nameChange)
    }


    const Validation = (data) => {
        const errors = {}
        let formIsValid = true
        let formIsValidName = true

        const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9\S]{8,}$/;
        const name_pattern = /^(?!\d+$).*/;
            if (password.old_password !== null) {     
                if (data?.old_password === "") {
                    errors.old_password = "ادخل الرمز السري";
                    formIsValid = false
                }
                else if (!password_pattern.test(data?.old_password)) {
                    errors.old_password = `الرمز السري غير صالح "يجب أن يتكون على أرقام وحروف"`;
                    formIsValid = false
                }
            }
        
            if (password.old_password !== null) {     
                if (data?.new_password === "") {
                    errors.new_password = "ادخل الرمز السري";
                    formIsValid = false
                }
                else if (!password_pattern.test(data?.new_password)) {
                    errors.new_password = `الرمز السري غير صالح "يجب أن يتكون على أرقام وحروف"`;
                    formIsValid = false
                }
            }
   
        if (data?.name == "") {
            errors.name = "ادخل الاسم";
            formIsValidName = false
        } else if (!name_pattern.test(data?.name)) {
            errors.name = "الاسم غير صحيح";
            formIsValidName = false
        }
        
     
        setIsValide(formIsValid)
        setIsValideName(formIsValidName)
        setErrors(errors)
        return errors;
    }

    const resetPassword = () => {
        setPassword({
            old_password: null,
            new_password: null
        })

    }

    const resetName = () => {
        setName(null)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const erreursBack = {};
        const responses = {};
        if (password.old_password !== null && password.new_password !== null) {     
            setErrors(Validation(password))
            {
                if (valide) {
                    setLoading(true)
                    await axiosClinet.post('/change_password', password).then(
                        (response) => {
                            setLoading(false);
                            erreursBack.password = '';
                            responses.password = response?.data?.message;
                            setErrorsBack(erreursBack)
                            setResponse(responses)
                        }).catch(({ response }) => {
                            setLoading(false);
                            responses.password = '';
                            erreursBack.password = response?.data?.message;
                            setErrorsBack(erreursBack)
                            setResponse(responses)
                        })
                }
            }
        }else if(name) {     
            setErrors(Validation(name))
            {
                if (valideName) {
                    setLoading(true)
                    await axiosClinet.post('change_name', name).then(
                        (response) => {
                            setLoading(false);
                            erreursBack.name = '';
                            responses.name = response?.data?.message;
                            setErrorsBack(erreursBack)
                            setResponse(responses)
                        }).catch(({ response }) => {
                            responses.name = '';
                            setLoading(false);
                            erreursBack.name = 'لم يتم تغيير الإسم حذث خطأ ما' ;
                            setErrorsBack(erreursBack)
                            setResponse(responses)
                        })
                }
            }
        }
    }


    const togglePassword = () => {
        setVisible((visible) => !visible)
    }
    const inputType = visible ? "text" : "password"
    const iconType = visible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"

  return (
    <div className='mx-4 mt-4 bg-secondary rounded p-4'>     
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active btn-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#name" type="button"
                role="tab" aria-controls="home" aria-selected="true" onClick={resetPassword}>تغيير الإسم</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link btn-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#password" type="button"
                role="tab" aria-controls="profile" aria-selected="false" onClick={resetName}>تغيير الرمز السري</button>
            </li>
        </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="name" role="tabpanel" aria-labelledby="pills-name-tab">
                <div className="d-flex justify-content-center my-4">
                        <div class="col-md-6 text-center">
                            <div class="bg-secondary rounded h-100 p-4 pt-5">
                            {response?.name && <div class="p-3 mb-4 bg-success text-white text-center rounded">{response?.name}</div>}
                            {errorsBack?.name && <div class="p-3 mb-4 bg-danger text-white text-center rounded">{errorsBack?.name}</div>}
                                <p class="mb-4 fs-2 fw-bold text-white">تغيير الإسم</p>
                                <form onSubmit={handleSubmit}>
                                    <div class="row mb-4 mt-lg-5 mt-4 d-flex align-items-center justify-content-between">
                                        <div class=" col-lg-11 col-12">
                                            <input type="text" value={name ? name?.name : user?.name} name="name" class="form-control" id="inputEmail3" onChange={handelCHangeName} placeholder="الإسم" />
                                        </div>
                                    </div>
                                    {errors?.name   && <p className="text-danger text-center mb-0">{errors?.name}</p>}
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
                </div>

                <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="pills-password-tab">
                    <div className="d-flex justify-content-center my-4">
                        <div class="col-md-6 text-center">
                            <div class="bg-secondary rounded h-100 p-4 pt-5">
                                {response?.password && <div class="p-3 mb-4 bg-success text-white text-center rounded">{response?.password}</div>}
                                {errorsBack?.password && <div class="p-3 mb-4 bg-danger text-white text-center rounded">{errorsBack?.password}</div>}
                                <p class="mb-4 fs-2 fw-bold text-white">تغيير الرمز السري</p>
                                <form onSubmit={handleSubmit}>
                                    <div class="row mb-4 mt-lg-5 mt-4 d-flex align-items-center justify-content-between">
                                        <div class=" col-lg-11 col-10">
                                            <input type={inputType} dir="ltr" name="old_password" onChange={handelCHangePassword} class="form-control" id="inputEmail3" placeholder="الرمز السري الحالي" />
                                        </div>
                                        <div className="col-lg-1 pe-lg-0 col-2">
                                            <i className={`${iconType}`} onClick={togglePassword} ></i>
                                        </div>
                                    </div>
                                    {errors?.old_password && <p className="text-danger me-3 text-center">{errors?.old_password}</p>}
                                    <div class="row mb-3 d-flex justify-content-center">
                                        <div class="col-md-12">
                                            <input type={inputType} dir="ltr" name="new_password" onChange={handelCHangePassword} class="form-control" id="inputEmail3" placeholder="الرمز  السري الجديد" />
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
                </div>
            </div>
    </div>
  )
}

export default Settings