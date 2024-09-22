import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';
import '../../../style/Matche/updateMatche.scss';


export function Avert(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });


    const [avertUpdate, setAvertUpdate] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true)
    const { user, club_1_update, club_2_update } = AuthUser();
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, avertResponse] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/avertissement'),
                ]);

                const dataJoueurs = joueurResponse.data.filter((j) => parseInt(j.user_id) === user?.id);
                const optionJoueurs = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "nom",
                }))

                const optionJoueursLicence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence?.toUpperCase(),
                    name: "joueur_numero_licence"
                }))

                const dataClubs = clubResponse.data?.filter((c) => parseInt(c.user_id) === user?.id || c.user_id === null && (c.id === parseInt(club_1_update) || c.id === parseInt(club_2_update)));
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr,
                    name: "club_id",
                }))

                setAvertUpdate([...avertResponse.data.filter((a) => parseInt(a.matche_id) === parseInt(id))]);

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueurs: optionJoueurs,
                    joueursLicence: optionJoueursLicence,
                }))
                setOptionsJ(optionJoueurs)
                setOptionsLicence(optionJoueursLicence)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1_update, club_2_update]);



    //--------select nom joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();

    const handleCreate = (inputValue) => {
        setIsLoadingJ(true);
        setTimeout(() => {
            const newOption = createOptionJ(inputValue);
            setIsLoadingJ(false);
            setOptionsJ((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleAvertSelectChangeJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "nom"
            }
        }
        const { name, value } = valeur;
        const newAverts = [...avertUpdate];
        newAverts[index][name] = value;
        setAvertUpdate(newAverts);
    }


    const createOptionLicence = (label) => ({
        label: label.toUpperCase(),
        value: label.toUpperCase(),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        setIsLoadingLicence(true);
        setTimeout(() => {
            const newOption = createOptionLicence(inputValue);
            setIsLoadingLicence(false);
            setOptionsLicence((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleAvertSelectChangeLicence = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
            const { name, value } = valeur;
            const newAverts = [...avertUpdate];
            newAverts[index][name] = value;
            setAvertUpdate(newAverts);
        } else {
            const { name, value } = valeur;
            const newAverts = [...avertUpdate];
            newAverts[index][name] = value;
            setAvertUpdate(newAverts);
        }
    }


    const handleAvertSelectChange = (event, index) => {

        const { name, value } = event;
        const newAverts = [...avertUpdate];
        newAverts[index][name] = value;
        newAverts[index].matche_id = parseInt(id);
        setAvertUpdate(newAverts);
    }


    const handleAvertInputChange = (event, index) => {
        let TypeEvent = event.target;
        const type_update = TypeEvent.name === `type${index}` ? TypeEvent.value : '';

        if (type_update) {
            TypeEvent = {
                name: "type",
                value: event.target.value
            }
        }

        const { name, value } = TypeEvent;
        const newAverts = [...avertUpdate];
        newAverts[index][name] = value;
        setAvertUpdate(newAverts);
    }

    const addRow = () => {
        let numberOfAttributes;
        avertUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 8 || numberOfAttributes === 12 || numberOfAttributes == null) {
            setAvertUpdate([...avertUpdate, {}])
            setError("")
        }else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }

    };

    const SuppRow = (index) => {
        setError("");
        const newAverts = [...avertUpdate];
        newAverts.splice(index, 1);
        setAvertUpdate(newAverts);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        let numberOfAttributes;
        avertUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 8 || numberOfAttributes === 12) {
            setError("")
            props.dataAvert(avertUpdate);
            setIsValide(prev => !prev);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    return (
        <>
            {
                loading ?
                    <>
                        <div className='mt-4 mb-3 d-none d-lg-block'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
                                    <div className="col-4">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-1 d-flex align-items-center justify-content-center p-0">
                                        <div className="mt-2">
                                            <Skeleton height={20} width={20} circle={true} />
                                        </div>
                                    </div>
                                    <div className="col-1 d-flex align-items-center justify-content-center p-0">
                                        <div className="mt-2">
                                            <Skeleton height={20} width={20} circle={true} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4 mx-2">
                                    <div className="col-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>

                        <div className='mb-3 d-lg-none'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row mt-5 mx-1">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-3 mx-2">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex align-items-center justify-content-center p-0 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={20} width={20} circle={true} />
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex align-items-center justify-content-center p-0 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={20} width={20} circle={true} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>
                    :
                    <div className="row my-2 avert-update">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold">
                                    العقوبــات الانضباطيـة
                                </div>
                                <div class="card-body">
                                    {avertUpdate == [] ?
                                        (<h2>لاشيء</h2>)
                                        :
                                        (
                                            <div>
                                                {avertUpdate?.map((item, index) =>
                                                    <div className="row  border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                                        <div className="form-group col-md-4">
                                                            <label>الفريق</label>
                                                            <div className="my-2">
                                                                <CreatableSelect className='text-light' value={state?.clubs.find((s) => (s.value === parseInt(item?.club_id)))}
                                                                    options={state.clubs} onChange={(event) => handleAvertSelectChange(event, index)} placeholder="اكتب" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label>نوع العقوبة</label>
                                                            <div className="d-flex justify-content-center pt-3">
                                                                <div className="form-check mx-2">
                                                                    <input
                                                                        className="form-check-input bg-warning border-0"
                                                                        checked={item?.type === 'G'}
                                                                        type="radio"
                                                                        value="G"
                                                                        name={`type${index}`}
                                                                        onChange={(event) => handleAvertInputChange(event, index)}
                                                                        id={`flexRadioDefault${index}`}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                                                        انذار
                                                                    </label>
                                                                </div>
                                                                <div className="form-check mx-2">
                                                                    <input
                                                                        className="form-check-input bg-danger border-0"
                                                                        checked={item.type === 'R'}
                                                                        type="radio"
                                                                        value="R"
                                                                        name={`type${index}`}
                                                                        onChange={(event) => handleAvertInputChange(event, index)}
                                                                        id={`flexRadioDefault2${index}`}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`flexRadioDefault2${index}`}>
                                                                        طرد
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label >اسم الاعب</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingJ}
                                                                    isLoading={isLoadingJ}
                                                                    onChange={(event) => handleAvertSelectChangeJ(event, index)}
                                                                    onCreateOption={handleCreate}
                                                                    options={optionsJ}
                                                                    value={state?.joueurs.find((j) => (j.value === item?.nom))}
                                                                    placeholder="أكتب او اختر"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >رقم الاعب</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='joueur_numero' value={item?.joueur_numero} className="form-control bg-white border-light my-2" onChange={(event) => handleAvertInputChange(event, index)} id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم الرخصة</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingLicence}
                                                                    isLoading={isLoadingLicence}
                                                                    onChange={(event) => handleAvertSelectChangeLicence(event, index)}
                                                                    onCreateOption={handleCreateLicence}
                                                                    options={optionsLicence}
                                                                    value={state?.joueursLicence.find((j) => j.value === item?.joueur_numero_licence)}
                                                                    placeholder='أكتب واختر'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-7">
                                                            <label >سبب الانذار</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='cause' value={item?.cause} onChange={(event) => handleAvertInputChange(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >الدقيقة</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='minute' value={item?.minute} onChange={(event) => handleAvertInputChange(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark mt-1 px-3"></i></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    <div className='d-flex justify-content-center mt-3'>
                                        <div>
                                            <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus mt-1 px-4"></i></button>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                                    </div>
                                    <div className='d-flex justify-content-right pt-2'>
                                        <button className={`btn px-4 fw-bold ${isValide ? 'bg-warning text-danger' : 'bg-secondary text-white'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
