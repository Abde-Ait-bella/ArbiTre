import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from "../../AuthContext";

function Matches() {

    const [matches, setMatches] = useState();
    const [club, setClub] = useState();
    const [villes, setVilles] = useState();
    const [competition, setCompetition] = useState();
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [idRapport, setIdRapport] = useState();
    const { user } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/matche')
            .then((res) => {
                setMatches(res.data.filter((m) => parseInt(m.user_id) === user?.id || m.user_id === null)),
                    setLoading(false)
            })
        axiosClinet.get('/club')
            .then((res) => { setClub(res.data)})
        axiosClinet.get('/ville')
            .then((res) => setVilles(res.data))
        axiosClinet.get('/competition')
            .then((res) => setCompetition(res.data))
        axiosClinet.get('/category')
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    const handleDelete = (id) => {
        setLoadingDelete(true)
        setIdRapport(id)
        axiosClinet.delete(`/matche/${id}`)
            .then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        navigate('/dashboard/DeletedMatche');
                        setLoadingDelete(false)
                    }
                }).catch((error) => {
                    setLoadingDelete(false)
                    console.error(`Error deleting stade with id ${id}:`, error);
                });
    };

    
    return (
        <>
            {/* <!-- Table matches --> */}

            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        {/* <h6 class="mb-0">Recent Salse</h6> */}
                        {/* <a href="">Show All</a> */}
                        <Link to="/dashboard/addRapport" class="btn btn-warning px-4">إضافة تقرير <i class="fa-solid fa-circle-plus me-2 pt-1"></i></Link>
                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">التاريخ</th>
                                    <th scope="col" className="text-center">الفريق المستقبل</th>
                                    <th scope="col" className="text-center">الفريق الزائر</th>
                                    <th scope="col" className="text-center">المنافسة</th>
                                    <th scope="col" className="text-center">الفئة</th>
                                    <th scope="col" className="text-center">النتيجة</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                    <th scope="col" className="text-center col-2">الإجراءات</th>
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
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                                <th><Skeleton height={30} /></th>
                                            </tr>
                                        </SkeletonTheme>

                                        :

                                        matches?.map((m) => (
                                            <tr className="text-center" key={m.id}>
                                                <td>{m.date}</td>
                                                <td>{club?.find(club => club.id === parseInt(m.club_id_1))?.nom} ({club?.find(club => club.id === parseInt(m.club_id_1))?.abbr})</td>
                                                <td>{club?.find(club => club.id === parseInt(m.club_id_2))?.nom} ({club?.find(club => club.id === parseInt(m.club_id_1))?.abbr})</td>
                                                <td>{competition?.find(c => c.id === parseInt(m.competition_id))?.nom}</td>
                                                <td>{categories?.find(c => c.id === parseInt(m.categorie_id))?.nom}</td>
                                                <td>{m.result_club_1}-{m.result_club_2}</td>
                                                <td>{villes?.find(ville => ville.id === parseInt(m.ville_id))?.nom}</td>
                                                <td><Link to={`/dashboard/updateMatche/${m.id}`}><i class="fa-solid fa-wrench pt-2 me-lg-2 me-3"></i></Link> <Link to={`/dashboard/detailleRapport/${m.id}`} class="btn btn-sm btn-warning me-1 pt-2 px-2">التفاصيل</Link>
                                                    <Link onClick={() => handleDelete(m.id)} >
                                                        {
                                                            loadingDelete & idRapport === m.id ? (
                                                                <div className="spinner-border spinner-border-sm me-2 mb-1 fs-2 mt-lg-0 mt-2" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>) : <i className="fa-solid fa-trash me-2 mt-lg-0 mt-2"></i>
                                                        }
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Matches;