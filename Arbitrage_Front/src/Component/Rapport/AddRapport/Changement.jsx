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
const [optionsLicenceE, setOptionsLicenceE] = useState([]);
const [optionsLicenceS, setOptionsLicenceS] = useState([]);

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

                const dataClubs = clubResponse.data.filter((c) => (parseInt(c.user_id) === user?.id || c.user_id === null ) && (parseInt(club_1) === c.id || parseInt(club_2) === c.id));
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + " " + item.abbr,
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
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))

                setOptionsLicenceE(optionJoueursLicenceE);
                setOptionsJEntr(optionJoueursEntr);
                setOptionsJSort(optionJoueursSort);
                setOptionsLicenceS(optionJoueursLicenceS);
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

    //-----Sélection licence de joueur entrant

    const createOptionLicenceE = (label) => ({
        label: label.toUpperCase(), // Assurer que tous les labels sont en majuscules
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_entr"
    });


    const [isLoadingLicenceE, setIsLoadingLicenceE] = useState(false);


    const handleCreateLicenceE = (inputValue) => {
        if (currentEditingIndex === null) return;
        
        setIsLoadingLicenceE(true);
        
        // Créer la nouvelle option
        const newOption = createOptionLicenceE(inputValue);
        
        // Ajouter l'option aux licences disponibles
        setOptionsLicenceE(prevOptions => [...prevOptions, newOption]);
        
        // Mettre à jour immédiatement le changement avec la nouvelle licence
        const newChanges = [...change];
        newChanges[currentEditingIndex].joueur_licence_entr = newOption.value;
        setChange(newChanges);
        
        setIsLoadingLicenceE(false);
    };

    const handleChangeSelectLicenceE = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_entr" // Utiliser ce nom systématiquement
            }
        }
        const { name, value } = valeur;
        const newChange = [...change];
        newChange[index][name] = value;
        setChange(newChange)
    }


    //-----Sélection licence de joueur sortant

    const createOptionLicenceS = (label) => ({
        label: label.toUpperCase(), // Ajout de toUpperCase()
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_sort"
    });


    const [isLoadingLicenceS, setIsLoadingLicenceS] = useState(false);


    const handleCreateLicenceS = (inputValue) => {
        if (currentEditingIndex === null) return;
        
        setIsLoadingLicenceS(true);
        
        // Créer la nouvelle option
        const newOption = createOptionLicenceS(inputValue);
        
        // Ajouter l'option aux licences disponibles
        setOptionsLicenceS(prevOptions => [...prevOptions, newOption]);
        
        // Mettre à jour immédiatement le changement avec la nouvelle licence
        const newChanges = [...change];
        newChanges[currentEditingIndex].joueur_licence_sort = newOption.value;
        setChange(newChanges);
        
        setIsLoadingLicenceS(false);
    };

    const handleChangeSelectLicenceS = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_sort"
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
    }

    console.log("data", change);

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
        if (change.length === 1 && Object.keys(change[0]).length === 0 ||  change.every(item => Object.keys(item).length >= 9)) {
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
            console.log("obj", numberOfAttributes);
        });
        if (numberOfAttributes <= 9) {
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
                                                      <div className="row mt-1">
                                                          <Skeleton height={30} />
                                                      </div>
                                                  </SkeletonTheme>
                                              </div>
                    </>
                    :
                    <div className="row my-2">
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
                                    }}
                                >
                                    {change.map((item, index) => (
                                        <div className="row border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                            <div className="form-group col-md-3">
                                                <label>الفريق</label>
                                                <div className='my-2'>
                                                    <CreatableSelect className='text-light' options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder={`${state?.clubs.length > 0  ? 'اكتب و اختر' : 'اختر الفرق أعلاه !!'}`} />
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
                                                    <input type="text" name='joueur_num_entr' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
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
                                                        onCreateOption={handleCreateLicenceE}
                                                        options={optionsLicenceE}
                                                        value={change[index]?.joueur_licence_entr ? optionsLicenceE?.find((l) => l.value === change[index]?.joueur_licence_entr) : ""}
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
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
                                                        onCreateOption={handleCreateSort}
                                                        options={optionsJSort}
                                                        value={change[index]?.joueur_nom_sort ? optionsJSort?.find((l) => l.value === change[index]?.joueur_nom_sort) : ""}
                                                        placeholder="أكتب و اختر"
                                                        onFocus={() => handleFocusField(index)}
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
                                                        onCreateOption={handleCreateLicenceS}
                                                        options={optionsLicenceS}
                                                        value={change[index]?.joueur_licence_sort ? optionsLicenceS?.find((l) => l.value === change[index]?.joueur_licence_sort) : ""}
                                                        placeholder='أكتب و اختر'
                                                        onFocus={() => handleFocusField(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label >رقم الاعب الخارج</label>
                                                <div className='my-2'>
                                                    <input type="text" name='joueur_num_sort' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label >الدقيقة</label>
                                                <div className='my-2'>
                                                    <input type="text" name='minute' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark px-3 ms-1"></i></button>
                                            </div>
                                        </div>
                                    ))}
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
                    </div>}
        </>
    )
}
