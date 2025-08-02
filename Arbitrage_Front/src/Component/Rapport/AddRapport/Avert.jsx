import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';





export function Avert(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
        villes: []
    });

    const [avert, setAvert] = useState([{}]);
    const { user, club_1, club_2 } = AuthUser();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, matcheRespose] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/matche'),
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

                const hasClubs = !!club_1 || !!club_2;
                const dataClubs = [club_1, club_2]

                var optionClubs = hasClubs ? dataClubs?.map(item => ({
                    value: item?.value,
                    label: item?.label,
                    name: "club_id",
                })) : [];


                const dataMatch = matcheRespose.data;
                if (!dataMatch || dataMatch.length === 0) {
                    var matchNamber = [0]
                } else (
                    matchNamber = dataMatch.map(item => item.id)
                )

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueurs: optionJoueurs,
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))
                setOptionsLicence(optionJoueursLicence)
                setOptionsJ(optionJoueurs)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1, club_2]);

    //--------select nom joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();

    const handleCreate = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJ(true);

        // Créer la nouvelle option
        const newOption = createOptionJ(inputValue);

        // Ajouter l'option sans vérification - permet les doublons
        setState(prevState => ({
            ...prevState,
            joueurs: [...prevState.joueurs, newOption]
        }));
        setOptionsJ(prevOptions => [...prevOptions, newOption]);

        // Mettre à jour l'avertissement avec le nouveau nom
        const newAverts = [...avert];
        newAverts[currentEditingIndex].nom = newOption.value;
        setAvert(newAverts);

        setIsLoadingJ(false);
    };

    const handleAvertSelectChangeJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "nom"
            }
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);


        } else {
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        }
    }

    //-----select licence de joueur

    const createOptionLicence = (label) => ({
        label: label.toUpperCase(),
        value: label.toUpperCase(),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingLicence(true);

        // Créer la nouvelle option
        const newOption = createOptionLicence(inputValue);

        // Ajouter l'option sans vérification - permet les doublons
        setOptionsLicence(prevOptions => [...prevOptions, newOption]);

        // Mettre à jour l'avertissement avec la nouvelle licence
        const newAverts = [...avert];
        newAverts[currentEditingIndex].joueur_numero_licence = newOption.value;
        setAvert(newAverts);

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
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        } else {
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        }
    }


    const handleAvertSelectChange = (event, index) => {

        const { name, value } = event;
        const newAverts = [...avert];
        newAverts[index][name] = value;
        newAverts[index].matche_id = state.matchNamber;
        setAvert(newAverts);

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
        const newAverts = [...avert];
        newAverts[index][name] = value;
        setAvert(newAverts);
    }


    const addRow = () => {
        let numberOfAttributes;
        avert.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 8 || numberOfAttributes == null) {
            setAvert([...avert, {}])
            setError("")
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    const SuppRow = (index) => {
        setError("")
        const newAverts = [...avert];
        newAverts.splice(index, 1);
        setAvert(newAverts);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        let numberOfAttributes;
        avert.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 8) {
            setError("")
            props.dataAvert(avert);
            setIsValide(prev => !prev);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    // Ajouter l'état et la fonction
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

    const handleFocusField = (index) => {
        setCurrentEditingIndex(index);
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
                    <div className="my-2 row">
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
                                    {avert?.map((item, index) =>
                                    (
                                        <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                            <div className="form-group col-md-4">
                                                <label>الفريق</label>
                                                <div className="my-2">
                                                    {console.log(state.clubs)}
                                                    <CreatableSelect className='text-light' options={state?.clubs} onChange={(event) => handleAvertSelectChange(event, index)} placeholder={`${state.clubs.length > 0 ? 'اكتب و اختر' : 'اختر الفرق أعلاه !!'}`} required />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>نوع العقوبة</label>
                                                <div className="pt-3 d-flex justify-content-center">
                                                    <div class="form-check mx-2">
                                                        <input class="form-check-input bg-warning border-0" type="radio" value="G" name={`type${index}`} onChange={(event) => handleAvertInputChange(event, index)} id={`flexRadioDefault1${index}`} />
                                                        <label class="form-check-label" for={`flexRadioDefault1${index}`}>
                                                            انذار
                                                        </label>
                                                    </div>
                                                    <div class="form-check mx-2">
                                                        <input class="form-check-input bg-danger border-0" type="radio" value="R" name={`type${index}`} onChange={(event) => handleAvertInputChange(event, index)} id={`flexRadioDefault2${index}`} />
                                                        <label class="form-check-label" for={`flexRadioDefault2${index}`}>
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
                                                        value={avert[index]?.nom ? optionsJ?.find((j) => j.value === avert[index]?.nom) : ""}
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >رقم الاعب</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_numero' className="my-2 bg-white form-control border-light" onChange={(event) => handleAvertInputChange(event, index)} id="inputPassword4" />
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
                                                        value={avert[index]?.joueur_numero_licence ? optionsLicence?.find((l) => l.value === avert[index]?.joueur_numero_licence) : ""}
                                                        placeholder='أكتب و اختر'
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-7">
                                                <label >سبب الانذار</label>
                                                <div className='my-2'>
                                                    <input type="text" name='cause' onChange={(event) => handleAvertInputChange(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' onChange={(event) => handleAvertInputChange(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className='mt-2'>
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
                                        <button className={`btn me-3 my-2 px-4 fw-bold ${isValide ? 'bg-warning text-danger' : 'bg-secondary text-white'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
