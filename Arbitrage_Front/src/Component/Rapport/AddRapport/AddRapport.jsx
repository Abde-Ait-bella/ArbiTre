import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avert } from "./Avert";
import { Changement } from "./Changement";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { Penalty } from "./Penalty";
import { useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";
import { AuthUser } from "../../../AuthContext";
import '../../../style/toast-custom.css';

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
        if (!dataMatche) {
            setLoading(false);
            toast.error('يا هاد الحكم دير حفض للمعلومات أولاً', {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
            });
            return;
        }
        if (dataMatche) {
            await axiosClinet.post('/matche', dataMatche).then(
                (response) => {
                    const { status } = response;
                    if (status === 201) {
                        setLoading(false)
                        club_1_Option('')
                        club_2_Option('')
                        navigate('/dashboard/addedRapport')
                    }
                }
            ).catch((response) => {
                setLoading(false)
                toast.error('حدث خطأ أثناء إضافة المباراة', {
                    position: "top-left",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    type: "error",
                });
            })
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


    return (
        <>
            <ToastContainer />

            <div className="p-4 bg-dark">
                <div class="card-header bg-secondary border border-light">
                    <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">إضافة تقرير</p>
                </div>
                <div className="py-3 addRapport px-lg-5 rounded-bottom bg-light">
                    <Matche dataMatche={handleMatcheData} />
                    <Avert dataAvert={handleAvertData} />
                    <Changement dataChangement={handleChangementData} />
                    <Buts dataButs={handleButsData} />
                    <Penalty dataPenalty={handlePenaltyData}/>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div>
                            <button type="submit" onChange={handleSubmit} className="px-5 py-2 btn btn-outline-warning fw-bold">إضـافـــــــة
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