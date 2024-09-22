import React, { useState } from "react";
import { Avert } from "./Avert";
import { Changement } from "./Changment";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { Penalty } from "./Penalty";
import { useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";
import { AuthUser } from "../../../AuthContext";


function AddRapport() {

    const [dataAvert, setDataAvert] = useState();
    const [dataMatche, setDataMatche] = useState();
    const [dataChangement, setDataChangement] = useState();
    const [dataButs, setDataButs] = useState();
    const [dataPenalty, setDataPenalty] = useState();
    const [loading, setLoading] = useState(false);
    const { club_1_Option, club_2_Option } = AuthUser();

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
            if (dataMatche) {
                await axiosClinet.post('/matche', dataMatche).then(
                    (response) => {
                        const { status } = response;
                        if (status === 200) {
                            setLoading(false)
                            club_1_Option('')
                            club_2_Option('')
                            navigate('/addedRapport')
                        }
                    }
                ).catch((response) => {
                    setLoading(false)
                })
            }else{
                setLoading(false)
            }
            if (dataAvert) {
                await axiosClinet.post('/avertissement', dataAvert).then(
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
            if (dataChangement) {
                await axiosClinet.post('/changement', dataChangement).then(
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
            if (dataButs) {
                await axiosClinet.post('/but', dataButs).then(
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
            if (dataPenalty) {
                await axiosClinet.post('/penalty', dataPenalty).then(
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
        setDataPenalty(dataFromChild);
    }

    console.log('dataPenalty', dataPenalty)


    return (
        <>
            <div className="bg-dark p-4">
                <div class="card-header bg-secondary border border-light">
                    <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">إضافة تقرير</p>
                </div>
                <div className="addRapport px-lg-5 py-3 rounded-bottom bg-light">
                    <Matche dataMatche={handleMatcheData} />
                    <Avert dataAvert={handleAvertData} />
                    <Changement dataChangement={handleChangementData} />
                    <Buts dataButs={handleButsData} />
                    <Penalty dataPenalty={handlePenaltyData}/>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div>
                            <button type="submit" onChange={handleSubmit} className="btn btn-outline-warning px-5 py-2 fw-bold">إضـافـــــــة
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

export default AddRapport;