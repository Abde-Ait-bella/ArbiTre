import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AddArbitre() {

    const [villes, setVilles] = useState();
    const [addDelegue, setAddDelegue] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const { user } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data.filter((v) => parseInt(v.user_id) === user?.id || v.user_id === null))
                setLoading(false)
            })
    }, [])


    const handleAddDelegue = (event) => {
        const { name, value } = event.target;
        setAddDelegue(prevValues => ({
            ...prevValues,
            [name]: value,
            user_id: parseInt(user?.id)
        }))
    }
    const handleAddDelegueSelect = (event) => {
        const { name, value } = event.target;
        setAddDelegue(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingAdd(true)
        if (addDelegue) {
            await axiosClinet.post('/delegue', addDelegue).then(
                (response) => {
                    const { data } = response;
                    if (data.status === true) {
                        setLoadingAdd(false)
                        navigate('/dashboard/composants/addedDelegue');
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
        <>{
            loading ?
                <>
                <div className="d-flex justify-content-center my-4">
                    <div class="col-sm-12 col-xl-6 text-center d-none d-lg-block">
                        <div class="bg-secondary rounded h-100 p-4">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-start">
                                    <div className="col-md-3">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center justify-content-center mt-4">
                                    <div className="col-md-5">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-2">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-2">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2 d-flex justify-content-center">
                                    <div className="col-4">
                                        <div className="mt-2">
                                            <Skeleton height={35} width={135} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2 d-flex justify-content-center">
                                    <div className="col-4">
                                        <div className="mt-2">
                                            <Skeleton height={35} width={135} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4 d-flex justify-content-center">
                                    <div className="col-4">
                                        <div className="mt-2">
                                            <Skeleton height={40} width={135} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>
                
                <div className="my-4 d-lg-none mx-4">
                    <div class="col-sm-12 col-xl-6 text-center">
                        <div class="bg-secondary rounded h-100 p-4">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-start">
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center justify-content-center mt-4 mb-5">
                                    <div className="col-7">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-2 mb-4">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2 mb-4">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4 d-flex justify-content-center">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} width={135} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>
                </>
                
                :
                <div className="d-flex justify-content-center my-4">
                    <div class="col-sm-12 col-xl-6 text-center">
                        <div class="bg-secondary rounded h-100 p-4" >
                            <div className="d-flex justify-content-start">
                                <Link to="/dashboard/composants/delegue" class="btn btn-danger px-4 mb-3"> رجـــوع<i class="fa-solid fa-caret-right me-3 pt-1"></i></Link>
                            </div>
                            <p class="mb-lg-4 fs-2 fw-bold text-white">إضافة المندوب</p>

                            <form onSubmit={handleSubmit}>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                    <div class="col-sm-10">
                                        <input name="prenom" onChange={handleAddDelegue} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                    <div class="col-sm-10">
                                        <input name="nom" onChange={handleAddDelegue} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <select name="ville_id" onChange={handleAddDelegueSelect} class="form-select mb-3" aria-label="Default select example">
                                    <option selected disabled>المدينة</option>
                                    {villes?.map((v) =>
                                        <option key={v.id} value={v.id}>{v.nom}</option>
                                    )}
                                </select>
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
                </div>}
        </>
    )
}
export default AddArbitre;