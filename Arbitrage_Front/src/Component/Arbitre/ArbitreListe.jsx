import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function ArbiTreListe() {

    const [arbitre, setArbitre] = useState();
    const [villes, setVilles] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [arbitreDefault, setArbitreDefault] = useState();
    const [idArbitre, setIdArbitre] = useState();
    const {user} = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/arbitre')
            .then((res) => {
                setArbitre(res.data.filter((a) => parseInt(a.user_id) === user?.id))
                setArbitreDefault(res.data?.filter((a) => a.user_id === null))
            })
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data)
                setLoading(false)
            })
    }, [])

    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdArbitre(id)
        axiosClinet.delete(`/arbitre/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    navigate('/composants/deletedArbitre');
                    setLoadingDelete(false)
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
                        <Link to="/composants/addArbitre" class="btn btn-warning pt-2 px-4">إضافة الحكم <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">النسب</th>
                                    <th scope="col" className="text-center">التخصص</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                    <th scope="col" className="text-center col-3">الحدف / التعديل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?

                                        <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :
                                        <>
                                            <>
                                                {arbitreDefault?.map((a) => (
                                                    <tr className="text-center" key={a.id}>
                                                        <td>{a.prenom.toUpperCase()}</td>
                                                        <td>{a.nom.toUpperCase()}</td>
                                                        <td>{a.type.toUpperCase()}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(a.ville_id))?.nom}</td>
                                                        <td><i class="fa-solid fa-wrench text-dark"></i> <i class="fa-solid fa-trash text-dark me-3"></i></td>
                                                    </tr>
                                                ))}
                                            </>
                                            <>
                                                {arbitre?.map((a) => (
                                                    <tr className="text-center" key={a.id}>
                                                        <td>{a.prenom.toUpperCase()}</td>
                                                        <td>{a.nom.toUpperCase()}</td>
                                                        <td>{a.type.toUpperCase()}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(a.ville_id))?.nom}</td>
                                                        <td><Link to={`/composants/updateArbitre/${a.id}`}><i class="fa-solid fa-wrench"></i></Link> <Link onClick={() => handleDelete(a.id)} >
                                                            {
                                                                loadingDelete & idArbitre === a.id ? (
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

export default ArbiTreListe;