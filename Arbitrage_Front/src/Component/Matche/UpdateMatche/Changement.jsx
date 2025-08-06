import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';
import '../../../style/Matche/updateMatche.scss'


export function Changement(props) {

    const [state, setState] = useState({
        joueursEntre: [],
        joueursSort: [],
        clubs: [],
    });

    const [changeUpdate, setChangeUpdate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user, club_1_update, club_2_update } = AuthUser();

    const [isLoadingEntree, setIsLoadingEntree] = useState(false);
    const [isLoadingSortie, setIsLoadingSortie] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, changeResponse] = await Promise.all([
                    axiosClinet.get('/joueur'),
                    axiosClinet.get('/club'),
                    axiosClinet.get('/changement'),
                ]);

                const dataJoueurs = joueurResponse.data.filter((j) => parseInt(j.user_id) == user?.id);

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

                setOptionsJEntr(optionJoueursEntr);
                setOptionsJSort(optionJoueursSort);

                const hasClubs = !!club_1_update || !!club_2_update;

                const dataClubs = hasClubs ? [club_1_update, club_2_update] : clubResponse.data?.filter((c) => {
                    const isMine = parseInt(c.user_id) == user?.id || c.user_id == null;
                    return isMine;
                });

                const optionClubs = dataClubs?.map(item => ({
                    value: (item.value ? item.value : item.id),
                    label: (item.label ? item.label : item.nom) + (item?.abbr ? "(" + item?.abbr + ")" : ''),
                    name: "club_id",
                }))

                setChangeUpdate([...changeResponse.data?.filter((ch) => parseInt(ch.matche_id) == parseInt(id))])

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueursEntre: optionJoueursEntr,
                    joueursSort: optionJoueursSort,
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
        if (event == null) {
            var valeur = {
                value: "",
                name: "joueur_nom_entr"
            }
        }
        const { name, value } = valeur ? valeur : event;
        const newChnageUpdate = [...changeUpdate];
        newChnageUpdate[index][name] = value;
        setChangeUpdate(newChnageUpdate);
        setIsValide(false);
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
        if (valeur == null) {
            valeur = {
                value: "",
                name: "joueur_nom_sort"
            }
        }
        const { name, value } = valeur;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange)
        setIsValide(false);
    }

    const handleChangeSelect = (event, index) => {
        const { name, value } = event;
        const newChange = [...changeUpdate];
        newChange[index].matche_id = parseInt(id);
        newChange[index][name] = value;
        setChangeUpdate(newChange)
        setIsValide(false);
    }

    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange);
        setIsValide(false);
    }


    const addRow = () => {
        // Champs obligatoires pour chaque changement
        const requiredFields = [
            "club_id",
            "joueur_nom_entr",
            "joueur_nom_sort",
            "joueur_num_entr",
            "joueur_num_sort",
            "minute",
            "matche_id"
        ];
        let hasError = false;
        for (let i = 0; i < changeUpdate.length; i++) {
            const change = changeUpdate[i];
            for (let field of requiredFields) {
                if (
                    change[field] === undefined ||
                    change[field] === null ||
                    change[field] === ""
                ) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) break;
        }
        if (hasError) {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        } else {
            setChangeUpdate([...changeUpdate, {}])
            setError("")
        }
        setIsValide(false);
    };

    const SuppRow = (index) => {
        setError("");
        const newChange = [...changeUpdate];
        newChange.splice(index, 1);
        setChangeUpdate(newChange);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {

        // Champs obligatoires pour chaque changement
        const requiredFields = [
            "club_id",
            "joueur_nom_entr",
            "joueur_nom_sort",
            "joueur_num_entr",
            "joueur_num_sort",
            "minute",
            "matche_id"
        ];
        let hasError = false;
        for (let i = 0; i < changeUpdate.length; i++) {
            const change = changeUpdate[i];
            for (let field of requiredFields) {
                if (
                    change[field] === undefined ||
                    change[field] === null ||
                    change[field] === ""
                ) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) break;
        }
        if (hasError) {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        } else {
            setError("");
            props.dataChangement(changeUpdate);
            setIsValide(prev => !prev);
        }
    };

    // 1. Ajoutez ces états pour suivre l'index d'édition actuel
    const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

    const handleFocusField = (index) => {
        setCurrentEditingIndex(index);
    };

    // 2. Améliorez la fonction handleCreateEntree pour les joueurs entrants
    const handleCreateEntree = (inputValue) => {
        if (currentEditingIndex == null) return;

        setIsLoadingEntree(true);

        // Créer la nouvelle option
        const newOption = createOptionJEntr(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueursEntre.some(
            option => option.value == newOption.value
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
        setIsValide(false);
    };

    // 3. Améliorez la fonction handleCreateSortie pour les joueurs sortants
    const handleCreateSortie = (inputValue) => {
        if (currentEditingIndex == null) return;

        setIsLoadingSortie(true);

        // Créer la nouvelle option
        const newOption = createOptionJSort(inputValue);

        // Vérifier si l'option existe déjà
        const optionExists = state.joueursSort.some(
            option => option.value == newOption.value
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
        setIsValide(false);
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
                                <div className="mt-1 row">
                                    <Skeleton height={30} />
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>

                    :
                    <div className="my-2 row changement-update">
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
                                        // padding: isOpen ? '1.25rem' : '0' // Conserver une petite transition de padding
                                    }}
                                >
                                    {changeUpdate ?
                                        (
                                            <div>
                                                {changeUpdate?.map((item, index) =>
                                                    <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                                        <div className="form-group col-md-3">
                                                            <label>الفريق</label>
                                                            <div className='my-2'>
                                                                <Select isClearable className='text-light' value={state?.clubs.find((c) => c.value == parseInt(item?.club_id))} options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب" />
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
                                                                    value={state?.joueursEntre.find((j) => (j.value == item?.joueur_nom_entr))}
                                                                    placeholder="أكتب او اختر"
                                                                    onFocus={() => handleFocusField(index)}  // Ajouter ceci
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم الاعب الداخل</label>
                                                            <div className='my-2'>
                                                                <input type="number" name='joueur_num_entr' value={item?.joueur_num_entr} className="my-2 bg-white form-control border-light" onChange={(event) => handleChangeInput(event, index)} id="inputPassword4" />

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
                                                                    value={state?.joueursSort.find((j) => (j.value == item?.joueur_nom_sort))}
                                                                    placeholder="أكتب او اختر"
                                                                    onFocus={() => handleFocusField(index)}   // Ajouter l'événement onFocus
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label >رقم الاعب الخارج</label>
                                                            <div className='my-2'>
                                                                <input type="number" name='joueur_num_sort' value={item?.joueur_num_sort} onChange={(event) => handleChangeInput(event, index)} className="my-2 bg-white form-control border-light" id="inputPassword4" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            <label >الدقيقة</label>
                                                            <div className='my-2'>
                                                                <input type="text" name='minute' value={item?.minute} onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
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
                    </div>
            }
        </>
    )
}
