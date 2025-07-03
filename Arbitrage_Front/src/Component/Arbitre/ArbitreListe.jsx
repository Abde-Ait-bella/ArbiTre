import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'
import { axiosClinet } from '../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../AuthContext';

function ArbiTreListe() {
    const [arbitre, setArbitre] = useState([]);
    const [villes, setVilles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [arbitreDefault, setArbitreDefault] = useState([]);
    const [idArbitre, setIdArbitre] = useState();
    const {user} = AuthUser();
    const navigate = useNavigate();
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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
                    navigate('/dashboard/composants/deletedArbitre');
                    setLoadingDelete(false)
                }
            }
        ).catch((error) => {
            setLoadingDelete(false)
            console.error(`Error deleting stade with id ${id}:`, error);
        });
    };
    
    // Calculate pagination
    const combinedArbitres = [...(arbitreDefault || []), ...(arbitre || [])];
    const totalPages = Math.ceil(combinedArbitres.length / itemsPerPage);
    
    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = combinedArbitres.slice(indexOfFirstItem, indexOfLastItem);
    
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <>
            {/* <!-- Table matches --> */}
            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <Link to="/dashboard/composants/addArbitre" class="btn btn-warning pt-2 px-4">إضافة الحكم <i class="fa-solid fa-circle-plus me-2"></i></Link>
                        <span className="text-white">إجمالي الحكام: {combinedArbitres.length}</span>
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
                                            {[...Array(itemsPerPage)].map((_, index) => (
                                                <tr className="text-center" key={index}>
                                                    <th><Skeleton height={30} /></th>
                                                    <th><Skeleton height={30} /></th>
                                                    <th><Skeleton height={30} /></th>
                                                    <th><Skeleton height={30} /></th>
                                                    <th><Skeleton height={30} /></th>
                                                </tr>
                                            ))}
                                        </SkeletonTheme>
                                        :
                                        currentItems.map((a) => (
                                            <tr className="text-center" key={a.id}>
                                                <td>{a.prenom.toUpperCase()}</td>
                                                <td>{a.nom.toUpperCase()}</td>
                                                <td>{a.type.toUpperCase()}</td>
                                                <td>{villes?.find(ville => ville.id === parseInt(a.ville_id))?.nom}</td>
                                                <td>
                                                    {a.user_id === null ? (
                                                        <>
                                                            <i class="fa-solid fa-wrench text-dark"></i> 
                                                            <i class="fa-solid fa-trash text-dark me-3"></i>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Link to={`/dashboard/composants/updateArbitre/${a.id}`}>
                                                                <i class="fa-solid fa-wrench"></i>
                                                            </Link> 
                                                            <Link onClick={() => handleDelete(a.id)} >
                                                                {loadingDelete && idArbitre === a.id ? (
                                                                    <div className="spinner-border spinner-border-sm me-3 mb-1 fs-2" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                    <i className="fa-solid fa-trash me-3"></i>
                                                                )}
                                                            </Link>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination with Tailwind CSS */}
                    {!loading && totalPages > 1 && (
                        <div className="mt-4">
                            <div dir="rtl" className="flex justify-center items-center space-x-2 space-x-reverse text-3xl font-bold underline text-blue-600">
                                {/* Next button (left in RTL) */}
                                <button 
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center justify-center w-10 h-10 rounded-md ${
                                        currentPage === totalPages 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : 'bg-dark p-4 text-white hover:bg-primary-dark'
                                    }`}
                                    aria-label="Next"
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                                
                                {/* Page numbers */}
                                <div className="flex space-x-1 space-x-reverse">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = totalPages - index;
                                        return (
                                            <button 
                                                key={index}
                                                onClick={() => paginate(pageNumber)}
                                                className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                                                    currentPage === pageNumber 
                                                    ? 'bg-warning text-white' 
                                                    : 'bg-secondary text-white hover:bg-gray-600'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>
                                
                                {/* Previous button (right in RTL) */}
                                <button 
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center justify-center w-10 h-10 rounded-md ${
                                        currentPage === 1 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : 'bg-primary text-white hover:bg-primary-dark'
                                    }`}
                                    aria-label="Previous"
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <!-- End table matches --> */}
        </>
    )
}

export default ArbiTreListe;