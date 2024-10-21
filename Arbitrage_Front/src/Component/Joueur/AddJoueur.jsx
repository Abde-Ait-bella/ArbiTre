import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";

function AddArbitre() {

    const [addJoueur, setAddJoueur] = useState();
    const [loadingAdd, setLoadingAdd] = useState();
    const { user } = AuthUser();
    const navigate = useNavigate();


    const handleAddJoueur = (event) => {
        const { name, value } = event.target;
        setAddJoueur(prevValues => ({
            ...prevValues,
            [name]: value,
            user_id: parseInt(user?.id),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingAdd(true)
        if (addJoueur) {
            await axiosClinet.post('/joueur', addJoueur).then(
                (response) => {
                    const { data } = response;
                    if (data.status === true) {
                        setLoadingAdd(false)
                        navigate('/dashboard/composants/addedJoueur');
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
            <div className="d-flex justify-content-center my-4">
                <div class="col-md-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4 mx-4 mx-lg-0">
                        <div className="d-flex justify-content-start">
                            <Link to="/dashboard/composants/joueur" class="btn btn-danger px-4 mb-3"> رجـــوع<i class="fa-solid fa-caret-right me-3 pt-1  "></i></Link>
                        </div>
                        <p class="mb-4 fs-2 fw-bold text-white">إضافة لاعب</p>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم الرخصة</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero_licence" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم اللاعب</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button type="submit" class="btn btn-danger px-5 py-2 fw-bold">إضــــافة
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
export default AddArbitre;