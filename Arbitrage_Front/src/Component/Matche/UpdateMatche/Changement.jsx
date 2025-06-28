import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';
import '../../../style/Matche/updateMatche.scss'


export function Changement(props) {

    const [state, setState] = useState({
        joueursEntre: [],
        joueursSort: [],
        JoueursLicenceE: [],
        JoueursLicenceS: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [changeUpdate, setChangeUpdate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user, club_1_update, club_2_update } = AuthUser();

    const [isLoadingEntree, setIsLoadingEntree] = useState(false);
    const [isLoadingSortie, setIsLoadingSortie] = useState(false);
    const [isLoadingLicenceEntree, setIsLoadingLicenceEntree] = useState(false);
    const [isLoadingLicenceSortie, setIsLoadingLicenceSortie] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, changeResponse] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/changement'),
                ]);

                const dataJoueurs = joueurResponse.data.filter((j) => parseInt(j.user_id) === user?.id);

                const optionJoueursEntr = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_entr",
                    licence: item.joueur_numero_licence
                }))
                const optionJoueursSort = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_sort",
                    licence: item.joueur_numero_licence
                }))

                const optionJoueursLicenceE = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_entr"
                }))

                const optionJoueursLicenceS = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_sort"
                }))

                setOptionsLicenceE(optionJoueursLicenceE);
                setOptionsJEntr(optionJoueursEntr);
                setOptionsJSort(optionJoueursSort);
                setOptionsLicenceS(optionJoueursLicenceS);

                const dataClubs = clubResponse.data.filter((c) => parseInt(c.user_id) === user?.id || c.user_id === null && (parseInt(club_1_update) === c.id || parseInt(club_2_update) === c.id));
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + " " + item.abbr,
                    name: "club_id",
                }))

                setChangeUpdate([...changeResponse.data?.filter((ch) => parseInt(ch.matche_id) === parseInt(id))])

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueursEntre: optionJoueursEntr,
                    joueursSort: optionJoueursSort,
                    JoueursLicenceE: optionJoueursLicenceE,
                    JoueursLicenceS: optionJoueursLicenceS,
                }))

                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1_update, club_2_update]);

    //--------Sélection joueur entrant

    const createOptionJEntr = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_entr"
    });

    const [isLoadingJEntr, setIsLoadingJEntr] = useState(false);
    const [optionsJEntr, setOptionsJEntr] = useState();

    const handleCreateJEntr = (inputValue) => {
        setIsLoadingJEntr(true);
        setTimeout(() => {
            const newOption = createOptionJEntr(inputValue);
            setIsLoadingJEntr(false);
            setOptionsJEntr((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectJEntr = (event, index) => {
        if (event === null) {
            var valeur = {
                value: "",
                name: "joueur_nom_entr"
            }
        }
        const { name, value } = valeur ? valeur : event;
        const newChnageUpdate = [...changeUpdate];
        newChnageUpdate[index][name] = value;
        setChangeUpdate(newChnageUpdate);
    }

    /////////--------Sélection du joueur sortant

    const createOptionJSort = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_sort"
    });

    const [isLoadingJSort, setIsLoadingJSort] = useState(false);
    const [optionsJSort, setOptionsJSort] = useState();

    const handleCreateJSort = (inputValue) => {
        setIsLoadingJSort(true);
        setTimeout(() => {
            const newOption = createOptionJSort(inputValue);
            setIsLoadingJSort(false);
            setOptionsJSort((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectJSort = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_sort"
            }
        }
        const { name, value } = valeur;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange)
    }

    //-----Sélection licence de joueur entrant

    const createOptionLicenceE = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_entr"
    });


    const [isLoadingLicenceE, setIsLoadingLicenceE] = useState(false);
    const [optionsLicenceE, setOptionsLicenceE] = useState();

    const handleCreateLicenceE = (inputValue) => {
        setIsLoadingLicenceE(true);
        setTimeout(() => {
            const newOption = createOptionLicenceE(inputValue);
            setIsLoadingLicenceE(false);
            setOptionsLicenceE((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectLicenceE = (event, index) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_entr"
            };
        }
        const { name, value } = valeur;

        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange);

    };

    //-----Sélection licence de joueur sortant

    const createOptionLicenceS = (label) => ({
        label,
        value: label.toLowerCase(),
        name: "joueur_licence_sort"
    });


    const [isLoadingLicenceS, setIsLoadingLicenceS] = useState(false);
    const [optionsLicenceS, setOptionsLicenceS] = useState();


    const handleCreateLicenceS = (inputValue) => {
        setIsLoadingLicenceS(true);
        setTimeout(() => {
            const newOption = createOptionLicenceS(inputValue);
            setIsLoadingLicenceS(false);
            setOptionsLicenceS((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectLicenceS = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_sort"
            }
        }
        const { name, value } = valeur;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange)
    }

    const handleChangeSelect = (event, index) => {
        const { name, value } = event;
        const newChange = [...changeUpdate];
        newChange[index].matche_id = parseInt(id);
        newChange[index][name] = value;
        setChangeUpdate(newChange)
    }

    const handleChangeInput = (event, index) => {

        const { name, value } = event.target;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange);
    }


    const addRow = () => {
        let numberOfAttributes;
        changeUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes <= 9 || numberOfAttributes === 12 || numberOfAttributes == null) {
            setChangeUpdate([...changeUpdate, {}])
            setError("")
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    const SuppRow = (index) => {
        setError("");
        const newChange = [...changeUpdate];
        newChange.splice(index, 1);
        setChangeUpdate(newChange);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {

        let numberOfAttributes;
        changeUpdate.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 9 || numberOfAttributes === 12) {
            setError("")
            props.dataChangement(changeUpdate);
            setIsValide(prev => !prev);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    // 1. Ajoutez ces états pour suivre l'index d'édition actuel
    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

    const handleFocusField = (index) => {
        setCurrentEditingIndex(index);
    };

    // 2. Améliorez la fonction handleCreateEntree pour les joueurs entrants
    const handleCreateEntree = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingEntree(true);

        // Créer la nouvelle option
        const newOption = createOptionJEntr(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueursEntre.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            setState(prevState => ({
                ...prevState,
                joueursEntre: [...prevState.joueursEntre, newOption]
            }));
        }

        // Mettre à jour le changement avec le nouveau nom
        const newChangements = [...changeUpdate];
        newChangements[currentEditingIndex].joueur_nom_entr = newOption.value;
        setChangeUpdate(newChangements);

        setIsLoadingEntree(false);
    };

    // 3. Améliorez la fonction handleCreateSortie pour les joueurs sortants
    const handleCreateSortie = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingSortie(true);

        // Créer la nouvelle option
        const newOption = createOptionJSort(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueursSort.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            setState(prevState => ({
                ...prevState,
                joueursSort: [...prevState.joueursSort, newOption]
            }));
        }

        // Mettre à jour le changement avec le nouveau nom
        const newChangements = [...changeUpdate];
        newChangements[currentEditingIndex].joueur_nom_sort = newOption.value;
        setChangeUpdate(newChangements);

        setIsLoadingSortie(false);
    };

    // 4. Améliorez la fonction handleCreateLicenceEntree pour les licences des joueurs entrants
    const handleCreateLicenceEntree = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingLicenceEntree(true);

        // Créer la nouvelle option
        const newOption = createOptionLicenceE(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.JoueursLicenceE.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            setState(prevState => ({
                ...prevState,
                JoueursLicenceE: [...prevState.JoueursLicenceE, newOption]
            }));
        }

        // Mettre à jour le changement avec la nouvelle licence
        const newChangements = [...changeUpdate];
        newChangements[currentEditingIndex].joueur_licence_entr = newOption.value;
        setChangeUpdate(newChangements);

        setIsLoadingLicenceEntree(false);
    };

    // 5. Améliorez la fonction handleCreateLicenceSortie pour les licences des joueurs sortants
    const handleCreateLicenceSortie = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingLicenceSortie(true);

        // Créer la nouvelle option
        const newOption = createOptionLicenceS(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.JoueursLicenceS.some(
            option => option.value === newOption.value
        );

        if (!optionExists) {
            setState(prevState => ({
                ...prevState,
                JoueursLicenceS: [...prevState.JoueursLicenceS, newOption]
            }));
        }

        // Mettre à jour le changement avec la nouvelle licence
        const newChangements = [...changeUpdate];
        newChangements[currentEditingIndex].joueur_licence_sort = newOption.value;
        setChangeUpdate(newChangements);

        setIsLoadingLicenceSortie(false);
    };

    // 1. Ajouter un état pour contrôler l'ouverture/fermeture
    const [isOpen, setIsOpen] = useState(false); // Par défaut ouvert

    // 2. Ajouter une fonction pour basculer l'état
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
                                <div className="row mt-1">
                                    <Skeleton height={30} />
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>

                    :
                    <div className="row my-2 changement-update">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold d-flex justify-content-between align-items-center"
                                    onClick={toggleOpen}
                                    style={{ cursor: 'pointer' }}>
                                    <span>التغييــرات</span>
                                    <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                </div>
                                <div
                                    className="card-body overflow-hidden transition-max-height"
                                    style={{
                                        maxHeight: isOpen ? '5000px' : '0',
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                                        transformOrigin: 'top',
                                        // padding: isOpen ? '1.25rem' : '0' // Conserver une petite transition de padding
                                    }}
                                >
                                    {changeUpdate ?
                                        (
                                            <div>
                                                {changeUpdate?.map((item, index) =>
                                                    <div className="row  border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                                        <div className="form-group col-md-3">
                                                            <label>الفريق</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light' value={state?.clubs.find((c) => c.value === parseInt(item?.club_id))} options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label>اسم الاعب الداخل</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingEntree}
                                                                    isLoading={isLoadingEntree}
                                                                    onChange={(event) => handleChangeSelectJEntr(event, index)}
                                                                    onCreateOption={handleCreateEntree}  // Utiliser la nouvelle fonction
                                                                    options={state.joueursEntre}         // Utiliser state au lieu de optionsJEntr
                                                                    value={state?.joueursEntre.find((j) => (j.value === item?.joueur_nom_entr))}
                                                                    placeholder="أكتب او اختر"
                                                                    onFocus={() => handleFocusField(index)}  // Ajouter ceci
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم الاعب الداخل</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='joueur_num_entr' value={item?.joueur_num_entr} className="form-control bg-white border-light my-2" onChange={(event) => handleChangeInput(event, index)} id="inputPassword4" />

                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم رخصة الداخل</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingLicenceE}
                                                                    isLoading={isLoadingLicenceE}
                                                                    onChange={(event) => handleChangeSelectLicenceE(event, index)}
                                                                    onCreateOption={handleCreateLicenceEntree}  // Utiliser la nouvelle fonction
                                                                    options={state.JoueursLicenceE}             // Utiliser state au lieu de optionsLicenceE
                                                                    value={state?.JoueursLicenceE.find((j) => j.value === item?.joueur_licence_entr)}
                                                                    placeholder='أكتب واختر'
                                                                    onFocus={() => handleFocusField(index)}     // Ajouter l'événement onFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >اسم الاعب الخارج</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingJSort}
                                                                    isLoading={isLoadingJSort}
                                                                    onChange={(event) => handleChangeSelectJSort(event, index)}
                                                                    onCreateOption={handleCreateSortie}       // Utiliser la nouvelle fonction
                                                                    options={state.joueursSort}               // Utiliser state au lieu de optionsJSort
                                                                    value={state?.joueursSort.find((j) => (j.value === item?.joueur_nom_sort))}
                                                                    placeholder="أكتب او اختر"
                                                                    onFocus={() => handleFocusField(index)}   // Ajouter l'événement onFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم رخصة الخارج</label>
                                                            <div className='my-2'>
                                                                <CreatableSelect className='text-light'
                                                                    isClearable
                                                                    isDisabled={isLoadingLicenceS}
                                                                    isLoading={isLoadingLicenceS}
                                                                    onChange={(event) => handleChangeSelectLicenceS(event, index)}
                                                                    onCreateOption={handleCreateLicenceSortie}  // Utiliser la nouvelle fonction
                                                                    options={state.JoueursLicenceS}             // Utiliser state au lieu de optionsLicenceS
                                                                    value={state?.JoueursLicenceS.find((j) => j.value === item?.joueur_licence_sort)}
                                                                    placeholder='أكتب واختر'
                                                                    onFocus={() => handleFocusField(index)}     // Ajouter l'événement onFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم الاعب الخارج</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='joueur_num_sort' value={item?.joueur_num_sort} onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >الدقيقة</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='minute' value={item?.minute} onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark px-3 ms-1"></i></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                        :
                                        (<h1>...</h1>)
                                    }
                                    <div className='d-flex justify-content-center mt-3'>
                                        <div>
                                            <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus px-4"></i></button>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                                    </div>
                                    <div className='d-flex justify-content-right pt-2'>
                                        <button className={`btn me-3 my-2 px-4 fw-bold ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
