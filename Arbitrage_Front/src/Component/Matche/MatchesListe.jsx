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
    const { user } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [idmatche, setIdMatche] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClinet.get('/matche')
            .then((res) => {
                setMatches(res.data?.filter((m) => parseInt(m.user_id) === user?.id))
            })
        axiosClinet.get('/club')
            .then((res) => { setClub(res.data) })
        axiosClinet.get('/ville')
            .then((res) => setVilles(res.data))
        axiosClinet.get('/competition')
            .then((res) => setCompetition(res.data))
        axiosClinet.get('/category')
            .then((res) => {
                setCategories(res.data)
                setLoading(false)
            })
    }, [])

    const handleDelete = (id) => {
        setIdMatche(id)
        setLoadingDelete(true)
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
            <div className="container-fluid pt-4 px-4">
                < div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <Link to="/dashboard/addMatche" className="btn btn-warning px-4">إضافة مباراة <i className="fa-solid fa-circle-plus me-2 pt-1"></i></Link>
                    </div>
                    <div className="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table className="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col" className="text-center">التاريخ</th>
                                    <th scope="col" className="text-center">الفريق المستقبل</th>
                                    <th scope="col" className="text-center">الفريق الزائر</th>
                                    <th scope="col" className="text-center">المنافسة</th>
                                    <th scope="col" className="text-center">الفئة</th>
                                    <th scope="col" className="text-center">النتيجة</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                    <th scope="col" className="text-center col-2">التعديل / الحذف</th>
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
                                                <td>{club?.find(club => club.id === parseInt(m.club_id_2))?.nom} ({club?.find(club => club.id === parseInt(m.club_id_2))?.abbr})</td>
                                                <td>{competition?.find(c => c.id === parseInt(m.competition_id))?.nom}</td>
                                                <td>{categories?.find(c => c.id === parseInt(m.categorie_id))?.nom}</td>
                                                <td>{m.result_club_1}-{m.result_club_2}</td>
                                                <td>{villes?.find(ville => ville.id === parseInt(m.ville_id))?.nom}</td>
                                                <td>
                                                    <Link to={`/updateMatche/${m.id}`} ><i className="fa-solid fa-wrench pt-2"></i> </Link>
                                                    <Link onClick={() => handleDelete(m.id)} >
                                                        {
                                                            loadingDelete & idmatche === m.id ? (
                                                                <div className="spinner-border spinner-border-sm fs-2 me-3" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>) : <i className="fa-solid fa-trash me-3"></i>
                                                        }
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Matches;