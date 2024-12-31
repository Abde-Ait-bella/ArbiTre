import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UpdateStade() {

    const [arbitres, setArbitres] = useState();
    const [villes, setVilles] = useState();
    const [updateArbitre, setUpdateArbitre] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = AuthUser();

    useEffect(() => {
        axiosClinet.get('/arbitre')
            .then((res) => setArbitres(res.data.find((a) => a.id === parseInt(id))))
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data.filter((d) => parseInt(d.user_id) === user?.id || d.user_id === null))
                setLoading(false)
            })
    }, [])

    const handleUpdateArbitre = (event) => {
        const { name, value } = event.target;
        setUpdateArbitre(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateArbitreSelect = (event) => {
        const { name, value } = event.target;
        setUpdateArbitre(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingUpdate(true)
        if (updateArbitre) {
            await axiosClinet.put(`/arbitre/${id}`, updateArbitre).then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        setLoadingUpdate(false)
                        navigate('/dashboard/composants/updatedArbitre');
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

                                    <div className="row d-flex align-items-center justify-content-center mt-2">
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

                    <div className="px-4 d-lg-none">
                        <div class="col-sm-12 col-xl-6 text-center">
                            <div class="bg-secondary rounded h-100 p-4">
                                <div>
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                        <div className="row d-flex align-items-center justify-content-center mb-4">
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

                                        <div className="row mt-2 d-flex justify-content-center">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <Skeleton height={35} width={135} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2 d-flex justify-content-center">
                                            <div className="col-6">
                                                <div className="mt-2">
                                                    <Skeleton height={35} width={135} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mt-lg-3 mt-4 d-flex justify-content-between">
                                            <div className="col-6">
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
                    </div>
                </>
                :
                <div className="d-flex justify-content-center my-4">
                    <div class="col-sm-12 col-xl-6 text-center">
                        <div class="bg-secondary rounded h-100 p-4">
                            <p class="mb-4 fs-2 fw-bold text-white">تعديل الحكم(ة)</p>
                            <form onSubmit={handleSubmit}>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                    <div class="col-sm-10">
                                        <input name="prenom" value={updateArbitre ? updateArbitre?.prenom : arbitres?.prenom} onChange={handleUpdateArbitre} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                    <div class="col-sm-10">
                                        <input name="nom" value={updateArbitre ? updateArbitre?.nom : arbitres?.nom} onChange={handleUpdateArbitre} type="text" class="form-control" id="inputEmail3" />
                                    </div>
                                </div>
                                <select name="ville_id" onChange={handleUpdateArbitreSelect} class="form-select mb-3" aria-label="Default select example">
                                    <option selected disabled>المدينة</option>
                                    {villes?.map((v) =>
                                        <option selected={parseInt(arbitres?.ville_id) === v.id} key={v.id} value={v.id}>{v.nom}</option>
                                    )}
                                </select>
                                <fieldset class="row mb-3">
                                    <legend class="col-form-label col-sm-2 pt-1 mb-2">التخصص</legend>
                                    <div class="col-md-5 col-sm-10 mt-lg-4 mb-2">
                                        <div class="form-check">
                                            <input class="form-check-input" checked={updateArbitre?.type ? updateArbitre?.type == "center" : arbitres?.type === "center"} onChange={handleUpdateArbitre} type="radio" name="type" id="gridRadios1" value="center" />
                                            <label class="form-check-label" for="gridRadios1">
                                                حكم(ة) الساحة
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" checked={updateArbitre?.type ? updateArbitre?.type == "Assistant" : arbitres?.type === "Assistant"} onChange={handleUpdateArbitre} type="radio" name="type" id="gridRadios2" value="Assistant" />
                                            <label class="form-check-label" for="gridRadios2">
                                                الحكم(ة) المساعد
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="d-flex justify-content-between">
                                    <Link to="/dashboard/dashboard/composants/arbitres" class="btn btn-danger pt-0 px-4 mt-3"> رجوع<i class="fa-solid fa-caret-right pt-2 me-4"></i></Link>
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