import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';
import '../../../style/Matche/updateMatche.scss'


export function Buts(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });


    const [butUpdate, setButUpdate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user, club_1_update, club_2_update } = AuthUser();
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, butsResponse] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/but'),
                ]);

                const dataJoueurs = joueurResponse.data.filter((j) => parseInt(j.user_id) === user?.id);
                const optionJoueurs = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom",
                    licence: item.joueur_numero_licence,
                }))
                const optionJoueursLicence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                        label: item.joueur_numero_licence?.toUpperCase(),
                    name: "joueur_numero_licence"
                }))

                const hasClubs = !!club_1_update || !!club_2_update;

                const dataClubs = hasClubs ? [club_1_update, club_2_update] : clubResponse.data?.filter((c) => {
                    const isMine = parseInt(c.user_id) === user?.id || c.user_id === null;
                    return isMine;
                });
                
                const optionClubs = dataClubs?.map(item => ({
                    value: (item.value ? item.value : item.id),
                    label:  (item.label ? item.label : item.nom) + (item?.abbr ?  "(" + item?.abbr + ")" : '') ,
                    name: "club_id",
                }))

                setButUpdate([...butsResponse.data?.filter((b) => parseInt(b.matche_id) === parseInt(id))]);
                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueurs: optionJoueurs,
                    licences: optionJoueursLicence
                }))
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1_update, club_2_update]);


    //--------Sélection joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label, // <-- garder la casse originale
        name: "joueur_nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);

    const handleCreateJ = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJ(true);

        const newOption = createOptionJ(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueurs.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            setState(prevState => ({
                ...prevState,
                joueurs: [...prevState.joueurs, newOption]
            }));
        }

        // Mettre à jour avec la nouvelle valeur
        const newButs = [...butUpdate];
        newButs[currentEditingIndex].joueur_nom = newOption.value;
        setButUpdate(newButs);

        setIsLoadingJ(false);
    };

    const handleChangeSelectJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom"
            }
        }
        const { name, value } = valeur;
        const newBut = [...butUpdate];
        newBut[index][name] = value;
        setButUpdate(newBut);
    }


    //-----Sélection licence de joueur entrant

    const createOptionLicence = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingLicence(true);

        // Créer la nouvelle option
        const newOption = createOptionLicence(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.licences.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            // Mettre à jour uniquement si l'option n'existe pas déjà
            setState(prevState => ({
                ...prevState,
                licences: [...prevState.licences, newOption]
            }));
        }

        // Mettre à jour le but avec la nouvelle licence
        const newButs = [...butUpdate];
        newButs[currentEditingIndex].joueur_numero_licence = newOption.value;
        setButUpdate(newButs);

        setIsLoadingLicence(false);
    };

    const handleChangeSelectLicence = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
        }
        const { name, value } = valeur;
        const newBut = [...butUpdate];
        newBut[index][name] = value;
        setButUpdate(newBut);
    }


    const handleChangeSelect = (event, index) => {

        const { name, value } = event;
        const newBut = [...butUpdate];
        newBut[index][name] = value;
        newBut[index].matche_id = parseInt(id);
        setButUpdate(newBut);
    }

    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newBut = [...butUpdate];
        newBut[index][name] = value;
        setButUpdate(newBut);
    }


    const addRow = () => {
        let numberOfAttributes;
        butUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes <= 5 || numberOfAttributes === 9 || numberOfAttributes == null) {
            setError("")
            setButUpdate([...butUpdate, {},]);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    const SuppRow = (index) => {
        setError("")
        const newBut = [...butUpdate];
        newBut.splice(index, 1);
        setButUpdate(newBut);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        let numberOfAttributes;
        butUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        console.log(numberOfAttributes);
        if (numberOfAttributes <= 5 || numberOfAttributes === 8) {
            setError("")
            props.dataButs(butUpdate);
            setIsValide(prev => !prev)
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }

    };

    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

    const handleFocusField = (index) => {
        setCurrentEditingIndex(index);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            {
                loading ?
                    <>
                        <div className='mb-4 d-none d-lg-block'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row">
                                    <Skeleton height={40} />
                                </div>
                                <div className="mt-1 row">
                                    <Skeleton height={30} />
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>

                    :
                    <div className="my-2 row but-update">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold d-flex justify-content-between align-items-center"
                                    onClick={toggleOpen}
                                    style={{ cursor: 'pointer' }}>
                                    <span>الأهـــــداف</span>
                                    <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </div>
                                <div
                                    className="overflow-hidden card-body transition-max-height"
                                    style={{
                                        maxHeight: isOpen ? '5000px' : '0',
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                                        transformOrigin: 'top',
                                    }}
                                >
                                    {butUpdate?.map((item, index) => (
                                        <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                            <div className="form-group col-md-4">
                                                <label>الفريق</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light' options={state.clubs} value={state?.clubs.find((s) => s.value === parseInt(item?.club_id))} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>اسم الاعب</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingJ}
                                                        isLoading={isLoadingJ}
                                                        onChange={(event) => handleChangeSelectJ(event, index)}
                                                        onCreateOption={handleCreateJ}
                                                        options={state.joueurs}
                                                        value={state?.joueurs.find((j) => j.value === item?.joueur_nom)}
                                                        placeholder="أكتب او اختر"
                                                        onFocus={() => handleFocusField(index)} // <-- AJOUTE CETTE LIGNE
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >رقم الاعب</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_numero' value={item?.joueur_numero} onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' value={item?.minute} onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark px-3 ms-1"></i></button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='mt-3 d-flex justify-content-center'>
                                        <div>
                                            <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus px-4"></i></button>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                                    </div>
                                    <div className='pt-2 d-flex justify-content-right'>
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
