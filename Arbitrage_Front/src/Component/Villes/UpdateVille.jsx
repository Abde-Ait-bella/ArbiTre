import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UpdateVille() {


    const [ville, setVille] = useState();
    const [updateVille, setUpdateVille] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axiosClinet.get('/ville')
            .then((res) => {
                setVille(res.data.find((v) => v.id === parseInt(id)))
                setLoading(false)
            })
    }, [])

    const handleUpdateVille = (event) => {
        const { name, value } = event.target;
        setUpdateVille(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)
        if (updateVille) {
            await axiosClinet.put(`/ville/${id}`, updateVille).then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        setLoadingUpdate(false)
                        navigate('/dashboard/composants/updatedVille');
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

                                    <div className="row mt-3 d-flex justify-content-between">
                                        <div className="col-3">
                                            <div className="mt-2">
                                                <Skeleton height={36} />
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mt-2">
                                                <Skeleton height={36} />
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

                                    <div className="row d-flex align-items-center justify-content-center">
                                        <div className="col-6">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>

                                    <div className="row d-flex align-items-center justify-content-center mt-4">
                                        <div className="col-5">
                                            <Skeleton height={30} />
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
                                        <div className="col-5">
                                            <div className="mt-2">
                                                <Skeleton height={36} />
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="mt-2">
                                                <Skeleton height={36} />
                                            </div>
                                        </div>
                                    </div>
                                </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                        <div className="d-flex justify-content-center my-4">
                            <div class="col-sm-12 col-xl-6 text-center">
                                <div class="bg-secondary rounded h-100 p-4 p-4 mx-4 mx-lg-0">
                                    <p class="mb-4 fs-2 fw-bold text-white">تعديل المدينة</p>
                                    <form onSubmit={handleSubmit}>
                                        <div class="row mb-3">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                            <div class="col-md-12">
                                                <input placeholder="المدينة - الجماعة" name="nom" value={updateVille ? updateVille?.nom : ville?.nom} onChange={handleUpdateVille} type="text" class="form-control" id="inputEmail3" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <Link to="/dashboard/composants/villes" class="btn btn-danger pt-0 px-4 mt-3"> رجوع<i class="fa-solid fa-caret-right me-2 mt-1 pt-1"></i></Link>
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
                        </div>
                </>
        }
        </>
    )
}
export default UpdateVille;