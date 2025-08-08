import { useEffect, useState } from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { axiosClinet } from '../../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../../AuthContext';

export function Matche(props) {

    // Corriger le state initial - ajouter arbitre_4
    const [state, setState] = useState({
        centre: [],
        assistant_1: [],
        assistant_2: [],
        arbitre_4: [], // Ajouter cette ligne qui manque
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
        dernierIdMatche: []
    });

    const { user } = AuthUser();
    const { club_1_Option, club_2_Option } = AuthUser();
    const [loading, setLoanding] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        axiosClinet.get('/arbitre')
            .then((res) => {
                const arbitreUser = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null);

                const transformedOption = arbitreUser.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_c_id",
                }))

                const centre = transformedOption.filter(item => item.type === 'centre')
                const assistant = transformedOption.filter(item => item.type === 'assistant')

                const arbireAssistant_1 = assistant.map(item => ({
                    value: item.value,
                    label: item.label,
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_a1_id"
                }))
                const arbireAssistant_2 = assistant.map(item => ({
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
                    assistant_1: arbireAssistant_1,
                    assistant_2: arbireAssistant_2,
                    arbitre_4: optionArbire_4,
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
                const dataStades = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null)
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
                const dataVilles = res.data.filter(item => parseInt(item.user_id) === user?.id || item.user_id === null)
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
                const optionArbitre_4_ville = dataVilles.map(item => ({
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
                    arbitre_4_ville: optionArbitre_4_ville,
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
        axiosClinet.get('/joueur')
            .then((res) => {
                const dataJoueurs = res.data.filter(item => parseInt(item.user_id) === user?.id)
                const optionJoueurs = dataJoueurs?.map(item => ({
                    value: item.joueur_nom,
                    label: item.joueur_nom,
                    name: "joueur"
                }))
                const optionJoueursLicence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence,
                    name: "joueur_numero_licence"
                }))
                setState(prevData => ({
                    ...prevData,
                    joueurs: optionJoueurs,
                    joueursLicence: optionJoueursLicence
                }))
            })
        axiosClinet.get('/matche')
            .then((res) => {
                const dernierId = Math.max(...res.data.map(match => match.id), 0);
                setState(prevData => ({
                    ...prevData,
                    dernierIdMatche: dernierId + 1
                }))
                setLoanding(false);
            })
            .catch((error) => {
                console.error("Une erreur s'est produite lors de la récupération des données de Matches : " + error);
            })
    }, [user])

    const [inputValue, setInputValue] = useState([]);


    const [selectedSelect, setSelectedSelect] = useState({
        name: "",
        villeCentre: "",
        villeAssistant_1: "",
        villeAssistant_2: "",
        villeDelegue: "",
        stade: "",
        stadeClub_1: "",
        ville_manuelle: null // Ajouter ce champ
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValue(prevValues => ({
            ...prevValues,
            [name]: value,
            user_id: parseInt(user?.id),
            id: parseInt(state?.dernierIdMatche)
        }));
    };


    const handleSelectChange = (event) => {
        const { name, value } = event;

        var ville = name === "ville_id" ? value : inputValue.ville_id

        var stadeClub_1 = event?.name === "club_id_1" ? event?.stade : selectedSelect.stadeClub_1
        if (event?.name === "club_id_1") {
            club_1_Option(event)
            stadeClub_1 = state.stades.find((s) => stadeClub_1?.id === s.value)
        } else if (event?.name === "stade_id") {
            stadeClub_1 = event
        } else if (event?.name === "club_id_2") {
            club_2_Option(event)
        }

        var arbitreVille_4 = event?.name === "arbitre_4_id" ? event.ville : selectedSelect.arbitre_4_ville
        if (event?.name === "arbitre_4_id") {
            arbitreVille_4 = state.villes.find((v) => arbitreVille_4?.id === v.value)
        } else if (event?.name === "arbitre_4_ville") {
            arbitreVille_4 = event
        }

        var villeAssistant_1 = event?.name === "arbitre_a1_id" ? event.ville : selectedSelect.villeAssistant_1
        if (event?.name === "arbitre_a1_id") {
            villeAssistant_1 = state.villes.find((v) => villeAssistant_1?.id === v.value)
        } else if (event?.name === "assistant_1_ville") {
            villeAssistant_1 = event
        }

        var villeAssistant_2 = event?.name === "arbitre_a2_id" ? event.ville : selectedSelect.villeAssistant_2
        if (event?.name === "arbitre_a2_id") {
            villeAssistant_2 = state.villes.find((v) => villeAssistant_2?.id === v.value)
        } else if (event?.name === "assistant_2_ville") {
            villeAssistant_2 = event
        }

        var villeDelegue = event?.name === "delegue_id" ? event.ville : selectedSelect.villeDelegue
        if (event?.name === "delegue_id") {
            villeDelegue = state.villes.find((v) => villeDelegue?.id === v.value)
        } else if (event?.name === "delegue_ville") {
            villeDelegue = event
        }

        var villeCentre = event?.name === "arbitre_c_id" ? event.ville : selectedSelect.villeCentre
        if (event?.name === "arbitre_c_id") {
            villeCentre = state.villes.find((v) => villeCentre?.id === v.value)
        } else if (event?.name === "centre_ville") {
            villeCentre = event
        }

        var ville_id = "";
        
        if (name === "club_id_1") {
            ville_id = stadeClub_1?.ville?.id
        } else if (name === "stade_id") {
            ville_id = state.stades.find((s) => s.value === value)?.ville?.id
        } else {
            ville_id = ville
        }

        setInputValue(prevValues => ({
            ...prevValues,
            [name]: value,
            stade_id: stadeClub_1?.value,
            ville_id: ville_id,
            centre_ville: villeCentre?.value,
            assistant_1_ville: villeAssistant_1?.value,
            assistant_2_ville: villeAssistant_2?.value,
            arbitre_4_ville: arbitreVille_4?.value,
            delegue_ville: villeDelegue?.value,
        }));

        setSelectedSelect(prevValues => ({
            ...prevValues,
            name: event?.name,
            villeCentre: villeCentre,
            villeAssistant_1: villeAssistant_1,
            villeAssistant_2: villeAssistant_2,
            villeDelegue: villeDelegue,
            arbitre_4_ville: arbitreVille_4,
            stadeClub_1: stadeClub_1,
        }))
    };

    const [isValideData, setIsValideData] = useState();

    const sendData = () => {
        const numberKey = Object.keys(inputValue).length;
        if (numberKey >= 27) {
            props.dataMatche(inputValue);
            setIsValideData(prev => !prev)
            setError("")
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    }

    const [isLoadingArbitre, setIsLoadingArbitre] = useState(false);
    const [isLoadingDelegue, setIsLoadingDelegue] = useState(false);
    const [currentEditingField, setCurrentEditingField] = useState(null);

    // Corriger la fonction handleCreateArbitre - exactement comme handleCreate dans Avert.jsx
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
                assistant_1: [...prevState.assistant_1, { ...newOption, name: 'arbitre_a1_id' }]
            }));
        }
        else if (currentEditingField === 'arbitre_a2_id') {
            setState(prevState => ({
                ...prevState,
                assistant_2: [...prevState.assistant_2, { ...newOption, name: 'arbitre_a2_id' }]
            }));
        }
        else if (currentEditingField === 'arbitre_4_id') {
            setState(prevState => ({
                ...prevState,
                arbitre_4: [...prevState.arbitre_4, { ...newOption, name: 'arbitre_4_id' }]
            }));
        }

        // Sélectionner automatiquement avec le nom complet
        setInputValue(prevValues => ({
            ...prevValues,
            [currentEditingField]: inputValue // Envoyer le nom complet
        }));

        setIsLoadingArbitre(false);
        setError("");
    };

    // Corriger la fonction handleCreateDelegue - exactement comme handleCreateLicence dans Avert.jsx
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
        setInputValue(prevValues => ({
            ...prevValues,
            delegue_id: inputValue // Envoyer le nom complet
        }));

        setIsLoadingDelegue(false);
        setError("");
    };

    const handleFocusField = (fieldName) => {
        setCurrentEditingField(fieldName);
    };

    // Corriger les fonctions de changement - exactement comme dans Avert.jsx
    const handleArbitreSelectChange = (event, fieldName) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: fieldName
            };
        }

        const { name, value } = valeur;
        setInputValue(prevValues => ({
            ...prevValues,
            [fieldName]: value
        }));

        // Appeler aussi handleSelectChange pour les autres logiques si nécessaire
        if (value) {
            handleSelectChange({ ...valeur, name: fieldName });
        }
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
        setInputValue(prevValues => ({
            ...prevValues,
            delegue_id: value
        }));

        if (value) {
            handleSelectChange({ ...valeur, name: "delegue_id" });
        }
    };

    // Ajouter les états pour les clubs
    const [isLoadingClub, setIsLoadingClub] = useState(false);

    const handleCreateClub = (inputValue) => {
        if (!currentEditingField) return;

        setIsLoadingClub(true);

        // Créer la nouvelle option avec le nom du club complet
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(), // Utiliser le nom complet comme value
            name: currentEditingField
        };

        // Ajouter aux options pour l'affichage
        if (currentEditingField === 'club_id_1') {
            setState(prevState => ({
                ...prevState,
                clubs_1: [...prevState.clubs_1, { ...newOption, name: 'club_id_1' }]
            }));
            club_1_Option(newOption); // Mettre à jour le contexte avec le nouveau club
        }
        else if (currentEditingField === 'club_id_2') {
            setState(prevState => ({
                ...prevState,
                clubs_2: [...prevState.clubs_2, { ...newOption, name: 'club_id_2' }]
            }));
            club_2_Option(newOption); // Mettre à jour le contexte avec le nouveau club
        }

        // Sélectionner automatiquement avec le nom complet du club
        setInputValue(prevValues => ({
            ...prevValues,
            [currentEditingField]: inputValue // Envoyer le nom complet du club
        }));        

        setIsLoadingClub(false);
        setError("");
    };

    const handleClubSelectChange = (event, fieldName) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: fieldName
            };
        }

        const { value } = valeur;
        
        setInputValue(prevValues => ({
            ...prevValues,
            [fieldName]: value
        }));

        if (value) {
            handleSelectChange({ ...valeur, name: fieldName });
        }
    };

    // Modifier handleStadeSelectChange pour gérer la ville
    const handleStadeSelectChange = (event) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: "stade_id",
                ville: null
            };
        }

        const { name, value } = valeur;
        setInputValue(prevValues => ({
            ...prevValues,
            stade_id: value,
            // Si le stade a une ville, on la met automatiquement
            ville_id: valeur.ville?.id || prevValues.ville_id
        }));

        // Mettre à jour selectedSelect pour l'affichage
        setSelectedSelect(prevValues => ({
            ...prevValues,
            stadeClub_1: valeur,
            // Si pas de ville dans le stade, garder la sélection manuelle existante
            ville_manuelle: valeur.ville ? null : prevValues.ville_manuelle
        }));

        if (value) {
            handleSelectChange({ ...valeur, name: "stade_id" });
        }
    };

    // Ajouter une fonction pour gérer la sélection manuelle de ville
    const handleVilleManuelleChange = (event) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: "ville_id"
            };
        }

        const { name, value } = valeur;
        setInputValue(prevValues => ({
            ...prevValues,
            ville_id: value
        }));

        setSelectedSelect(prevValues => ({
            ...prevValues,
            ville_manuelle: valeur
        }));

        if (value) {
            handleSelectChange({ ...valeur, name: "ville_id" });
        }
    };

    const [isLoadingStade, setIsLoadingStade] = useState(false);

    // // Ajouter les fonctions pour créer des stades
    // const createOptionStade = (label) => ({
    //     label: label.toUpperCase(),
    //     value: label.toLowerCase(),
    //     name: "stade"
    // });

    // Modifier handleCreateStade pour initialiser avec la ville sélectionnée
    const handleCreateStade = (inputValue) => {
        if (!currentEditingField) return;

        setIsLoadingStade(true);

        // Récupérer la ville sélectionnée manuellement si elle existe
        const villeSelectionnee = selectedSelect?.ville_manuelle || null;

        // Créer la nouvelle option avec le nom du stade
        const newOption = {
            label: inputValue.toUpperCase(),
            value: inputValue.toLowerCase(),
            name: currentEditingField,
            ville: villeSelectionnee // Associer la ville si sélectionnée
        };

        // Ajouter aux options pour l'affichage
        setState(prevState => ({
            ...prevState,
            stades: [...prevState.stades, { ...newOption, name: 'stade_id' }]
        }));

        // Sélectionner automatiquement avec le nom du stade
        setInputValue(prevValues => ({
            ...prevValues,
            stade_id: inputValue, // Envoyer le nom du stade
            ville_id: villeSelectionnee?.value || prevValues.ville_id // Garder la ville sélectionnée
        }));

        // Mettre à jour selectedSelect
        setSelectedSelect(prevValues => ({
            ...prevValues,
            stadeClub_1: newOption
        }));

        setIsLoadingStade(false);
        setError("");
    };


    const handleCreateVille = (input, name) => {
        const newVille = {
            value: input, label: input, name
        };

        if (name === 'ville_id') {
            setState(prev => ({
                ...prev,
                villes: [...(prev.villes || []), newVille],
            }));

        } else {
            setState(prev => ({
                ...prev,
                [name]: [...(prev[name] || []), newVille],
            }));
        }

        setInputValue(prev => ({
            ...prev,
            [name]: newVille.value
        }));

    };

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
                    <div >
                        <div className="mx-2 my-2 row">
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputEmail4">الموسم الرياضي</label>
                                <div className='my-2'>
                                    <Select
                                        isClearable
                                        name={selectedSelect}
                                        onChange={handleSelectChange}
                                        options={state.saison}
                                        placeholder="أكتب..."
                                        required
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">التاريخ</label>
                                <input type="date" name='date' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" required />
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">المنافسة</label>
                                <div className='my-2'>
                                    <Select
                                        isClearable
                                        name={selectedSelect}
                                        onChange={handleSelectChange}
                                        options={state.competition}
                                        placeholder="أكتب..."
                                        required
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
                                    />
                                </div>
                            </div>
                            <div className="text-white form-group col-md-3">
                                <label htmlFor="inputEmail4">الفئة</label>
                                <div className='my-2'>
                                    <Select
                                        className='text-light'
                                        isClearable
                                        name={selectedSelect}
                                        onChange={handleSelectChange}
                                        options={state.category}
                                        placeholder="أكتب..."
                                        required
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
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
                                                        value={inputValue.arbitre_c_id ? state.centre.find(option => option.value === inputValue.arbitre_c_id) : null}
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
                                                        options={state.assistant_1}
                                                        value={inputValue.arbitre_a1_id ? state.assistant_1.find(option => option.value === inputValue.arbitre_a1_id) : null}
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
                                                        options={state.assistant_2}
                                                        value={inputValue.arbitre_a2_id ? state.assistant_2.find(option => option.value === inputValue.arbitre_a2_id) : null}
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
                                                        value={inputValue.delegue_id ? state.delegue.find(option => option.value === inputValue.delegue_id) : null}
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
                                                    <CreatableSelect className='text-light'
                                                        onCreateOption={(value) => handleCreateVille(value, 'centre_ville')}
                                                        options={state.centre_ville}
                                                        value={inputValue?.centre_ville ? state.centre_ville.find((v) => v.value === inputValue.centre_ville) : null}
                                                        onChange={handleSelectChange} placeholder="..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        options={state.assistant_1_ville}
                                                        onCreateOption={(value) => handleCreateVille(value, 'assistant_1_ville')}
                                                        value={inputValue?.assistant_1_ville ? state.assistant_1_ville.find((v) => v.value === inputValue.assistant_1_ville) : null}
                                                        onChange={handleSelectChange}
                                                        placeholder="..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        options={state.assistant_2_ville}
                                                        onCreateOption={(value) => handleCreateVille(value, 'assistant_2_ville')}
                                                        value={inputValue?.assistant_2_ville ? state.assistant_2_ville.find((v) => v.value === inputValue.assistant_2_ville) : null}
                                                        onChange={handleSelectChange} placeholder="..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        options={state.delegue_ville}
                                                        onCreateOption={(value) => handleCreateVille(value, 'delegue_ville')}
                                                        value={inputValue?.delegue_ville ? state.delegue_ville.find((v) => v.value === inputValue.delegue_ville) : null}
                                                        onChange={handleSelectChange} placeholder="..."
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
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
                                                        options={state.arbitre_4}
                                                        value={inputValue.arbitre_4_id ? state.arbitre_4.find(option => option.value === inputValue.arbitre_4_id) : null}
                                                        onChange={(event) => handleArbitreSelectChange(event, 'arbitre_4_id')}
                                                        onCreateOption={handleCreateArbitre}
                                                        onFocus={() => handleFocusField('arbitre_4_id')}
                                                        placeholder="اختر او أضف حكما "
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        options={state.arbitre_4_ville}
                                                        onCreateOption={(value) => handleCreateVille(value, 'arbitre_4_ville')}
                                                        value={inputValue?.arbitre_4_ville ? state.arbitre_4_ville.find((v) => v.value === inputValue.arbitre_4_ville) : null}
                                                        onChange={handleSelectChange} placeholder="..."
                                                        menuPortalTarget={document.body}
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
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingClub}
                                                        isLoading={isLoadingClub}
                                                        options={state.clubs_1}
                                                        value={inputValue.club_id_1 ? state.clubs_1.find(option => option.value === inputValue.club_id_1) : null}
                                                        onChange={(event) => handleClubSelectChange(event, 'club_id_1')}
                                                        onCreateOption={handleCreateClub}
                                                        onFocus={() => handleFocusField('club_id_1')}
                                                        placeholder="اختر أو أضف فريقا"
                                                        formatCreateLabel={(inputValue) => `إضافة فريق: ${inputValue}`}
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <div className='my-2'>
                                                    <CreatableSelect
                                                        className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingClub}
                                                        isLoading={isLoadingClub}
                                                        options={state.clubs_2}
                                                        value={inputValue.club_id_2 ? state.clubs_2.find(option => option.value === inputValue.club_id_2) : null}
                                                        onChange={(event) => handleClubSelectChange(event, 'club_id_2')}
                                                        onCreateOption={handleCreateClub}
                                                        onFocus={() => handleFocusField('club_id_2')}
                                                        placeholder="اختر أو أضف فريقا"
                                                        formatCreateLabel={(inputValue) => `إضافة فريق: ${inputValue}`}
                                                        menuPortalTarget={document.body}
                                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'center' }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class=" card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        النتيجة
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                                <input type="namber" name='result_club_1' onChange={handleInputChange} className="mt-2 mb-2 bg-white border-0 form-control" id="inputPassword4" placeholder='' />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <input type="namber" name='result_club_2' onChange={handleInputChange} className="mt-2 mb-2 bg-white border-0 form-control" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 my-2 row">
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputPassword4">التوقيت</label>
                                <input type="time" name='temps' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputTime" />
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">الملعب</label>
                                <div className="my-2">
                                    <CreatableSelect
                                        className='text-light'
                                        isClearable
                                        isDisabled={isLoadingStade}
                                        isLoading={isLoadingStade}
                                        options={state.stades}
                                        value={inputValue.stade_id ? state.stades.find(option => option.value === inputValue.stade_id) : null}
                                        onChange={handleStadeSelectChange}
                                        onCreateOption={handleCreateStade}
                                        onFocus={() => handleFocusField('stade_id')}
                                        placeholder="اختر أو أضف ملعب..."
                                        formatCreateLabel={(inputValue) => `إضافة ملعب: ${inputValue}`}
                                        menuPortalTarget={document.body}
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
                                        onCreateOption={(value) => handleCreateVille(value, 'ville_id')}
                                        value={inputValue?.ville_id ? state.villes.find((v) => v.value === inputValue.ville_id) : null}
                                        // value={state.villes.find(option => option.value === inputValue.centre_ville) || null}
                                        options={state.villes}
                                        name="centre_ville"
                                        onChange={handleSelectChange}
                                        placeholder="..."
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, textAlign: 'right' }) }}
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
                                                <label htmlFor="inputtemp_presence_delegue">1.	توقيت حضور مراقب المباراة : </label>
                                                <input type="time" name='temp_presence_delegue' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputtemp_presence_delegue" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputTemp_presence_agents_sécurité">2.  توقيت حضور رجال الأمن :</label>
                                                <input type="time" name='temp_presence_agents_sécurité' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputTemp_presence_agents_sécurité" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputNombre_agents_sécurité">3.	عدد رجال الامن</label>
                                                <input type="nember" name='nombre_agents_sécurité' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputNombre_agents_sécurité" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEtat_stade">4.	ارضية الملعب</label>
                                                <input type="text" name='etat_stade' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputEtat_stade" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEtat_vestiaire">5.	مستودع ملابس الحكام </label>
                                                <input type="text" name='etat_vestiaire' onChange={handleInputChange} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
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
                                                <textarea class="md-textarea form-control bg-white border-light" name='rapport_supp' onChange={handleInputChange} rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-4 mt-3 text-center'>
                            {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                        </div>
                        <button className={`btn me-3 my-2 px-4 fw-bold ${isValideData ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>حفـــــظ</button>
                    </div>
            }

        </>
    )
}