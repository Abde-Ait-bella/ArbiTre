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
        joueursLicence: [],
        clubs: [],
    });

    const [buts, setButs] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const { user } = AuthUser();


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

                const optionJoueursLicence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence?.toUpperCase(),
                    name: "joueur_numero_licence"
                }))

                const dataClubs = clubResponse.data.filter((c) => parseInt(c.user_id) === user?.id || c.user_id === null);
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr,
                    name: "club_id",
                }))

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
                setOptionsLicence(optionJoueursLicence)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //--------Sélection joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();

    const handleCreateJ = (inputValue) => {
        setIsLoadingJ(true);
        setTimeout(() => {
            const newOption = createOptionJ(inputValue);
            setIsLoadingJ(false);
            setOptionsJ((prev) => [...prev, newOption]);
        }, 1000);
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


    //-----Sélection licence de joueur entrant

    const createOptionLicence = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();
    const [valueLicence, setValueLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        setIsLoadingLicence(true);
        setTimeout(() => {
            const newOption = createOptionLicence(inputValue);
            setIsLoadingLicence(false);
            setOptionsLicence((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectLicence = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        } else {
            setValueLicence(valeur)
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        }
        setValueLicence(event);
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
        if (numberOfAttributes === 6 || numberOfAttributes == null) {
            setError("")
            setButs([...buts, {},]);
            setValueLicence()
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
        if (numberOfAttributes === 6) {
            setError("")
            props.dataButs(buts);
            setIsValide(prev => !prev)
        } else {
            setError("هناك خطأ ما ، يجب عليك ملأ جميع الخانات يا هاد الحكم")
        }
    };

    return (
        <>
            {
                loading ?

                    <>
                        <div className='mt-4 mb-3 d-none d-lg-block'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row mt-4">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-4 mx-2">
                                    <div className="col-4">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div>
                                            <Skeleton height={40} />
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                        
                        <div className='mt-4 mb-3 d-lg-none'>
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row mt-5 mx-1">
                                    <Skeleton height={40} />
                                </div>

                                <div className="row mt-3 mx-2">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3 mb-2">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>
                    :
                    <div className="row my-2">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold">
                                    الهدافــون
                                </div>
                                <div class="card-body">
                                    {buts?.map((item, index) => (
                                        <div className="row border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                            <div className="form-group col-md-4">
                                                <label>الفريق</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light' options={state?.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب و اختر" />
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
                                                        placeholder="أكتب و اختر"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label >رقم رخصة</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light'
                                                        isClearable
                                                        isDisabled={isLoadingLicence}
                                                        isLoading={isLoadingLicence}
                                                        onChange={(event) => handleChangeSelectLicence(event, index)}
                                                        onCreateOption={handleCreateLicence}
                                                        options={optionsLicence}
                                                        value={valueLicence}
                                                        placeholder='أكتب و اختر'
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >رقم الاعب</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_numero' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark mt-1 px-3"></i></button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='d-flex justify-content-center mt-3'>
                                        <div>
                                            <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus mt-1 px-4"></i></button>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        {error && <span className='text-warning'>{error}<span className='text-warning me-2'>!!</span></span>}
                                    </div>
                                    <div className='d-flex justify-content-right pt-2'>
                                        <button className={`btn me-3 my-2 px-4 fw-bold  ${isValide ? 'bg-warning text-danger' : 'bg-secondary text-white'}`} onClick={sendData}>حفـــــظ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
        </>
    )
}
