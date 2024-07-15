import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function VillesListe() {

    const [villes, setVilles] = useState();
    const [villesDefault, setVillesDefault] = useState();
    const [loadingDelete, setLoadingDelete] = useState();
    const [loading, setLoading] = useState(true);
    const [idJoueur, setIdJoueur] = useState(true);
    const navigate = useNavigate();
    const { user } = AuthUser();

    useEffect(() => {
        axiosClinet.get('/ville')
            .then((res) => {
                setVilles(res.data.filter((v) => parseInt(v.user_id) === user?.id))
                setVillesDefault(res.data.filter((v) => v.user_id === null))
                setLoading(false)
            })
    }, [])

    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdJoueur(id)
        axiosClinet.delete(`/ville/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    setLoadingDelete(false)
                    navigate('/composants/deletedVille');
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
                        <Link to="/composants/addVille" class="btn btn-warning pt-2 px-4">إضافة مدينة - جماعة <i class="fa-solid fa-circle-plus me-2"></i></Link>
                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">المدينة / الجماعة</th>
                                    <th scope="col" className="text-center">الحدف / التعديل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?

                                        <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :

                                        <>
                                            <>
                                                {villesDefault?.map((v) => (
                                                    <tr className="text-center" key={v.id}>
                                                        <td>{v.nom}</td>
                                                        <td><i class="fa-solid fa-wrench text-dark"></i> <i class="fa-solid fa-trash text-dark me-3"></i></td>
                                                    </tr>
                                                ))
                                                }
                                            </>
                                            <>
                                                {villes?.map((v) => (
                                                    <tr className="text-center" key={v.id}>
                                                        <td>{v.nom}</td>
                                                        <td> <Link to={`/composants/updateVille/${v.id}`}><i class="fa-solid fa-wrench"></i></Link>
                                                            <Link onClick={() => handleDelete(v.id)} >
                                                                {
                                                                    loadingDelete & idJoueur === v.id ? (
                                                                        <div className="spinner-border spinner-border-sm me-3 mb-1 fs-2" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>) : <i className="fa-solid fa-trash me-3"></i>
                                                                }
                                                            </Link></td>
                                                    </tr>
                                                ))
                                                }
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

export default VillesListe;