import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';


function ClubListe() {

    const [clubs, setClubs] = useState();
    const [villes, setVilles] = useState();
    const [clubsDefault, setClubDefautlt] = useState();
    const { user } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [idClub, setIdClub] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/club')
            .then((res) => {
                setClubs(res.data.filter((d) => parseInt(d.user_id) === user?.id))
                setClubDefautlt(res.data.filter((c) => c.user_id === null))
                setLoading(false)
            })
        axiosClinet.get('/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdClub(id)
        axiosClinet.delete(`/club/${id}`).then(
            (response) => {
                const { status } = response;
                if (status === 200) {
                    setLoadingDelete(false)
                    navigate('/composants/deletedClub');
                }
            }
        ).catch((error) => {
            setLoadingDelete(false)
            console.error(`Error deleting stade with id ${id}:`, error);
        });
    };

    return (
        <>
            <h1>{ }</h1>
            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <Link to="/composants/addClub" class="btn btn-warning pt-2 px-4">إضافة نادي <i class="fa-solid fa-circle-plus me-2"></i></Link>
                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center"> النادي</th>
                                    <th scope="col" className="text-center"> المدينة أو الجماعة</th>
                                    <th scope="col" className="text-center col-4">التعديل / الحذف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?

                                        <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                            <tr className="text-center">
                                                <th ><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th ><Skeleton height={30} /></th>
                                            </tr>
                                            <tr className="text-center">
                                                <th><Skeleton height={30} /></th>
                                                <th className='col-4'><Skeleton height={30} /></th>
                                                <th className='col-3'><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :

                                        <>
                                            <>
                                                {clubsDefault?.map((c) => (
                                                    <tr className="text-center" key={c.id}>
                                                        <td>{c.nom} ({c.abbr})</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(c.ville_id))?.nom}</td>
                                                        <td><i class="fa-solid fa-wrench text-dark"></i> <i class="fa-solid fa-trash text-dark me-3 pt-2"></i></td>
                                                    </tr>
                                                ))}
                                            </>
                                            <>
                                                {clubs?.map((c) => (
                                                    <tr className="text-center" key={c.id}>
                                                        <td>{c.nom} ({c.abbr})</td>
                                                        <td>{villes?.find(ville => ville.id === parseInt(c.ville_id))?.nom}</td>
                                                        <td>
                                                            <Link to={`/composants/updateClub/${c.id}`}><i class="fa-solid fa-wrench pt-2"></i></Link> <Link onClick={() => handleDelete(c.id)} >
                                                                {
                                                                    loadingDelete & idClub === c.id ? (
                                                                        <div className="spinner-border spinner-border-sm me-3 mb-1 fs-2" role="status">
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

export default ClubListe;