import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';


export function Buts(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        clubs: [],
    });

    const [buts, setButs] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const { user, club_1, club_2 } = AuthUser();



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
                    name: "joueur_nom",
                }))

                const dataClubs = clubResponse.data.filter((c) => (parseInt(c.user_id) === user?.id || c.user_id === null) && (parseInt(club_1) === c.id || parseInt(club_2) === c.id));
                var optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr,
                    name: "club_id",
                }))

                if (!Number.isInteger(club_1)) {
                    var optionClubs = [...optionClubs, club_1];
                }
                if (!Number.isInteger(club_2)) {
                    var optionClubs = [...optionClubs, club_2];
                }

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
                setOptionsJ(optionJoueurs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [club_1, club_2]);

    //--------Sélection joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();

    const handleCreateJ = (inputValue) => {
        if (currentEditingIndex === null) return;

        setIsLoadingJ(true);

        // Créer la nouvelle option
        const newOption = createOptionJ(inputValue);

        // Ajouter l'option sans vérification - permet les doublons
        setOptionsJ((prev) => [...prev, newOption]);

        // Mettre à jour le but avec le nouveau nom
        const newButs = [...buts];
        newButs[currentEditingIndex].joueur_nom = newOption.value;
        setButs(newButs);

        setIsLoadingJ(false);
    };

    const handleChangeSelectJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom"
            }
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);


        } else {
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        }
    }


    const handleChangeSelect = (event, index) => {
        let valeur = event
        const { name, value } = valeur;
        const newBut = [...buts];
        newBut[index][name] = value;
        newBut[index].matche_id = state.matchNamber;
        setButs(newBut);
    }


    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newBut = [...buts];
        newBut[index][name] = value;
        setButs(newBut);
    }


    const addRow = () => {
        let numberOfAttributes;
        buts.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 5 || numberOfAttributes == null) {
            setError("")
            setButs([...buts, {},]);
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    const SuppRow = (index) => {
        setError("")
        const newBut = [...buts];
        newBut.splice(index, 1);
        setButs(newBut);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        let numberOfAttributes;
        buts.forEach(obj => {
            numberOfAttributes = Object.keys(obj).length;
        });
        if (numberOfAttributes === 5) {
            setError("")
            props.dataButs(buts);
            setIsValide(prev => !prev)
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
                                    <span>الهدافــون</span>
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
                                    {buts?.map((item, index) => (
                                        <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary" key={index}>
                                            <div className="form-group col-md-4">
                                                <label>الفريق</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light' options={state?.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder={`${state?.clubs.length > 0 ? 'اكتب و اختر' : 'اختر الفرق أعلاه !!'}`} />
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
                                                        options={optionsJ}
                                                        value={buts[index]?.joueur_nom ? optionsJ?.find((j) => j.value === buts[index]?.joueur_nom) : null}
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >رقم الاعب</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_numero' onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' onChange={(event) => handleChangeInput(event, index)} className="mt-2 mb-2 bg-white form-control border-light" id="inputPassword4" />
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
                                        <button className={`btn me-3 my-2 px-4 fw-bold  ${isValide ? 'bg-warning text-danger' : 'bg-secondary text-white'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
        </>
    )
}
