import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function JoueurListe() {

    const [joueurs, setJoueurs] = useState();
    const [idJoueur, setIdJoueur] = useState();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { user } = AuthUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClinet.get('/joueur')
            .then((res) => {
                setJoueurs(res.data.filter((j) => parseInt(j.user_id) === user?.id))
                setLoading(false)
            })
    }, [])

    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdJoueur(id)
        axiosClinet.delete(`/joueur/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    setLoadingDelete(false)
                    navigate('/composants/deletedJoueur');
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
                        <Link to="/dashboard/composants/addJoueur" class="btn btn-warning pt-2 px-4">إضافة لاعب <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">رقم الرخصة</th>
                                    <th scope="col" className="text-center">رقم الاعب</th>
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
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                            <tr className="text-center">
                                                <th className='col-3'><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th className='col-3'><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :

                                        joueurs?.map((j) => (
                                            <tr className="text-center" key={j.id}>
                                                <td>{j.nom.toUpperCase()}</td>
                                                <td>{j.joueur_numero_licence.toUpperCase()}</td>
                                                <td>{j.joueur_numero}</td>
                                                <td className='col-3'><Link to={`/dashboard/composants/updateJoueur/${j.id}`}><i class="fa-solid fa-wrench"></i></Link> <Link onClick={() => handleDelete(j.id)} >
                                                    {
                                                        loadingDelete & idJoueur === j.id ? (
                                                            <div className="spinner-border spinner-border-sm me-3 mb-1 fs-2" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>) : <i className="fa-solid fa-trash me-3"></i>
                                                    }
                                                </Link></td>
                                            </tr>
                                        ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <!-- End table matches --> */}
        </>
    )
}

export default JoueurListe;