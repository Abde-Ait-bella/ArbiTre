import { React, useEffect, useState } from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { axiosClinet } from '../../../Api/axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from '../../../AuthContext';

export function Matche(props) {

    const [state, setState] = useState({
        centre: [],
        assistant_1: [],
        assistant_2: [],
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
        centreVille: [],
        assistant_1_Ville: [],
        assistant_2_Ville: [],
        delegueVille: [],
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
                const optionAssistant_1_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "assistant_1_ville"
                }))
                const optionAssistant_2_ville = dataVilles.map(item => ({
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
                    centreVille: optionCentre_ville,
                    assistant_1_Ville: optionAssistant_1_ville,
                    assistant_2_Ville: optionAssistant_2_ville,
                    arbitre_4_ville: optionArbitre_4_ville,
                    delegueVille: optionDelegue_ville
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
        stadeClub_1: ""
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
        var stadeClub_1 = event?.name === "club_id_1" ? event?.stade : selectedSelect.stadeClub_1
        if (event?.name === "club_id_1") {
            club_1_Option(value)
            stadeClub_1 = state.stades.find((s) => stadeClub_1?.id === s.value)
        } else if (event?.name === "stade_id") {
            stadeClub_1 = event
        }else if (event?.name === "club_id_2") {
            club_2_Option(value)
        }


        var arbitreVille_4 = event?.name === "arbitre_4_id" ? event.ville : selectedSelect.arbitre_4_ville
        if (event?.name === "arbitre_4_id") {
            arbitreVille_4 = state.villes.find((v) => arbitreVille_4?.id === v.value)
        }else if(event?.name === "arbitre_4_ville"){
            arbitreVille_4 = event
        }

        var villeAssistant_1 = event?.name === "arbitre_a1_id" ? event.ville : selectedSelect.villeAssistant_1
        if (event?.name === "arbitre_a1_id") {
            villeAssistant_1 = state.villes.find((v) => villeAssistant_1?.id === v.value)
        }else if(event?.name === "assistant_1_ville"){
            villeAssistant_1 = event
        }

        var villeAssistant_2 = event?.name === "arbitre_a2_id" ? event.ville : selectedSelect.villeAssistant_2
        if (event?.name === "arbitre_a2_id") {
            villeAssistant_2 = state.villes.find((v) => villeAssistant_2?.id === v.value)
        }else if(event?.name === "assistant_2_ville"){
            villeAssistant_2 = event
        }

        var villeDelegue = event?.name === "delegue_id" ? event.ville : selectedSelect.villeDelegue
        if (event?.name === "delegue_id") {
            villeDelegue = state.villes.find((v) => villeDelegue?.id === v.value)
        }else if(event?.name === "delegue_ville"){
            villeDelegue = event
        }

        var villeCentre = event?.name === "arbitre_c_id" ? event.ville : selectedSelect.villeCentre
        if (event?.name === "arbitre_c_id") {
            villeCentre = state.villes.find((v) => villeCentre?.id === v.value)
        }else if(event?.name === "centre_ville"){
            villeCentre = event
        }


        setInputValue(prevValues => ({
            ...prevValues,
            [name]: value,
            stade_id: stadeClub_1?.value,
            ville_id: stadeClub_1?.ville?.id,
            centre_ville : villeCentre?.value,
            assistant_1_ville: villeAssistant_1?.value,
            assistant_2_ville: villeAssistant_2?.value,
            arbitre_4_ville: arbitreVille_4?.value,
            delegue_ville: villeDelegue?.value,
        }));

        console.log('InputValue', inputValue);


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
        if (numberKey === 29) {
            props.dataMatche(inputValue);
            setIsValideData(prev => !prev)
            setError("")
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    }

    return (
        <>
            {
                loading ?
                    <>
                        <div className="d-none d-lg-break">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row mt-4 mx-2">
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

                                <div className="row mt-4">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
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

                                <div className="row mt-4">
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                </div>


                                <div className="row mt-4 mx-1">
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

                                <div className="row mt-4">
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
                                <div className="row mt-4">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
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

                                <div className="row mt-4">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
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
                                <div className="row mt-4 mx-2">
                                    <div className="col-12 mt-3">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-4 mx-1">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
                                    {/* <div className="col-12 mt-3">
                                        <Skeleton height={40} />
                                    </div> */}
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <Skeleton height={40} />
                                    </div>
                                </div>

                                <div className="row mt-4 mx-1">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2 pb-2">
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
                        <div className="row my-2 mx-2">
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputEmail4">الموسم الرياضي</label>
                                <div className='my-2'>
                                    <CreatableSelect isClearable name={selectedSelect} onChange={handleSelectChange} options={state.saison} placeholder="أكتب..." required />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">التاريخ</label>
                                <input type="date" name='date' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" required />
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">المنافسة</label>
                                <div className='my-2'>
                                    <CreatableSelect isClearable name={selectedSelect} onChange={handleSelectChange} options={state.competition} placeholder="أكتب..." required />
                                </div>
                            </div>
                            <div className="form-group col-md-3 text-white">
                                <label htmlFor="inputEmail4">الفئة</label>
                                <div className='my-2'>
                                    <CreatableSelect className='text-light' isClearable name={selectedSelect} onChange={handleSelectChange} options={state.category} placeholder="أكتب..." required />
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
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
                                                    <Select className='text-light' options={state.centre} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 1</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_1} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 2</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_2} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المراقب</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.delegue} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.centreVille} value={selectedSelect?.villeCentre ? { value: selectedSelect?.villeCentre?.value, label: selectedSelect?.villeCentre?.label } : null} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_1_Ville} value={selectedSelect.villeAssistant_1 ? { value: selectedSelect.villeAssistant_1?.value, label: selectedSelect.villeAssistant_1?.label } : null} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_2_Ville} value={selectedSelect.villeAssistant_2 ? { value: selectedSelect.villeAssistant_2?.value, label: selectedSelect.villeAssistant_2?.label } : null} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.delegueVille} value={selectedSelect.villeDelegue ? { value: selectedSelect?.villeDelegue?.value, label: selectedSelect?.villeDelegue?.label } : null} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="form-group col-md-3 ">
                                                <label htmlFor="inputEmail4">الحكم الرابع</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.arbitre_4} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                        <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.arbitre_4_ville} value={selectedSelect?.arbitre_4_ville ? { value: selectedSelect?.arbitre_4_ville?.value, label: selectedSelect?.arbitre_4_ville?.label } : null} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
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
                                                    <Select className='text-light' options={state.clubs_1} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group  col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.clubs_2} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
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
                                                <input type="namber" name='result_club_1' onChange={handleInputChange} className="form-control bg-white border-0 mt-2 mb-2" id="inputPassword4" placeholder='' />
                                            </div>
                                            <div className="form-group  col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <input type="namber" name='result_club_2' onChange={handleInputChange} className="form-control bg-white border-0 mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2 mx-2">
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputPassword4">التوقيت</label>
                                <input type="time" name='temps' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputTime" />
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">الملعب</label>
                                <div className="my-2">
                                    <Select className='text-light' value={selectedSelect?.stadeClub_1 ? { value: selectedSelect?.stadeClub_1?.value, label: selectedSelect?.stadeClub_1?.label } : null} options={state.stades} name={selectedSelect} onChange={handleSelectChange} placeholder="اكتب" />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">المدينة</label>
                                <div className="my-2">
                                    <CreatableSelect className='text-light' php isDisabled value={selectedSelect?.stadeClub_1?.ville ? { value: selectedSelect?.stadeClub_1?.ville?.id, label: selectedSelect?.stadeClub_1?.ville?.nom } : null} options={state.villes} name={selectedSelect} onChange={handleSelectChange} placeholder="..." />
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-12">
                                <div class="card text-center bg-light text-white mx-1">
                                    <div class="card-header bg-secondary">
                                        الأحداث المسجلة قبل, أثناء و بعد المباراة :
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">1.	توقيت حضور مراقب المباراة : </label>
                                                <input type="time" name='temp_presence_delegue' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputTime" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">2.  توقيت حضور رجال الأمن :</label>
                                                <input type="time" name='temp_presence_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputTime" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">3.	عدد رجال الامن</label>
                                                <input type="nember" name='nombre_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">4.	ارضية الملعب</label>
                                                <input type="text" name='etat_stade' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">5.	مستودع ملابس الحكام </label>
                                                <input type="text" name='etat_vestiaire' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
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
                        <div className='text-center mx-4 mt-3'>
                            {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                        </div>
                         <button className={`btn me-3 my-2 px-4 fw-bold ${isValideData ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>حفـــــظ</button>
                    </div>
            }

        </>
    )
}