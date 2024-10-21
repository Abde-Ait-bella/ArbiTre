import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UpdateStade() {

    const [delegues, setDelegue] = useState();
    const [villes, setVilles] = useState();
    const [updateDelegue, setUpdateDelegue] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const navigate = useNavigate();
    const { user } = AuthUser();
    const { id } = useParams();

    useEffect(() => {
        axiosClinet.get('/delegue')
            .then((res) => setDelegue(res.data.find((d) => d.id === parseInt(id))))
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data.filter((d) => parseInt(d.user_id) === user?.id || d.user_id === null))
                setLoading(false)
            })
    }, [])

    const handleUpdateDelegue = (event) => {
        const { name, value } = event.target;
        setUpdateDelegue(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateDelegueSelect = (event) => {
        const { name, value } = event.target;
        setUpdateDelegue(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)
        if (updateDelegue) {
            await axiosClinet.put(`/delegue/${id}`, updateDelegue).then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        setLoadingUpdate(false)
                        navigate('/dashboard/composants/updatedDelegue');
                    }
                }
            ).catch(
                (error) => {
                    setLoadingUpdate(false)
                }
            )
        } else {
            setLoadingUpdate(false)
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
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className="col-md-5">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-4">
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

                                <div className="row mt-3 d-flex justify-content-between">
                                    <div className="col-3">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>

                
                <div className="mx-4 d-lg-none">
                    <div class="col-sm-12 col-xl-6 text-center">
                        <div class="bg-secondary rounded h-100 p-4">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className="col-7">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-4 mb-4">
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

                                <div className="row mt-2">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 d-flex justify-content-between mt-4">
                                    <div className="col-5">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="mt-2">
                                            <Skeleton height={35} />
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
                        <div class="bg-secondary rounded h-100 p-4">
                            <p class="mb-lg-4 fs-2 fw-bold text-white">تعديل المندوب</p>
                            <form onSubmit={handleSubmit}>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                    <div class="col-sm-10">
                                        <input name="prenom" value={updateDelegue ? updateDelegue?.prenom : delegues?.prenom} onChange={handleUpdateDelegue} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                    <div class="col-sm-10">
                                        <input name="nom" value={updateDelegue ? updateDelegue?.nom : delegues?.nom} onChange={handleUpdateDelegue} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <select name="ville_id" onChange={handleUpdateDelegueSelect} class="form-select mb-3" aria-label="Default select example">
                                    <option selected disabled>المدينة</option>
                                    {villes?.map((v) =>
                                        <option selected={parseInt(delegues?.ville_id) === v.id} key={v.id} value={v.id}>{v.nom}</option>
                                    )}
                                </select>
                                <div className="d-flex justify-content-between">
                                    <Link to="/dashboard/composants/delegue" class="btn btn-danger pt-0 px-4 mt-3"> رجـــوع<i class="fa-solid fa-caret-right me-2 mt-1 pt-1"></i></Link>
                                    <button type="submit" class="btn btn-danger px-4 mt-3">تعديل
                                        {
                                            loadingUpdate ? (
                                                <div className="spinner-border spinner-border-sm fs-2 mt-1 me-3" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>)
                                                : <i class="fa-solid fa-circle-check me-3"></i>
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
export default UpdateStade;