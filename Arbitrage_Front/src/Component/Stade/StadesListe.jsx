import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function StadesListe() {

    const [stades, setStades] = useState();
    const [stadesDefault, setStadesDefault] = useState();
    const [villes, setVilles] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(true);
    const [idStade, setIdStade] = useState(true);

    const { user } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/stade')
            .then((res) => {
                setStades(res.data.filter((v) => parseInt(v.user_id) === user?.id))
                setStadesDefault(res.data.filter((v) => v.user_id === null))
            })
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data)
                setLoading(false)
            })
    }, [])



    const handleDelete = async (id) => {
        setIdStade(id);
        setLoadingDelete(true)
        await axiosClinet.delete(`/stade/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    setLoadingDelete(false)
                    navigate('/composants/DeletedStade');
                }
            }
        ).catch((error) => {
            setLoadingDelete(false)
            console.error(`Error deleting stade with id ${id}:`, error);
        });
    };

    return (
        <>



            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-start mb-3">
                        <Link to="/composants/addStade" className="btn btn-warning px-4">إضافة ملعب <i className="fa-solid fa-circle-plus me-2 pt-1"></i></Link>

                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col" className="text-center">الملعب</th>
                                    <th scope="col" className="text-center">المدينة أو الجماعة</th>
                                    <th scope="col" className="text-center col-4">الحدف أو التعديل</th>
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
                                            </tr>
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :
                                        <>
                                            <>{
                                                stadesDefault?.map((s) => (
                                                    <tr className="text-center" key={s.id}>
                                                        <td>{s.nom}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(s.ville_id))?.nom}</td>
                                                        <td><i class="fa-solid fa-wrench text-dark"></i> <i class="fa-solid fa-trash text-dark me-3 pt-2"></i></td>
                                                    </tr>
                                                ))}
                                            </>
                                            <>{
                                                stades?.map((s) => (
                                                    <tr className="text-center" key={s.id}>
                                                        <td>{s.nom}</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(s.ville_id))?.nom}</td>
                                                        <td><Link to={`/composants/updateStade/${s.id}`}><i class="fa-solid fa-wrench"></i></Link> <Link onClick={() => handleDelete(s.id)} >
                                                                {
                                                                    loadingDelete & idStade === s.id ? (
                                                                        <div className="spinner-border spinner-border-sm me-3 mb-lg-1 fs-2" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>) : <i className="fa-solid fa-trash me-3"></i>
                                                                }
                                                            </Link>
                                                        </td>
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
        </>
    )
}

export default StadesListe;