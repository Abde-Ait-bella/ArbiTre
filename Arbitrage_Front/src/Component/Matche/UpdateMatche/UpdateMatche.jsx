import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avert } from "./Avert";
import { Changement } from "./Changement";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";
import "../../../style/Matche/updateMatche.scss"
import { Penalty } from "./Penalty";
import { AuthUser } from "../../../AuthContext";
import '../../../style/toast-custom.css';


function AddMatche() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { club_1_Option_update, club_2_Option_update } = AuthUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If nothing changed, prevent saving
        const hasAnyChange = dataMatche || dataAvert || dataChangement || dataButs || dataPenaltyUpdate;
        if (!hasAnyChange) {
            toast.error('لا يوجد تغييرات لحفظها', {
                position: 'top-left',
                autoClose: 4000,
            });
            return;
        }

        setLoading(true);
        let anySuccess = false;
        try {
            if (dataMatche) {
                const resp = await axiosClinet.put(`/matche/${id}`, dataMatche);
                if (resp?.data?.status === true) {
                    anySuccess = true;
                    club_1_Option_update('');
                    club_2_Option_update('');
                }
            }

            if (dataAvert) {
                const resp = await axiosClinet.put(`/avertissement/${id}`, dataAvert);
                if (resp?.data?.status === true) anySuccess = true;
            }

            if (dataChangement) {
                const resp = await axiosClinet.put(`/changement/${id}`, dataChangement);
                if (resp?.data?.status === true) anySuccess = true;
            }

            if (dataButs) {
                const resp = await axiosClinet.put(`/but/${id}`, dataButs);
                if (resp?.data?.status === true) anySuccess = true;
            }

            if (dataPenaltyUpdate) {
                const resp = await axiosClinet.put(`/penalty/${id}`, dataPenaltyUpdate);
                if (resp?.status === 200) anySuccess = true;
            }

            if (anySuccess) {
                toast.success('تم الحفظ بنجاح', { position: 'top-left', autoClose: 2500 });
                navigate('/dashboard/updatedMatche');
            } else {
                toast.info('لم يتم حفظ أي تغييرات', { position: 'top-left', autoClose: 2500 });
            }
        } catch (err) {
            console.error(err);
            toast.error('حدث خطأ أثناء الحفظ', { position: 'top-left', autoClose: 4000 });
        } finally {
            setLoading(false);
        }
    }

    const [dataAvert, setDataAvert] = useState();
    const [dataMatche, setDataMatche] = useState();
    const [dataChangement, setDataChangement] = useState();
    const [dataButs, setDataButs] = useState();
    const [dataPenaltyUpdate, setDataPenaltyUpdate] = useState();
    const [loading, setLoading] = useState(false);

    const handleAvertData = (dataFromChild) => {
        setDataAvert(dataFromChild);
    }

    const handleMatcheData = (dataFromChild) => {
        setDataMatche(dataFromChild);
    }

    const handleChangementData = (dataFromChild) => {
        setDataChangement(dataFromChild);
    }

    const handleButsData = (dataFromChild) => {
        setDataButs(dataFromChild);
    }

    const handlePenaltyData = (dataFromChild) => {
        setDataPenaltyUpdate(dataFromChild);
    }

    return (
        <>
        <ToastContainer />
        <div className="p-4 bg-dark">
            <div class="card-header bg-secondary border border-light">
                <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">تعديل التقرير</p>
            </div>
            <div className="py-3 addRapport px-lg-5 rounded-bottom bg-light">

                <Matche dataMatche={handleMatcheData} />
                <Avert dataAvert={handleAvertData} />
                <Changement dataChangement={handleChangementData} />
                <Buts dataButs={handleButsData} />
                <Penalty dataPenalty={handlePenaltyData} />
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="submit" onChange={handleSubmit} className="px-5 py-2 btn btn-outline-warning fw-bold">التعديـــل
                                {loading ? (
                                    <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>) : ''}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default AddMatche;