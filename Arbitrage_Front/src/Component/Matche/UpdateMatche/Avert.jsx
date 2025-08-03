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

                const hasClubs = !!club_1_update || !!club_2_update;

                const dataClubs = hasClubs ? [club_1_update, club_2_update] : clubResponse.data?.filter((c) => {
                    const isMine = parseInt(c.user_id) === user?.id || c.user_id === null;
                    return isMine;
                });

                const optionClubs = dataClubs?.map(item => ({
                    value: (item.value ? item.value : item.id),
                    label: (item.label ? item.label : item.nom) + (item?.abbr ? "(" + item?.abbr + ")" : ''),
                    name: "club_id",
                }))


                setAvertUpdate([...avertResponse.data.filter((a) => parseInt(a.matche_id) === parseInt(id))]);

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueurs: optionJoueurs,
                    joueursLicence: optionJoueursLicence,
                }))
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

    const handleCreate = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJ(true);

        // Créer la nouvelle option
        const newOption = createOptionJ(inputValue);

        // IMPORTANT: Vérifier si l'option existe déjà avant de l'ajouter
        const optionExists = state.joueurs.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            // Mettre à jour state.joueurs uniquement si l'option n'existe pas
            setState(prevState => ({
                ...prevState,
                joueurs: [...prevState.joueurs, newOption]
            }));
        }

        // Mettre à jour l'avertissement avec le nouveau nom
        const newAverts = [...avertUpdate];
        newAverts[currentEditingIndex].nom = newOption.value;
        setAvertUpdate(newAverts);

        setIsLoadingJ(false);
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


    const [isLoadingLicence, setIsLoadingLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingLicence(true);

        const newOption = createOptionLicence(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueursLicence.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            // Mettre à jour uniquement si l'option n'existe pas déjà
            setState(prevState => ({
                ...prevState,
                joueursLicence: [...prevState.joueursLicence, newOption]
            }));
        }

        // Mettre à jour l'avertissement avec la nouvelle licence
        const newAverts = [...avertUpdate];
        newAverts[currentEditingIndex].joueur_numero_licence = newOption.value;
        setAvertUpdate(newAverts);

        setIsLoadingLicence(false);
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
        if (numberOfAttributes <= 8 || numberOfAttributes === 12 || numberOfAttributes == null) {
            setAvertUpdate([...avertUpdate, {}])
            setError("")
        } else {
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
        if (numberOfAttributes <= 9 || numberOfAttributes <= 13) {
            setError("")
            props.dataAvert(avertUpdate);
            setIsValide(prev => !prev);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    // 1. Ajoutez un state pour suivre l'index actuel de l'avertissement en cours d'édition
    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

    // 3. Ajoutez un gestionnaire pour suivre quel champ est en cours d'édition
    const handleFocusField = (index) => {
        setCurrentEditingIndex(index);
    };

    // Ajouter cet état pour contrôler l'ouverture/fermeture 
    const [isOpen, setIsOpen] = useState(false); // Par défaut ouvert

    // Ajouter cette fonction pour basculer l'état
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
                    <div className="my-2 row avert-update">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold d-flex justify-content-between align-items-center"
                                    onClick={toggleOpen}
                                    style={{ cursor: 'pointer' }}>
                                    <span>العقوبــات الانضباطيـة</span>
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
                                    {avertUpdate == [] ?
                                        (<h2>لاشيء</h2>)
                                        :
                                        (
                                            <div>
                                                {avertUpdate?.map((item, index) =>
                                                    <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                                        <div className="form-group col-md-4">
                                                            <label>الفريق</label>
                                                            <div className="my-2">
                                                                <CreatableSelect className='text-light' value={state?.clubs.find((s) => (s.value === parseInt(item?.club_id)))}
                                                                    options={state.clubs} onChange={(event) => handleAvertSelectChange(event, index)} placeholder="اكتب" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label>نوع العقوبة</label>
                                                            <div className="pt-3 d-flex justify-content-center">
                                                                <div className="mx-2 form-check">
                                                                    <input
                                                                        className="border-0 form-check-input bg-warning"
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
                                                                <div className="mx-2 form-check">
                                                                    <input
                                                                        className="border-0 form-check-input bg-danger"
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
                                                                    options={state.joueurs}
                                                                    value={state?.joueurs.find((j) => (j.value === item?.nom))}
                                                                    placeholder="أكتب او اختر"
                                                                    onFocus={() => handleFocusField(index)} // Ajout de l'événement onFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >رقم الاعب</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='joueur_numero' value={item?.joueur_numero} className="my-2 bg-white form-control border-light" onChange={(event) => handleAvertInputChange(event, index)} id="inputPassword4" />
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
                                                                    options={state.joueursLicence}
                                                                    value={state?.joueursLicence.find((j) => j.value === item?.joueur_numero_licence)}
                                                                    placeholder='أكتب واختر'
                                                                    onFocus={() => handleFocusField(index)} // Ajout de l'événement onFocus manquant
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-7">
                                                            <label >سبب الانذار</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='cause' value={item?.cause} onChange={(event) => handleAvertInputChange(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >الدقيقة</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='minute' value={item?.minute} onChange={(event) => handleAvertInputChange(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark px-3 ms-1"></i></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
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
