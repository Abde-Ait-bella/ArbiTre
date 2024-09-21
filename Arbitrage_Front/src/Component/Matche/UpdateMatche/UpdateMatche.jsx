import React, { useState } from "react";
import { Avert } from "./Avert";
import { Changement } from "./Changment";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";
import "../../../style/Matche/updateMatche.scss"
import { Penalty } from "./Penalty";


function AddMatche() {

    const { id } = useParams();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (dataMatche) {
            setLoading(true)
            await axiosClinet.put(`/matche/${id}`, dataMatche).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                        navigate('/updatedMatche')
                    }
                }
                ).catch((response) => {
                    setLoading(false)
                })
            }
            if (dataAvert) {
                setLoading(true)
                await axiosClinet.put(`/avertissement/${id}`, dataAvert).then(
                    (response) => {
                        const { data } = response;
                        if (data.status == true) {
                            setLoading(false)
                            navigate('/updatedMatche')
                        }
                    }
                    ).catch((response) => {
                        setLoading(false)
                    })
                }
        if (dataChangement) {
            setLoading(true)
            await axiosClinet.put(`/changement/${id}`, dataChangement).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                        navigate('/updatedMatche')
                    }
                }
            ).catch((response) => {
                setLoading(false)
            })
        }
        if (dataButs) {
            setLoading(true)
            await axiosClinet.put(`/but/${id}`, dataButs).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                        navigate('/updatedMatche')
                    }
                }
            ).catch((response) => {
                setLoading(false)
            })
        }   if (dataPenalty) {
            await axiosClinet.put(`/penalty/${id}`, dataPenaltyUpdate).then(
                (response) => {
                    const { status } = response;
                    if (status === 200) {
                        setLoading(false)
                    }
                }
            ).catch((response) => {
                setLoading(false)
            })
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

    console.log('dataPenaltyUpdate', dataPenaltyUpdate)

    return (
        <div className="bg-dark p-4">
            <div class="card-header bg-secondary border border-light">
                <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">تعديل التقرير</p>
            </div>
            <div className="addRapport px-lg-5 py-3 rounded-bottom bg-light">

                <Matche dataMatche={handleMatcheData} />
                <Avert dataAvert={handleAvertData} />
                <Changement dataChangement={handleChangementData} />
                <Buts dataButs={handleButsData} />
                <Penalty dataPenalty={handlePenaltyData} />
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="submit" onChange={handleSubmit} className="btn btn-outline-warning px-5 py-2 fw-bold">التعديـــل
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
    )
}
export default AddMatche;