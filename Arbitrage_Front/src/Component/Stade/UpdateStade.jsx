import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from "../../AuthContext";

function UpdateStade() {

    const [stades, setStades] = useState();
    const [villes, setVilles] = useState();
    const [updateStade, setUpdateStade] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const navigate = useNavigate();
    const { user } = AuthUser();
    const { id } = useParams();

    useEffect(() => {
        axiosClinet.get('/stade')
            .then((res) => {
                setStades(res.data.find((s) => s.id === parseInt(id)))
            })
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data.filter((v) => parseInt(v.user_id) === user?.id || v.user_id === null))
                setLoading(false)
            })
    }, [])



    const handleUpdateStade = (event) => {
        const { name, value } = event.target;
        setUpdateStade(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateStadeSelect = (event) => {
        const { name, value } = event.target;
        setUpdateStade(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)
        if (updateStade) {
            await axiosClinet.put(`/stade/${id}`, updateStade).then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        setLoadingUpdate(false)
                        navigate('/dashboard/composants/updatedStade');
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
        <>
            {
                loading ?
                    <>
                        <div className="d-flex justify-content-center my-4 ">
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
                                            <div className="col-12">
                                                <div className="mt-2">
                                                    <Skeleton height={40} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-4 d-flex justify-content-between">
                                            <div className="col-4">
                                                <div className="mt-2">
                                                    <Skeleton height={35} />
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="mt-2">
                                                    <Skeleton height={35} />
                                                </div>
                                            </div>
                                        </div>
                                    </SkeletonTheme>
                                </div>
                            </div>
                        </div>

                        <div className="d-lg-none mx-4">
                            <div class="col-sm-12 col-xl-6 text-center">
                                <div class="bg-secondary rounded h-100 p-4">
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">

                                        <div className="row d-flex align-items-center justify-content-center">
                                            <div className="col-6">
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
                                            <div className="col-12">
                                                <div className="mt-2">
                                                    <Skeleton height={40} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-4 d-flex justify-content-between">
                                            <div className="col-5">
                                                <div className="mt-2">
                                                    <Skeleton height={35} />
                                                </div>
                                            </div>
                                            <div className="col-6">
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
                                <p class="mb-4 fs-2 fw-bold text-white">تعديل الملعب</p>
                                <form onSubmit={handleSubmit}>
                                    <div class="row mb-3">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                        <div class="col-sm-10">
                                            <input name="nom" value={updateStade ? updateStade?.nom : stades?.nom} onChange={handleUpdateStade} type="text" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <select name="ville_id" onChange={handleUpdateStadeSelect} class="form-select mb-3" aria-label="Default select example">
                                        <option selected disabled>المدينة</option>
                                        {villes?.map((v) =>
                                            <option selected={parseInt(stades?.ville_id) === v.id} key={v.id} value={(v.id)}>{v.nom}</option>
                                        )}
                                    </select>
                                    <div className="d-flex justify-content-between mt-4">
                                        <Link to="/dashboard/composants/stades" class="btn btn-danger pt-0 px-4 mt-3"> رجوع<i class="fa-solid fa-caret-right pt-2 me-4"></i></Link>
                                        <button type="submit" class="btn btn-danger pt-0 px-4 mt-3">تعديل
                                            {
                                                loadingUpdate ? (
                                                    <div className="spinner-border spinner-border-sm fs-2 mt-2 me-3" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>)
                                                    : <i class="fa-solid fa-circle-check pt-2 me-3"></i>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
export default UpdateStade;