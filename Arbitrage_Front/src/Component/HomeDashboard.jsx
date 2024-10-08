import { React, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler, ArcElement, RadialLinearScale } from 'chart.js';
import { Bar, Pie, PolarArea } from "react-chartjs-2";
import { axiosClinet } from "../Api/axios";
import { Line } from 'react-chartjs-2';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from "../AuthContext";
import ImageYellow from "../../public/img/yellow-card.png";
import ImageRed from "../../public/img/red-card.png";
import ImageMatche from "../../public/img/matche.png";
import ImageBalance from "../../public/img/balance.png";
import Palestine from "../../public/img/palistaine.png";
import imgPdf from "../../public/img/pngdow.png";
import imgWord from "../../public/img/word.png";

import "../style/HomeDashboard.scss";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Filler,
    Legend
);

function Home() {

    const [matche_01, setMatche_01] = useState();
    const [matche_02, setMatche_02] = useState();
    const [matche_03, setMatche_03] = useState();
    const [matche_04, setMatche_04] = useState();
    const [matche_05, setMatche_05] = useState();
    const [matche_06, setMatche_06] = useState();
    const [matche_07, setMatche_07] = useState();
    const [avertData, setAvertData] = useState();
    const [season, setSeason] = useState(new Date().getFullYear());
    const [matcheSeason, setMatcheSeason] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = AuthUser();

    const pageRef = useRef();


    useEffect(() => {

        axiosClinet.get('/matche')
            .then((res) => {
                const dataMatche = res.data.filter((m) => parseInt(m.user_id) === user?.id)

                const filterMatch_season = dataMatche?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getFullYear() === parseInt(season);
                });

                const filteredMatches_01 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 0;
                });

                const filteredMatches_02 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 1;
                });

                const filteredMatches_03 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 2;
                });
                const filteredMatches_04 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 3;
                });
                const filteredMatches_05 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 4;
                });
                const filteredMatches_06 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 5;
                });
                const filteredMatches_07 = filterMatch_season?.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 6;
                });
                setMatche_01(filteredMatches_01?.map((m) => m?.id))
                setMatche_02(filteredMatches_02?.map((m) => m?.id))
                setMatche_03(filteredMatches_03?.map((m) => m?.id))
                setMatche_04(filteredMatches_04?.map((m) => m?.id))
                setMatche_05(filteredMatches_05?.map((m) => m?.id))
                setMatche_06(filteredMatches_06?.map((m) => m?.id))
                setMatche_07(filteredMatches_07?.map((m) => m?.id))

                setMatcheSeason(filterMatch_season)
                setLoading(false)
            })

        axiosClinet.get('/avertissement')
            .then((res) => {
                setAvertData(res.data.filter((a) => parseInt(a.matche.user_id) === user?.id))
            });

    }, [user, season])

    const avertSeason = avertData?.filter((a) => matcheSeason?.some((m) => m.id === parseInt(a?.matche_id)))
    const avert_G = avertSeason?.filter((a) => a.type === 'G')
    const avert_R = avertSeason?.filter((a) => a.type === 'R')


    const avert_01 = avertData?.filter((a) => matche_01?.some((m) => m === parseInt(a?.matche_id)))
    const avert_01_G = avert_01?.filter((a) => a.type === 'G')
    const avert_01_R = avert_01?.filter((a) => a.type === 'R')

    const avert_02 = avertData?.filter((a) => matche_02?.some((m) => m === parseInt(a?.matche_id)))
    const avert_02_G = avert_02?.filter((a) => a.type === 'G')
    const avert_02_R = avert_02?.filter((a) => a.type === 'R')

    const avert_03 = avertData?.filter((a) => matche_03?.some((m) => m === parseInt(a?.matche_id)))
    const avert_03_G = avert_03?.filter((a) => a.type === 'G')
    const avert_03_R = avert_03?.filter((a) => a.type === 'R')

    const avert_04 = avertData?.filter((a) => matche_04?.some((m) => m === parseInt(a?.matche_id)))
    const avert_04_G = avert_04?.filter((a) => a.type === 'G')
    const avert_04_R = avert_04?.filter((a) => a.type === 'R')

    const avert_05 = avertData?.filter((a) => matche_05?.some((m) => m === parseInt(a?.matche_id)))
    const avert_05_G = avert_05?.filter((a) => a.type === 'G')
    const avert_05_R = avert_05?.filter((a) => a.type === 'R')

    const avert_06 = avertData?.filter((a) => matche_06?.some((m) => m === parseInt(a?.matche_id)))
    const avert_06_G = avert_06?.filter((a) => a.type === 'G')
    const avert_06_R = avert_06?.filter((a) => a.type === 'R')

    const avert_07 = avertData?.filter((a) => matche_07?.some((m) => m === parseInt(a?.matche_id)))
    const avert_07_G = avert_07?.filter((a) => a.type === 'G')
    const avert_07_R = avert_07?.filter((a) => a.type === 'R')

    const minim = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 1)
    const cade = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 2)
    const jenior = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 3)
    const senior_1 = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 4)
    const senior_2 = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 5)
    const senior_3 = matcheSeason?.filter((m) => parseInt(m.categorie_id) === 6)

    const compBotola = matcheSeason?.filter((m) => parseInt(m.competition_id) === 1)
    const compKaas = matcheSeason?.filter((m) => parseInt(m.competition_id) === 2)

    const options_Line = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white', // Change x-axis label color
                    font: {
                        family: 'El Messiri',
                        size: 14,
                    }
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6C7293', // Change x-axis label color
                    callback: function (value) {
                        return value.toLocaleString(); // Format the value as needed
                    },
                    font: {
                        family: 'El Messiri',
                        size: 14,
                    }
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'المبـاريــــــــات',
                color: 'white',
                font: {
                    family: 'El Messiri',
                    size: 25,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        family: 'El Messiri',
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    };

    const data_Line = {
        labels: ['يوليوز', 'يونيو', 'ماي', 'ابريل', 'مارس', 'فبراير', 'يناير'],
        datasets: [
            {
                fill: true,
                label: 'عدد المباريات',
                data: [matche_07?.length, matche_06?.length, matche_05?.length, matche_04?.length, matche_03?.length, matche_02?.length, matche_01?.length],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const data_Pie = {
        labels: ['كأس العرش', 'البطولة'],
        datasets: [
            {
                label: 'عدد المباريات',
                data: [compKaas?.length, compBotola?.length],
                backgroundColor: [
                    '#ffb007',
                    '#bf0231',
                ],
                borderColor: [
                    '#c78802',
                    '#8c0124',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options_Pie = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'المنافسات',
                color: 'white',
                font: {
                    family: 'El Messiri',
                    size: 35,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        family: 'El Messiri',
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        }
    }

    const optionsBar = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white', // Change x-axis label color
                    font: {
                        family: 'El Messiri',
                        size: 14,
                    }
                },
            },
            y: {
                beginAtZero: true,
                precision: 0,
                ticks: {
                    color: '#6C7293',
                    font: {
                        family: 'El Messiri',
                        size: 14,
                    }
                },
            },
        },

        plugins: {
            title: {
                display: true,
                text: 'البطـاقـــــــــات',
                color: 'white',
                font: {
                    family: 'El Messiri',
                    size: 25,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        family: 'El Messiri',
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    }

    const dataBar = {
        labels: ['يوليوز', 'يونيو', 'ماي', 'ابريل', 'مارس', 'فبراير', 'يناير'],
        datasets: [
            {
                label: 'البطاقات الصفراء',
                data: [avert_07_G?.length, avert_06_G?.length, avert_05_G?.length, avert_04_G?.length, avert_03_G?.length, avert_02_G?.length, avert_01_G?.length],
                backgroundColor: '#ffb007',
                borderRadius: 3,
            },
            {
                label: 'البطاقات الحمراء',
                data: [avert_07_R?.length, avert_06_R?.length, avert_05_R?.length, avert_04_R?.length, avert_03_R?.length, avert_02_R?.length, avert_01_R?.length],
                backgroundColor: '#EB1616',
                borderRadius: 3,
            },
        ],
    };

    const dataPolarAria = {
        labels: ['الصغار', 'الفتيان', 'الشبان', 'الشرفي الثاني', 'الشرفي الأول', 'الشرفي الممتاز'],
        datasets: [
            {
                label: 'عدد المباريات',
                data: [minim?.length, cade?.length, jenior?.length, senior_1?.length, senior_2?.length, senior_3?.length],
                backgroundColor: [
                    '#d9e802',
                    '#e8ba02',
                    '#e86d02',
                    '#e83b02',
                    '#e31b05',
                    '#bd0808',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPolarAria = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'الفئــــــــات',
                color: 'white',
                font: {
                    family: 'El Messiri',
                    size: 35,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        family: 'El Messiri',
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    }

    const handelSelect = (e) => {
        setSeason(e.target.value)
        setLoading(true)
    }


    return (
        <>
            {/* <!-- Sale & Revenue Start --> */}

            < div class="container-fluid pt-4 px-4" ref={pageRef} id="myDIV">
                <select class="form-select text-center" aria-label="Default select example" onChange={handelSelect}>
                    <option value={parseInt(new Date().getFullYear())} selected >{new Date().getFullYear()}</option>
                    <option value={parseInt(new Date().getFullYear()) - 1} >{parseInt(new Date().getFullYear()) - 1}</option>
                    <option value={parseInt(new Date().getFullYear()) - 2} >{parseInt(new Date().getFullYear()) - 2}</option>
                    <option value={parseInt(new Date().getFullYear()) - 3} >{parseInt(new Date().getFullYear()) - 3}</option>
                </select>
                <div class="row">
                    {
                        loading ?
                            <div className="col-sm-6 col-xl-4 mt-4">
                                <div class="bg-secondary rounded p-4">
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                        <div className="row mx-2">
                                            <div className="col-3">
                                                <Skeleton height={70} />
                                            </div>
                                            <div className="col-9">
                                                <Skeleton height={33} />
                                                <Skeleton height={33} width={33} />
                                            </div>
                                        </div>

                                    </SkeletonTheme>
                                </div>
                            </div>
                            :
                            <div className="col-sm-6 col-xl-4 mt-4">
                                <div class="bg-secondary rounded d-flex align-items-center justify-content-around p-4">
                                    <img src={ImageYellow} style={{ height: '75px' }} alt="" />
                                    <div class="ms-lg-3">
                                        <p class="mb-2 fs-5 fw-bold">عدد البطاقات الصفراء</p>
                                        <h6 class="mb-0">{avert_G?.length}</h6>
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        loading ?
                            <div className="col-sm-6 col-xl-4 mt-4">
                                <div class="bg-secondary rounded p-4">
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                        <div className="row mx-2">
                                            <div className="col-3">
                                                <Skeleton height={70} />
                                            </div>
                                            <div className="col-9">
                                                <Skeleton height={33} />
                                                <Skeleton height={33} width={33} />
                                            </div>
                                        </div>

                                    </SkeletonTheme>
                                </div>
                            </div>
                            :
                            <div className="col-sm-6 col-xl-4 mt-4">
                                <div class="bg-secondary rounded d-flex align-items-center justify-content-around p-4">
                                    <img src={ImageRed} style={{ height: '75px' }} alt="" />
                                    <div class="ms-lg-3">
                                        <p class="mb-2 fs-5 text-center fw-bold">عدد البطاقات الحمراء</p>
                                        <h6 class="mb-0">{avert_R?.length}</h6>
                                    </div>
                                </div>
                            </div>}
                    {
                        loading ?

                            <div className="col-sm-6 col-md-12 col-xl-4 mt-4">
                                <div class="bg-secondary rounded p-4">
                                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                        <div className="row mx-2">
                                            <div className="col-3">
                                                <Skeleton height={70} />
                                            </div>
                                            <div className="col-9">
                                                <Skeleton height={33} />
                                                <Skeleton height={33} width={33} />
                                            </div>
                                        </div>

                                    </SkeletonTheme>
                                </div>
                            </div>
                            :
                            <div className="col-sm-6 col-xl-4 mt-4">
                                <div class="bg-secondary rounded d-flex align-items-center justify-content-around p-4">
                                    <img src={ImageMatche} style={{ height: '75px' }} alt="" />
                                    <div class="ms-lg-3">
                                        <p class="mb-2 fs-5 text-center fw-bold">عدد  المباريات</p>
                                        <h6 class="mb-0">{matcheSeason?.length}</h6>
                                    </div>
                                </div>
                            </div>}
                </div>
                <div class="row">
                    <div class="col-md-6 col-xl-6 mt-4"  >
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            {
                                loading ?
                                    <>
                                        <div className="d-none d-lg-block">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="">
                                                    <div className="mt-2 col-12 d-flex justify-content-center mb-3">
                                                        <Skeleton height={23} width={95} />
                                                    </div>
                                                </div>
                                                <div className="row d-flex justidy-content-center">
                                                    <div className="col-1 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                    <div className="col-1 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0 mt-2">
                                                        <Skeleton height={142} width={25} />
                                                    </div>
                                                    <div className="col-1">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-1 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0 mt-4">
                                                        <Skeleton height={126} width={25} />
                                                    </div>
                                                    <div className="col-1 mt-3">
                                                        <Skeleton height={134} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                    <div className="col-1 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-1 pe-0">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>

                                        {/* Skeleton Loading Mobile */}
                                        <div className="d-lg-none">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">

                                                <div className="mt-2 col-12 d-flex justify-content-center mb-3">
                                                    <Skeleton height={23} width={95} />
                                                </div>

                                                <div className="row col-12 d-flex justify-content-center me-1">
                                                    <div className="col-2 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-2 pe-0">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                    <div className="col-2 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                    <div className="col-2 pe-0 mt-2">
                                                        <Skeleton height={142} width={25} />
                                                    </div>
                                                    <div className="col-2">
                                                        <Skeleton height={150} width={25} />
                                                    </div>
                                                    <div className="col-2 pe-0 mt-5">
                                                        <Skeleton height={102} width={25} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={51} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={51} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={51} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={51} />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>
                                    </>

                                    :

                                    <Bar data={dataBar} options={optionsBar} height={237} />
                            }
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-6 mt-4" >
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            {
                                loading ?
                                    <>
                                        <div className="d-none d-lg-block">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2">
                                                        <Skeleton height={23} width={95} />
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-center mt-2 me-1">
                                                    <div className="col-3 mt-2 ">
                                                        <Skeleton height={23} width={85} />
                                                    </div>
                                                    <div className="col-3 mt-2">
                                                        <Skeleton height={23} width={85} />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <Skeleton height={107} width={450} />
                                                </div>
                                                <div className="row">
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                    <div className="mt-2 col-2">
                                                        <Skeleton height={20} width={54} />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>

                                        {/* Skeleton Loading Mobile */}
                                        <div className="d-lg-none">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="col-12 mt-2 d-flex justify-content-center">
                                                    <Skeleton height={23} width={95} />
                                                </div>

                                                <div className="d-flex justify-content-around mt-2">
                                                    <div className="col-4 mt-2 ">
                                                        <Skeleton height={23} width={85} />
                                                    </div>
                                                    <div className="col-4 mt-2">
                                                        <Skeleton height={23} width={85} />
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <Skeleton height={107} width="100%" />
                                                </div>
                                                <div className="row col-12 me-0">
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={43} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={43} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={43} />
                                                    </div>
                                                    <div className="mt-2 col-3">
                                                        <Skeleton height={20} width={43} />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>
                                    </>

                                    :

                                    <Line options={options_Line} data={data_Line} height={237} />
                            }
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-5 mt-4" >
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            {
                                loading ?
                                    <>
                                        <div className="d-none d-lg-block">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={33} width={150} />
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-around mt-3">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={23} width={100} />
                                                    </div>
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={23} width={100} />
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="d-flex justify-content-center">
                                                        <Skeleton height={343} width={343} circle />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>

                                        {/* Skeleton Loading Mobile */}
                                        <div className="d-lg-none">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={33} width={150} />
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-around mt-3">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={23} width={95} />
                                                    </div>
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={23} width={95} />
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="d-flex justify-content-center">
                                                        <Skeleton height={250} width={250} circle />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>
                                    </>
                                    :
                                    <Pie data={data_Pie} options={options_Pie} style={{ height: '450px' }} />
                            }
                        </div>

                        <div class="bg-secondary rounded d-flex align-items-center justify-content-around p-4 mt-4" style={{ fontFamily: 'Amiri Quran' }}>
                            <img src={ImageBalance} style={{ height: '42px' }} alt="" />
                            <div class="">
                                <p class="mb-0 text-white text-center fs-5">"وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ"</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-xl-7 mt-4" >
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            {
                                loading ?

                                    <>
                                        <div className="d-none d-lg-block">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={33} width={150} />
                                                    </div>
                                                </div>
                                                <div className="container ms-4 d-flex justify-content-center">
                                                    <div className="row d-flex justify-content-around mt-3">
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={100} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={100} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={100} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={100} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2 ">
                                                        <Skeleton height={23} width={120} />
                                                    </div>
                                                    <div className="col-3 mt-2">
                                                        <Skeleton height={23} width={120} />
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="d-flex justify-content-center">
                                                        <Skeleton height={422} width={422} circle />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>

                                        {/* Skeleton Loading Mobile */}
                                        <div className="d-lg-none">
                                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-3 mt-2 d-flex justify-content-center">
                                                        <Skeleton height={33} width={150} />
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-around">
                                                    <div className="row col-12 d-flex justify-content-between mt-3">
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={55} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={55} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={55} />
                                                        </div>
                                                        <div className="col-3 mt-2 d-flex justify-content-center">
                                                            <Skeleton height={23} width={55} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-5 mt-2 ">
                                                        <Skeleton height={23} width={100} />
                                                    </div>
                                                    <div className="col-5 mt-2">
                                                        <Skeleton height={23} width={100} />
                                                    </div>
                                                </div>
                                                <div className="row m-1">
                                                    <div className="d-flex justify-content-center">
                                                        <Skeleton height={250} width={250} circle />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                        </div>
                                    </>

                                    :

                                    <PolarArea data={dataPolarAria} options={optionsPolarAria} height={565} />
                            }
                        </div>
                    </div>
                </div>
                
                <div class="row">
                            <div className="col-sm-6 col-xl-4 mt-4" style={{ cursor : 'pointer'}}>
                                <a href="files/transport.pdf" download="المسافة بالكيلومتر بين المدن المنضوية تحت لواء عصبة سوس لكرة القدم 2016-2017">
                                <div class="download-file bg-secondary rounded d-flex align-items-center justify-content-around p-1 px-2">
                                    <img src={imgPdf} style={{ height: '75px' }} alt="" />
                                    <div class="download-file-text ms-lg-3 mt-2">
                                        <p class="mb-2 fs-5 fw-bold ">تعويضات التنقل</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            
                            <div className="col-sm-6 col-xl-4 mt-4" style={{ cursor : 'pointer'}}>
                                <a href="files/rapport.pdf" download="rapport du match format exploitable">
                                <div class="download-file bg-secondary rounded d-flex align-items-center justify-content-around p-2 px-2">
                                    <img src={imgWord} style={{ height: '67px' }} alt="" />
                                    <div class="download-file-text ms-lg-3 mt-2">
                                        <p class="mb-2 fs-5 fw-bold ">نمودج التقرير</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            
                            <div className="col-sm-6 col-xl-4 mt-4" style={{ cursor : 'pointer'}}>
                                <a href="files/reçu.pdf" download="توصيل">
                                <div class="download-file bg-secondary rounded d-flex align-items-center justify-content-around p-1 px-2">
                                    <img src={imgPdf} style={{ height: '75px' }} alt="" />
                                    <div class="download-file-text ms-lg-3 mt-2">
                                        <p class="mb-2 fs-5 fw-bold ">نمودج التوصيل</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            
                </div>
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-around p-2 bg-white mt-4" style={{ fontFamily: 'El Messiri', color:'red' }}>
                            <img src={Palestine} style={{ height: '45px' }} alt="" />
                            <div class="">
                                <p class="mb-0 text-center">" بلادهم عرضة للضّياع وأمّتهم عرضة للفنا "</p>
                            </div>
                        </div>
            </div >
            {/* <!-- Sale & Revenue End --> */}
            
        </>
    )
}
export default Home;