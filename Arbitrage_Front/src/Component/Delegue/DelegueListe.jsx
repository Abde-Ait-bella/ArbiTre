import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function DelegueListe() {

    const [delegues, setDelegues] = useState();
    const [villes, setVilles] = useState();
    const [delegueDefault, setDelegueDefault] = useState();
    const [loadingDelete, setLoadingDelete] = useState();
    const [idDelegue, setIdDelegue] = useState();
    const { user } = AuthUser();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClinet.get('/delegue')
            .then((res) => {
                setDelegues(res.data.filter((d) => parseInt(d.user_id) === user?.id))
                setDelegueDefault(res.data.filter((d) => d.user_id === null))
            })
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data)
                setLoading(false)
            })
    }, [])


    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdDelegue(id)
        axiosClinet.delete(`/delegue/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    setLoadingDelete(false)
                    navigate('/dashboard/composants/deletedDelegue');
                }
            }
        ).catch((error) => {
            setLoadingDelete(false)
            console.error(`Error deleting stade with id ${id}:`, error);
        });
    };

    return (
        <>
            {/* <!-- Table matches --> */}

            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-start mb-3">
                        <Link to="/dashboard/composants/addDelegue" class="btn btn-warning pt-2 px-4">إضافة مندوب <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">النسب</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                    <th scope="col" className="text-center">التعديل / الحدف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?

                                        <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                            <tr className="text-center">
                                                <td><Skeleton height={30} /></td>
                                                <td><Skeleton height={30} /></td>
                                                <td><Skeleton height={30} /></td>
                                                <td><Skeleton height={30} /></td>
                                            </tr>
                                            <tr className="text-center">
                                                <td><Skeleton height={30} /></td>
                                                <td><Skeleton height={30} /></td>
                                                <td><Skeleton height={30} /></td>
                                                <td className='col-3'><Skeleton height={30} /></td>
                                            </tr>
                                        </SkeletonTheme>

                                        :
                                        <>
                                            <>
                                                {delegueDefault?.map((d) => (
                                                    <tr className="text-center" key={d.id}>
                                                        <td>{d.prenom.toUpperCase()}</td>
                                                        <td>{d.nom.toUpperCase()}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(d.ville_id))?.nom}</td>
                                                        <td><i class="fa-solid fa-wrench text-dark"></i> <i class="fa-solid fa-trash text-dark me-3"></i></td>
                                                    </tr>
                                                ))}
                                            </>
                                            <>
                                                {delegues?.map((d) => (
                                                    <tr className="text-center" key={d.id}>
                                                        <td>{d.prenom.toUpperCase()}</td>
                                                        <td>{d.nom.toUpperCase()}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(d.ville_id))?.nom}</td>
                                                        <td className='col-3'><Link to={`/dashboard/composants/updateDelegue/${d.id}`}><i class="fa-solid fa-wrench"></i></Link> <Link onClick={() => handleDelete(d.id)} >
                                                            {
                                                                loadingDelete & idDelegue === d.id ? (
                                                                    <div className="spinner-border spinner-border-sm me-3 mb-1 fs-2" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>) : <i className="fa-solid fa-trash me-3"></i>
                                                            }
                                                        </Link></td>
                                                    </tr>
                                                ))}
                                            </>
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <!-- End table matches --> */}
        </>
    )
}

export default DelegueListe;