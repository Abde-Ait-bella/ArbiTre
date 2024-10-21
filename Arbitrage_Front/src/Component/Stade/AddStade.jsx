import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AddStade() {

    const [villes, setVilles] = useState();
    const [addStade, setAddStade] = useState();
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

    const handleAddStade = (event) => {
        const { name, value } = event.target;
        setAddStade(prevValues => ({
            ...prevValues,
            [name]: value,
            user_id: parseInt(user?.id),
        }))
    }

    const handleAddStadeSelect = (event) => {
        const { name, value } = event.target;
        setAddStade(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingAdd(true)
        if (addStade) {
            await axiosClinet.post('/stade', addStade).then(
                (response) => {
                    const { data } = response;
                    if (data.status === true) {
                        setLoadingAdd(false)
                        navigate('/dashboard/composants/addedStade');
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
            {
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
                                                    <Skeleton height={35} />
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

                        <div className="d-lg-none px-4">
                            <div class="col-md-12 col-xl-6 text-center">
                                <div class="bg-secondary rounded h-100 p-4">
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                        <div className="row d-flex align-items-center justify-content-start">
                                            <div className="col-4">
                                                <Skeleton height={40} />
                                            </div>
                                        </div>

                                        <div className="row d-flex align-items-center justify-content-center mt-4">
                                            <div className="col-5">
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
                        <div class="col-md-12 col-xl-6 text-center">
                            <div class="bg-secondary rounded h-100 p-4">
                                <div className="d-flex justify-content-start">
                                    <Link to="/dashboard/composants/stades" class="btn btn-warning px-4 mb-3"> رجـــوع<i class="fa-solid fa-caret-right me-3 pt-1"></i></Link>
                                </div>
                                <p class="mb-lg-4 fs-2 fw-bold text-white">إضافة الملعب</p>
                                <form onSubmit={handleSubmit}>
                                    <div class="row mb-3">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                        <div class="col-sm-10">
                                            <input name="nom" onChange={handleAddStade} type="text" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <select name="ville_id" onChange={handleAddStadeSelect} class="form-select mb-3" aria-label="Default select example">
                                        <option selected disabled>المدينة</option>
                                        {villes?.map((v) =>
                                            <option key={v.id} value={v.id}>{v.nom}</option>
                                        )}
                                    </select>
                                    <div className="mt-5">
                                        <button type="submit" class="btn btn-danger px-5 py-2">إضــــافة
                                            {
                                                loadingAdd ? (
                                                    <div className="spinner-border spinner-border-sm fs-2 mt-2 me-3" role="status">
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
            }
        </>
    )
}
export default AddStade;