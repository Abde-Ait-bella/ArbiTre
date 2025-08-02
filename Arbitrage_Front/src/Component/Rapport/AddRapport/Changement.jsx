import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';


export function Changement(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [change, setChange] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const { user, club_1, club_2 } = AuthUser();

    // 1. Initialiser tous les états d'options comme des tableaux vides
    const [optionsJEntr, setOptionsJEntr] = useState([]);
    const [optionsJSort, setOptionsJSort] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, matcheRespose] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/matche'),
                ]);

                const dataJoueurs = joueurResponse.data.filter((j) => parseInt(j.user_id) === user?.id);

                const optionJoueursEntr = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_entr",
                }))
                const optionJoueursSort = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_sort",
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
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))

                setOptionsJEntr(optionJoueursEntr);
                setOptionsJSort(optionJoueursSort);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1, club_2]);


    //--------Sélection joueur entrant

    const createOptionJEntr = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_entr"
    });

    const [isLoadingJEntr, setIsLoadingJEntr] = useState(false);



    const handleCreateJEntr = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJEntr(true);

        // Créer la nouvelle option
        const newOption = createOptionJEntr(inputValue);

        // Important: créer la nouvelle liste d'options avant de mettre à jour l'état
        const updatedOptions = [...optionsJEntr, newOption];

        // Mettre à jour les options disponibles
        setOptionsJEntr(updatedOptions);

        // Mettre à jour le changement avec le nouveau nom
        const newChanges = [...change];
        newChanges[currentEditingIndex].joueur_nom_entr = newOption.value;

        // Stocker aussi la référence à l'option complète pour un affichage immédiat
        newChanges[currentEditingIndex]._activeOption = newOption;

        setChange(newChanges);
        setIsLoadingJEntr(false);
    };

    const handleChangeSelectJEntr = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_entr"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange);

        } else {
            const { name, value } = valeur;
            const newChnage = [...change];
            newChnage[index][name] = value
            setChange(newChnage)
        }
    }

    //--------Sélection du joueur sortant

    const createOptionJSort = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_sort"
    });

    const [isLoadingJSort, setIsLoadingJSort] = useState(false);
    const [valueJSort, setValueJSort] = useState();

    const handleCreateSort = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJSort(true);

        // Créer la nouvelle option
        const newOption = createOptionJSort(inputValue);

        // Ajouter l'option aux joueurs disponibles
        setOptionsJSort(prevOptions => [...prevOptions, newOption]);

        // Mettre à jour immédiatement le changement avec le nouveau nom
        const newChanges = [...change];
        newChanges[currentEditingIndex].joueur_nom_sort = newOption.value;
        setChange(newChanges);

        setIsLoadingJSort(false);
    };

    const handleChangeSelectJSort = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_sort"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)


        } else {
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        }
        setValueJSort(event)
    }

    const handleChangeSelect = (event, index) => {

        const { name, value } = event;
        const newChange = [...change];
        newChange[index][name] = value;
        newChange[index].matche_id = state.matchNamber;
        setChange(newChange)

    }

    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newChange = [...change];
        newChange[index][name] = value;
        setChange(newChange);
    }

    const addRow = () => {
        // Si c'est le premier élément vide ou si tous les champs nécessaires sont remplis
        if (change.length === 1 && Object.keys(change[0]).length === 0 || change.every(item => Object.keys(item).length === 7)) {
            setChange([...change, {}]);
            setError("");
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم");
        }
    };

    const SuppRow = (index) => {
        setError("");
        const newChnage = [...change];
        newChnage.splice(index, 1);
        setChange(newChnage);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        let numberOfAttributes;
        change.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 7) {
            setError("")
            props.dataChangement(change);
            setIsValide(prev => !prev);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

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
                                    <span>التغييــرات</span>
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
                                    {change.map((item, index) => (
                                        <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                            <div className="form-group col-md-3">
                                                <label>الفريق</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light' options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder={`${state?.clubs.length > 0 ? 'اكتب و اختر' : 'اختر الفرق أعلاه !!'}`} />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label>اسم الاعب الداخل</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingJEntr}
                                                        isLoading={isLoadingJEntr}
                                                        onChange={(event) => handleChangeSelectJEntr(event, index)}
                                                        onCreateOption={handleCreateJEntr}
                                                        options={optionsJEntr}
                                                        value={
                                                            change[index]?._activeOption ||
                                                            (change[index]?.joueur_nom_entr ?
                                                                optionsJEntr?.find((l) => l.value === change[index]?.joueur_nom_entr) :
                                                                null)
                                                        }
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label >رقم الاعب الداخل</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_num_entr' onChange={(event) => handleChangeInput(event, index)} className="my-2 bg-white form-control border-light" id="inputPassword4" />
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
                                                        onCreateOption={handleCreateSort}
                                                        options={optionsJSort}
                                                        value={change[index]?.joueur_nom_sort ? optionsJSort?.find((l) => l.value === change[index]?.joueur_nom_sort) : ""}
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label >رقم الاعب الخارج</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_num_sort' onChange={(event) => handleChangeInput(event, index)} className="my-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
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
                                        <button className={`btn me-3 my-2 px-4 fw-bold ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
        </>
    )
}
