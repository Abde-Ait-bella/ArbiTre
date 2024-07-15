import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";

function AddVille() {


    const [addVille, setAddVille] = useState();
    const [loadingAdd, setLoadingAdd] = useState(false);
    const navigate = useNavigate();
    const { user } = AuthUser();


    const handleAddVille = (event) => {
        const { name, value } = event.target;
        setAddVille(prevValues => ({
            ...prevValues,
            [name]: value,
            user_id: parseInt(user?.id),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingAdd(true)
        if (addVille) {
            await axiosClinet.post('/ville', addVille).then(
                (response) => {
                    const { data } = response;
                    if (data.status === true) {
                        setLoadingAdd(false)
                        navigate('/composants/addedVille');
                    }
                }
            ).catch(
                (error) => {
                    setLoadingAdd(false)
                    console.error('Error:', error)
                }
            )
        } else {
            setLoadingAdd(false)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center my-4 mx-4">
                <div class="col-12 col-lg-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4 col-md-12">
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/villes" class="btn btn-warning px-4 mb-3"> رجـــوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <p class="mb-lg-4 fs-2 fw-bold text-white">إضافة مدينة - جماعة</p>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <input placeholder="المدينة - الجماعة" name="nom" onChange={handleAddVille} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className="mt-5">
                                <button type="submit" class="btn btn-danger pe-5 ps-5">إضــــافة
                                    {
                                        loadingAdd ? (
                                            <div className="spinner-border spinner-border-sm fs-2 me-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>)
                                            : ""
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddVille;