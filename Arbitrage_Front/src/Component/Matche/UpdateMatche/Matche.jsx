import { React, useEffect, useState } from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
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
        dernierIdMatche: [],
        matches: []
    });

    const [matcheUpdate, setMatcheUpdate] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = AuthUser();
    const { id } = useParams();

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

                setState(prevData => ({
                    ...prevData,
                    centre: centre,
                    assistant_1: arbireAssistant_1,
                    assistant_2: arbireAssistant_2,
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
            
        }, [])


    const handleInputChange = (event) => {

        const { name, value } = event.target;

        const newObject = { ...matcheUpdate };
        newObject[name] = value
        setMatcheUpdate(newObject)

    };

    const handleSelectChange = (event) => {

        const { name, value } = event;

        var stadeClub_1 = event?.name === "club_id_1" ? event?.stade : parseInt(matcheUpdate?.stade_id);
        if (event?.name === "club_id_1") {
            stadeClub_1 = state.stades.find((s) => stadeClub_1?.id === parseInt(s.value))
        } else if (event?.name === "stade_id") {
            stadeClub_1 = event
        }
        var villeStade = state?.villes?.find((v) => parseInt(v.value) === parseInt(stadeClub_1?.ville?.id))

        const newObject = { ...matcheUpdate };
        newObject[name] = value;
        newObject.stade_id = stadeClub_1?.value ? stadeClub_1?.value : parseInt(matcheUpdate?.stade_id);
        newObject.ville_id = villeStade?.value ? villeStade?.value : parseInt(matcheUpdate?.ville?.id);
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
                        <div className='d-none d-lg-block'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row mx-2 mt-4">
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
                    <div className='matche-update'>
                        <div className="row my-2 mx-2">
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputEmail4">الموسم الرياضي</label>
                                <div className='my-2'>
                                    <Select isClearable className='text-light' value={state.saison?.find((s) => s.value === parseInt(matcheUpdate?.saison_id))} onChange={handleSelectChange} options={state.saison} placeholder="أكتب..." />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">التاريخ</label>
                                <input type="date" name='date' value={matcheUpdate?.date} onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-3">
                                <label className='text-white' htmlFor="inputPassword4">المنافسة</label>
                                <div className='my-2'>
                                    <Select isClearable className='text-light' value={state.competition?.find((c) => parseInt(c.value) === parseInt(matcheUpdate?.competition_id))} onChange={handleSelectChange} options={state.competition} placeholder="أكتب..." />
                                </div>
                            </div>
                            <div className="form-group col-md-3 text-white">
                                <label htmlFor="inputEmail4">الفئة</label>
                                <div className='my-2'>
                                    <Select className='text-light' value={state.category?.find((c) => c.value === parseInt(matcheUpdate?.categorie_id))} isClearable onChange={handleSelectChange} options={state.category} placeholder="أكتب..." />
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
                                                    <Select className='text-light' value={state.centre?.find((c) => c.value === parseInt(matcheUpdate?.arbitre_c_id))} options={state.centre} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 1</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' value={state.assistant_1?.find((c) => c.value === parseInt(matcheUpdate?.arbitre_a1_id))} options={state.assistant_1} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">الحكم المساعد 2</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' value={state.assistant_2?.find((c) => c.value === parseInt(matcheUpdate?.arbitre_a2_id))} options={state.assistant_2} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المراقب</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' value={state.delegue?.find((c) => c.value === parseInt(matcheUpdate?.delegue_id))} options={state.delegue} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' value={state.villes?.find((v) => v.value === parseInt(matcheUpdate?.centre_ville))} options={state.centreVille} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_1_Ville} value={state.villes?.find((v) => v.value === parseInt(matcheUpdate?.assistant_1_ville))} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.assistant_2_Ville} value={state.villes?.find((v) => v.value === parseInt(matcheUpdate?.assistant_2_ville))} onChange={handleSelectChange} placeholder="..." />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label htmlFor="inputEmail4">المدينة</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' options={state.delegueVille} value={state.villes?.find((v) => v.value === parseInt(matcheUpdate?.delegue_ville))} onChange={handleSelectChange} placeholder="..." />
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
                                                    <Select className='text-light' value={state.clubs?.find((c) => c.value === parseInt(matcheUpdate?.club_id_1))} options={state.clubs_1} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                            <div className="form-group  col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <div className='my-2'>
                                                    <Select className='text-light' value={state.clubs?.find((c) => c.value === parseInt(matcheUpdate?.club_id_2))} options={state.clubs_2} onChange={handleSelectChange} placeholder="اختر..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-lg-0 mt-2">
                                <div class=" card text-center bg-light text-white">
                                    <div class="card-header bg-secondary">
                                        النتيجة
                                    </div>
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                                <input type="namber" name='result_club_1' value={matcheUpdate?.result_club_1} onChange={handleInputChange} className="form-control bg-white border-0 my-2" id="inputPassword4" placeholder='' />
                                            </div>
                                            <div className="form-group  col-md-6">
                                                <label htmlFor="inputEmail4">الفريق الزائر</label>
                                                <input type="namber" name='result_club_2' value={matcheUpdate?.result_club_2} onChange={handleInputChange} className="form-control bg-white border-0 my-2" id="inputPassword4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2 mx-2">
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputPassword4">التوقيت</label>
                                <input type="time" name='temps' value={matcheUpdate?.temps} onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">الملعب</label>
                                <div className="my-2">
                                    <Select className='text-light' value={state?.stades?.find((s) => s.value === parseInt(matcheUpdate?.stade_id))} options={state.stades} onChange={handleSelectChange} placeholder="اكتب" />
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label className='text-white' htmlFor="inputEmail4">المدينة</label>
                                <div className="my-2">
                                    <CreatableSelect className='text-light' php isDisabled value={state?.villes?.find((s) => s.value === parseInt(matcheUpdate?.ville_id))} options={state.villes} onChange={handleSelectChange} placeholder="اكتب" />
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
                                                <input type="time" value={matcheUpdate?.temp_presence_delegue} name='temp_presence_delegue' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">2.  توقيت حضور رجال الأمن :</label>
                                                <input type="time" value={matcheUpdate?.temp_presence_agents_sécurité} name='temp_presence_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputPassword4">3.	عدد رجال الامن</label>
                                                <input type="nember" value={matcheUpdate?.nombre_agents_sécurité} name='nombre_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">4.	ارضية الملعب</label>
                                                <input type="text" value={matcheUpdate?.etat_stade} name='etat_stade' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">5.	مستودع ملابس الحكام </label>
                                                <input type="text" value={matcheUpdate?.etat_vestiaire} name='etat_vestiaire' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
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