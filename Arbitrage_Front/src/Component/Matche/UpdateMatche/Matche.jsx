import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { axiosClinet } from '../../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../../AuthContext';
import CreatableSelect from 'react-select/creatable';

export function Matche(props) {

    const [state, setState] = useState({
        centre: [],
        arbitre_a1_id: [],
        arbitre_a2_id: [],
        delegue: [],
        clubs: [],
        clubs_1: [],
        clubs_2: [],
        stades: [],
        villes: [],
        competition: [],
        saison: [],
        category: [],
        avert: [
            { id: 1, value: "G", label: 'انذار' },
            { id: 2, value: "R", label: 'طرد' },
        ],
        joueurs: [],
        joueursLicence: [],
        centre_ville: [],
        assistant_1_ville: [],
        assistant_2_ville: [],
        delegue_ville: [],
        dernierIdMatche: [],
        matches: [],
        arbitre_4_id: [],
        arbitre_4_ville: [],
        ville_manuelle: null
    });

    const [matcheUpdate, setMatcheUpdate] = useState();
    const [isLoadingArbitre, setIsLoadingArbitre] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = AuthUser();
    const { id } = useParams();
    const { club_1_Option_update, club_2_Option_update } = AuthUser();
    const [error, setError] = useState("");
    // Ajout des états pour la création
    const [isLoadingClub, setIsLoadingClub] = useState(false);
    const [isLoadingStade, setIsLoadingStade] = useState(false);
    const [isLoadingVille, setIsLoadingVille] = useState(false);
    const [isLoadingDelegue, setIsLoadingDelegue] = useState(false);
    const [currentEditingField, setCurrentEditingField] = useState(null);
    // Fonction pour créer un club localement
    const handleCreateClub = (inputValue) => {
        if (!currentEditingField) return;
        setIsLoadingClub(true);
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(),
            name: currentEditingField
        };


        if (currentEditingField === 'club_id_1') {
            setState(prevState => ({
                ...prevState,
                clubs_1: [...prevState.clubs_1, { ...newOption, name: 'club_id_1' }]
            }));
            club_1_Option_update(newOption);
        } else if (currentEditingField === 'club_id_2') {
            setState(prevState => ({
                ...prevState,
                clubs_2: [...prevState.clubs_2, { ...newOption, name: 'club_id_2' }]
            }));
            club_2_Option_update(newOption);
        }
        setMatcheUpdate(prevValues => ({
            ...prevValues,
            [currentEditingField]: inputValue
        }));
        setIsLoadingClub(false);
    };

    // Fonction pour créer une ville localement
    const handleCreateVille = (inputValue, fieldName) => {
        setIsLoadingVille(true);
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(),
            name: fieldName
        };

        if (fieldName === 'ville_id') {
            setState(prev => ({
                ...prev,
                villes: [...(prev.villes || []), newOption],
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [fieldName]: [...prevState.villes, newOption]
            }));
        }

        setMatcheUpdate(prevValues => ({
            ...prevValues,
            [fieldName]: inputValue
        }));
        setIsLoadingVille(false);
    };

    const handleCreateArbitre = (inputValue) => {
        if (!currentEditingField) return;

        setIsLoadingArbitre(true);

        // Créer la nouvelle option avec le nom complet comme value
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(), // Utiliser le nom complet comme value
            name: currentEditingField
        };


        // Ajouter aux options pour l'affichage
        if (currentEditingField === 'arbitre_c_id') {
            setState(prevState => ({
                ...prevState,
                centre: [...prevState.centre, { ...newOption, name: 'arbitre_c_id' }]
            }));
        }
        else if (currentEditingField === 'arbitre_a1_id') {
            setState(prevState => ({
                ...prevState,
                arbitre_a1_id: [...prevState.arbitre_a1_id, { ...newOption, name: 'arbitre_a1_id' }]
            }));
        }
        else if (currentEditingField === 'arbitre_a2_id') {
            setState(prevState => ({
                ...prevState,
                arbitre_a2_id: [...prevState.arbitre_a2_id, { ...newOption, name: 'arbitre_a2_id' }]
            }));
        }
        else if (currentEditingField === 'arbitre_4_id') {
            setState(prevState => ({
                ...prevState,
                arbitre_4_id: [...prevState.arbitre_4_id, { ...newOption, name: 'arbitre_4_id' }]
            }));
        }

        // Sélectionner automatiquement avec le nom complet
        setMatcheUpdate(prevValues => ({
            ...prevValues,
            [currentEditingField]: inputValue // Envoyer le nom complet
        }));

        setIsLoadingArbitre(false);
        setError("");


    };

    const handleDelegueSelectChange = (event) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: "delegue_id"
            };
        }

        const { name, value } = valeur;
        setMatcheUpdate(prevValues => ({
            ...prevValues,
            delegue_id: value
        }));

        if (value) {
            handleSelectChange({ ...valeur, name: "delegue_id" });
        }
    };

    const handleCreateDelegue = (inputValue) => {
        if (!currentEditingField) return;

        setIsLoadingDelegue(true);

        // Créer la nouvelle option avec le nom complet comme value
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(), // Utiliser le nom complet comme value
            name: "delegue_id"
        };

        setState(prevState => ({
            ...prevState,
            delegue: [...prevState.delegue, newOption]
        }));

        // Sélectionner automatiquement avec le nom complet
        setMatcheUpdate(prevValues => ({
            ...prevValues,
            delegue_id: inputValue // Envoyer le nom complet
        }));

        setIsLoadingDelegue(false);
        setError("");
    };

    const handleArbitreSelectChange = (event, fieldName) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: fieldName
            };
        }

        const { name, value } = valeur;
        setMatcheUpdate(prevValues => ({
            ...prevValues,
            [fieldName]: value
        }));

        // Appeler aussi handleSelectChange pour les autres logiques si nécessaire
        if (value) {
            handleSelectChange({ ...valeur, name: fieldName });
        }
    };

    // Fonction pour créer un stade localement

    const handleCreateStade = (inputValue) => {
        setIsLoadingStade(true);
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(),
            name: "stade_id"
        };
        setState(prevState => ({
            ...prevState,
            stades: [...prevState.stades, newOption]
        }));

        setMatcheUpdate(prevValues => ({
            ...prevValues,
            stade_id: inputValue
        }));

        setIsLoadingStade(false);
    };

    // Pour focus sur le champ en cours d'édition
    const handleFocusField = (fieldName) => {
        setCurrentEditingField(fieldName);
    };




    useEffect(() => {
        axiosClinet.get('/arbitre')
            .then((res) => {
                const arbitreUser = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);
                const transformedOption = arbitreUser.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_c_id"
                }))

                const centre = transformedOption.filter(item => item.type === 'centre')
                const assistant = transformedOption.filter(item => item.type === 'assistant')

                const arbirearbitre_a1_id = assistant.map(item => ({
                    value: item.value,
                    label: item.label,
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_a1_id"
                }))
                const arbirearbitre_a2_id = assistant.map(item => ({
                    value: item.value,
                    label: item.label,
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_a2_id"
                }))

                const optionArbire_4 = arbitreUser.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_4_id"
                }))

                setState(prevData => ({
                    ...prevData,
                    centre: centre,
                    arbitre_a1_id: arbirearbitre_a1_id,
                    arbitre_a2_id: arbirearbitre_a2_id,
                    arbitre_4_id: optionArbire_4,
                }))
            })
        axiosClinet.get('/delegue')
            .then((res) => {
                const delegueUser = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);
                const optionDelegue = delegueUser.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    ville: item.ville,
                    name: "delegue_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    delegue: optionDelegue
                }))
            })
        axiosClinet.get('/club')
            .then((res) => {
                const clubUser = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);
                const optionClubs = clubUser.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club"
                }))
                const optionClubs_1 = clubUser.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club_id_1"
                }))
                const optionClubs_2 = clubUser.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club_id_2"
                }))
                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    clubs_1: optionClubs_1,
                    clubs_2: optionClubs_2
                }))
            })
        axiosClinet.get('/stade')
            .then((res) => {
                const dataStades = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);
                const optionStades = dataStades.map(item => ({
                    value: item.id,
                    label: item.nom,
                    ville: item.ville,
                    name: "stade_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    stades: optionStades
                }))
            })
        axiosClinet.get('/ville')
            .then((res) => {
                const dataVilles = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);
                const optionVilles = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "ville_id"
                }))
                const optionCentre_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "centre_ville"
                }))
                const optionassistant_1_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "assistant_1_ville"
                }))
                const optionassistant_2_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "assistant_2_ville"
                }))
                const optionarbitre_4_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "arbitre_4_ville"
                }))
                const optionDelegue_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "delegue_ville"
                }))

                setState(prevData => ({
                    ...prevData,
                    villes: optionVilles,
                    centre_ville: optionCentre_ville,
                    assistant_1_ville: optionassistant_1_ville,
                    assistant_2_ville: optionassistant_2_ville,
                    arbitre_4_ville: optionarbitre_4_ville,
                    delegue_ville: optionDelegue_ville
                }))
            })
        axiosClinet.get('/competition')
            .then((res) => {
                const dataCompetition = res.data
                const optionCompetition = dataCompetition.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "competition_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    competition: optionCompetition
                }))
            })
        axiosClinet.get('/saison')
            .then((res) => {
                const dataSaison = res.data
                const optionSaison = dataSaison.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "saison_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    saison: optionSaison
                }))
            })
        axiosClinet.get('/category')
            .then((res) => {
                const dataCategory = res.data
                const optionCategory = dataCategory.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "categorie_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    category: optionCategory
                }))
            })
        axiosClinet.get('/matche')
            .then((res) => {
                const matcheUser = res.data?.filter((c) => parseInt(c.user_id) === user?.id)
                const dernierId = Math.max(...matcheUser.map(match => match.id), 0);
                setMatcheUpdate({ ...matcheUser?.find((m) => m.id === parseInt(id)) });

                setState(prevData => ({
                    ...prevData,
                    dernierIdMatche: dernierId + 1,
                    matches: matcheUser
                }))
                setLoading(false)
            })
            .catch((error) => {
                console.error("Une erreur s'est produite lors de la récupération des données de Matches : " + error);
            })

        const club_1_update = state.clubs_1.find((c) => c.value === matcheUpdate?.club_id_1);
        const club_2_update = state.clubs_2.find((c) => c.value === matcheUpdate?.club_id_2);
        club_1_Option_update(club_1_update);
        club_2_Option_update(club_2_update);

    }, [])


    const handleInputChange = (event) => {

        const { name, value } = event.target;

        const newObject = { ...matcheUpdate };
        newObject[name] = value
        setMatcheUpdate(newObject)

    };

    const handleSelectChange = (event) => {

        const { name, value } = event;

        var stadeClub_1 = name === "club_id_1" ? event?.stade : parseInt(matcheUpdate?.stade_id);
        if (name === "club_id_1") {
            club_1_Option_update(event)
            stadeClub_1 = state.stades.find((s) => stadeClub_1?.id === parseInt(s.value))
        } else if (name === "stade_id") {
            stadeClub_1 = event
        } else if (name === "club_id_2") {
            club_2_Option_update(event)
        }
        var villeStade = state?.villes?.find((v) => parseInt(v.value) === parseInt(stadeClub_1?.ville?.id))

        var arbitreVille_4 = name === "arbitre_4_id" ? event.ville : matcheUpdate.arbitre_4_ville
        if (name === "arbitre_4_id") {
            arbitreVille_4 = state.villes.find((v) => arbitreVille_4?.id === v.value)
        } else if (name === "arbitre_4_ville") {
            arbitreVille_4 = event
        }

        var villearbitre_a1_id = name === "arbitre_a1_id" ? event.ville : matcheUpdate.assistant_1_ville
        if (name === "arbitre_a1_id") {
            villearbitre_a1_id = state.villes.find((v) => villearbitre_a1_id?.id === v.value)
        } else if (name === "assistant_1_ville") {
            villearbitre_a1_id = event
        }

        var villearbitre_a2_id = name === "arbitre_a2_id" ? event.ville : matcheUpdate.assistant_2_ville
        if (name === "arbitre_a2_id") {
            villearbitre_a2_id = state.villes.find((v) => villearbitre_a2_id?.id === v.value)
        } else if (name === "assistant_2_ville") {
            villearbitre_a2_id = event
        }

        var villeDelegue = name === "delegue_id" ? event.ville : matcheUpdate.delegue_ville
        if (name === "delegue_id") {
            villeDelegue = state.villes.find((v) => villeDelegue?.id === v.value)
        } else if (name === "delegue_ville") {
            villeDelegue = event
        }

        var villeCentre = name === "arbitre_c_id" ? event.ville : matcheUpdate.centre_ville
        if (name === "arbitre_c_id") {
            villeCentre = state.villes.find((v) => villeCentre?.id === v.value)
            console.log('salaaaaam');

        } else if (name === "centre_ville") {
            villeCentre = event
        }

        const newObject = { ...matcheUpdate };
        newObject[name] = value;
        newObject.stade_id = stadeClub_1?.value ? stadeClub_1?.value : stadeClub_1;
        newObject.ville_id = villeStade?.value ? villeStade?.value : villeStade;
        newObject.centre_ville = villeCentre?.value ? villeCentre?.value : villeCentre,
            newObject.assistant_1_ville = villearbitre_a1_id?.value ? villearbitre_a1_id?.value : villearbitre_a1_id,
            newObject.assistant_2_ville = villearbitre_a2_id?.value ? villearbitre_a2_id?.value : villearbitre_a2_id,
            newObject.arbitre_4_ville = arbitreVille_4?.value ? arbitreVille_4?.value : arbitreVille_4,
            newObject.delegue_ville = villeDelegue?.value ? villeDelegue?.value : villeDelegue,
            setMatcheUpdate(newObject);

    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataMatche(matcheUpdate);
        setIsValide((prev) => !prev);
    }

    return (
        <>
            {
                loading ?
                    <>
                        <div className='mb-4 d-none d-lg-block'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="mx-2 mt-4 row">
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-4 row">
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                </div>


                                <div className="mx-1 mt-4 row">
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3 ">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-4">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-4 row">
                                    <div className="col-4">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-4 row">
                                    <div className="col-12 ">
                                        <div>
                                            <Skeleton height={85} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>

                        <div className="d-lg-none">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="mx-2 mt-4 row">
                                    <div className="mt-3 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="mx-1 mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-4 row">
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="mt-4 col-12">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="mx-1 mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="pb-2 mx-2 mt-4 row">
                                    <div className="col-12 ">
                                        <div>
                                            <Skeleton height={85} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>
                    :
                    <div className='matche-update'>
                        <div className="mx-2 my-2 row">
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputEmail4">الموسم الرياضي</label>
                                <div className='my-2'>
                                    <Select isClearable className='text-center text-light' value={state.saison?.find((s) => s.value === parseInt(matcheUpdate?.saison_id))} onChange={handleSelectChange} options={state.saison} placeholder="أكتب..."
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">التاريخ</label>
                                <input type="date" name='date' value={matcheUpdate?.date} onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">المنافسة</label>
                                <div className='my-2'>
                                    <Select isClearable className='text-light' value={state.competition?.find((c) => parseInt(c.value) === parseInt(matcheUpdate?.competition_id))} onChange={handleSelectChange} options={state.competition} placeholder="أكتب..."
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                            <div className="text-white form-group col-md-3">
                                <label htmlFor="inputEmail4">الفئة</label>
                                <div className='my-2'>
                                    <Select className='text-light' value={state.category?.find((c) => c.value === parseInt(matcheUpdate?.categorie_id))} isClearable onChange={handleSelectChange} options={state.category} placeholder="أكتب..."
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="my-2 row">
                            <div className="col-md-12">
                                <div class=" card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        طاقم تحكيمي
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingArbitre}
                                                        isLoading={isLoadingArbitre}
                                                        options={state.centre}
                                                        value={state.centre?.find((c) => c.value === matcheUpdate?.arbitre_c_id)}
                                                        onChange={(event) => handleArbitreSelectChange(event, 'arbitre_c_id')}
                                                        onCreateOption={handleCreateArbitre}
                                                        onFocus={() => handleFocusField('arbitre_c_id')}
                                                        placeholder="اختر او أضف حكما"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 1</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingArbitre}
                                                        isLoading={isLoadingArbitre}
                                                        options={state.arbitre_a1_id}
                                                        value={state.arbitre_a1_id?.find((c) => c.value === matcheUpdate?.arbitre_a1_id)}
                                                        onChange={(event) => handleArbitreSelectChange(event, 'arbitre_a1_id')}
                                                        onCreateOption={handleCreateArbitre}
                                                        onFocus={() => handleFocusField('arbitre_a1_id')}
                                                        placeholder="اختر او أضف حكما"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 2</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingArbitre}
                                                        isLoading={isLoadingArbitre}
                                                        options={state.arbitre_a2_id}
                                                        value={state.arbitre_a2_id?.find((c) => c.value === matcheUpdate?.arbitre_a2_id)}
                                                        onChange={(event) => handleArbitreSelectChange(event, 'arbitre_a2_id')}
                                                        onCreateOption={handleCreateArbitre}
                                                        onFocus={() => handleFocusField('arbitre_a2_id')}
                                                        placeholder="اختر او أضف حكما"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المراقب</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingDelegue}
                                                        isLoading={isLoadingDelegue}
                                                        options={state.delegue}
                                                        value={matcheUpdate.delegue_id ? state.delegue.find(option => option.value === matcheUpdate.delegue_id) : null}
                                                        onChange={handleDelegueSelectChange}
                                                        onCreateOption={handleCreateDelegue}
                                                        onFocus={() => handleFocusField('delegue_id')}
                                                        placeholder="اختر او أضف مندوبا"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>

                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        value={matcheUpdate.centre_ville ? state.centre_ville?.find(s => s.value === matcheUpdate?.centre_ville || s.value === parseInt(matcheUpdate?.centre_ville)) : null}
                                                        options={state.centre_ville}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateVille(input, 'centre_ville')}
                                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        value={matcheUpdate.assistant_1_ville ? state.assistant_1_ville?.find(s => s.value === matcheUpdate?.assistant_1_ville || s.value === parseInt(matcheUpdate?.assistant_1_ville)) : null}
                                                        options={state.assistant_1_ville}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateVille(input, 'assistant_1_ville')}
                                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>

                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        value={matcheUpdate.assistant_2_ville ? state.assistant_2_ville?.find(s => s.value === matcheUpdate?.assistant_2_ville || s.value === parseInt(matcheUpdate?.assistant_2_ville)) : null}
                                                        options={state.assistant_2_ville}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateVille(input, 'assistant_2_ville')}
                                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        value={matcheUpdate.delegue_ville ? state.delegue_ville?.find(s => s.value === matcheUpdate?.delegue_ville || s.value === parseInt(matcheUpdate?.delegue_ville)) : null}
                                                        options={state.delegue_ville}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateVille(input, 'delegue_ville')}
                                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="form-group col-md-3 ">
                                                <label htmlFor="inputEmail4">الحكم الرابع</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingArbitre}
                                                        isLoading={isLoadingArbitre}
                                                        options={state.arbitre_4_id}
                                                        value={state.arbitre_4_id?.find((c) => c.value === matcheUpdate?.arbitre_4_id)}
                                                        onChange={(event) => handleArbitreSelectChange(event, 'arbitre_4_id')}
                                                        onCreateOption={handleCreateArbitre}
                                                        onFocus={() => handleFocusField('arbitre_4_id')}
                                                        placeholder="اختر او أضف حكما"
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        value={matcheUpdate.arbitre_4_ville ? state.arbitre_4_ville?.find(s => s.value === matcheUpdate?.arbitre_4_ville || s.value === parseInt(matcheUpdate?.arbitre_4_ville)) : null}
                                                        options={state.arbitre_4_ville}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateVille(input, 'arbitre_4_ville')}
                                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-2 row">
                            <div className="col-md-6">
                                <div class=" card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        المقابلة
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        isCreatable
                                                        className='text-light'
                                                        value={state.clubs_1?.find(c => c.value === matcheUpdate?.club_id_1 || c.value === parseInt(matcheUpdate?.club_id_1))}
                                                        options={state.clubs_1}
                                                        onChange={handleSelectChange}
                                                        onCreateOption={input => handleCreateClub(input)}
                                                        onFocus={() => setCurrentEditingField('club_id_1')}
                                                        placeholder="اختر..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        value={state.clubs_2?.find(c => c.value === matcheUpdate?.club_id_2 || c.value === parseInt(matcheUpdate?.club_id_2))}
                                                        options={state.clubs_2}
                                                        onChange={handleSelectChange}
                                                        isCreatable
                                                        onCreateOption={input => handleCreateClub(input)}
                                                        onFocus={() => setCurrentEditingField('club_id_2')}
                                                        placeholder="اختر..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 col-md-6 mt-lg-0">
                                <div class=" card text-center bg-light text-white">
                                    <div class="card-header bg-secondary">
                                        النتيجة
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                                <input type="namber" name='result_club_1' value={matcheUpdate?.result_club_1} onChange={handleInputChange} className="my-2 bg-white border-0 form-control" id="inputPassword4" placeholder='' />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <input type="namber" name='result_club_2' value={matcheUpdate?.result_club_2} onChange={handleInputChange} className="my-2 bg-white border-0 form-control" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 my-2 row">
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputPassword4">التوقيت</label>
                                <input type="time" name='temps' value={matcheUpdate?.temps} onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">الملعب</label>
                                <div className="my-2">
                                    <CreatableSelect
                                        className='text-light'
                                        isClearable
                                        value={matcheUpdate.stade_id ? state.stades?.find(s => s.value === matcheUpdate?.stade_id || s.value === parseInt(matcheUpdate?.stade_id)) : null}
                                        options={state.stades}
                                        onChange={handleSelectChange}
                                        onCreateOption={input => handleCreateStade(input)}
                                        placeholder="اكتب"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">المدينة</label>
                                <div className="my-2">
                                    <CreatableSelect
                                        className='text-light'
                                        isClearable
                                        value={matcheUpdate.ville_id ? state.villes?.find(s => s.value === matcheUpdate?.ville_id || s.value === parseInt(matcheUpdate?.ville_id)) : null}
                                        options={state.villes}
                                        onChange={handleSelectChange}
                                        onCreateOption={input => handleCreateVille(input, 'ville_id')}
                                        placeholder="اكتب"
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="my-2 row">
                            <div className="col-md-12">
                                <div class="card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        الأحداث المسجلة قبل, أثناء و بعد المباراة :
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">1.	توقيت حضور مراقب المباراة : </label>
                                                <input type="time" value={matcheUpdate?.temp_presence_delegue} name='temp_presence_delegue' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">2.  توقيت حضور رجال الأمن :</label>
                                                <input type="time" value={matcheUpdate?.temp_presence_agents_sécurité} name='temp_presence_agents_sécurité' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">3.	عدد رجال الامن</label>
                                                <input type="nember" value={matcheUpdate?.nombre_agents_sécurité} name='nombre_agents_sécurité' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">4.	ارضية الملعب</label>
                                                <input type="text" value={matcheUpdate?.etat_stade} name='etat_stade' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">5.	مستودع ملابس الحكام </label>
                                                <input type="text" value={matcheUpdate?.etat_vestiaire} name='etat_vestiaire' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-2 row">
                            <div className="col-md-12">
                                <div class="card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        التقرير الاضافي للحكم:
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div class="md-form">
                                                <textarea class="md-textarea form-control bg-white border-light" value={matcheUpdate?.rapport_supp} name='rapport_supp' onChange={handleInputChange} rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={`btn me-3 my-2 px-4 fw-bold ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>حفـــــظ</button>
                    </div>
            }
        </>
    )
}