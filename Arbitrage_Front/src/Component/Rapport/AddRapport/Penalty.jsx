import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axiosClinet } from '../../../Api/axios';
import { AuthUser } from '../../../AuthContext';
import Select from 'react-select';

export function Penalty(props) {

    const [state, setState] = useState({
        clubs: [],
    });

    const [buts, setButs] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const { user } = AuthUser();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clubResponse, matcheRespose] = await Promise.all([
                    axiosClinet.get('/club'),
                    axiosClinet.get('/matche'),
                ]);

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
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))
                setLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    
    const [penalty, setPenalty] = useState([{},{},{},{},{}]);
    const [twoClubs, setTwoClubs] = useState({});
    const [penaltyData, setPenaltyData] = useState([{},{},{},{},{},{},{},{},{},{}]);


    const addPenalty = ()=>{
        setPenaltyData([...penaltyData, {},{}]);
    }

    const handleChange = (event, indexClub, indexPenalty, indexOpportunity) => {

        const newPenalty = [...penaltyData];
        newPenalty[indexPenalty].club_id = Object.values(twoClubs)[indexClub];
        newPenalty[indexPenalty].result = event.target.value;
        newPenalty[indexPenalty].opportunity = indexOpportunity+1;
        newPenalty[indexPenalty].matche_id = state.matchNamber;
        setPenaltyData(newPenalty);

        console.log('penaltyData', penaltyData );
    }

    
    const handleChangeClub = (event, index) => {
        
        const club_1 = index == 0  ? event.target.value  : twoClubs.club_1_id;
        const club_2 = index == 1  ? event.target.value  : twoClubs.club_2_id;

        twoClubs.club_1_id = club_1;
        twoClubs.club_2_id = club_2;
    }


    const SuppRow = () => {
        setError("")
        const newPenalty = [...penalty];
        newPenalty.pop();
        setPenalty(newPenalty);
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
                !loading ?

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
                                    ضربات الترجيح
                                </div>
                                <div class="card-body">
                                        <div className="row border border-secondary border-4 rounded py-3 px-2 my-1 mt-3">

         
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-warning rounded-pill' onClick={addPenalty}><i class="fa-solid fa-plus mt-1 px-3"></i></button>
                                            </div>
                                            
                                            <div className="penalty row mb-4 mt-4">
                                                <div className="form-group col-md-3">
                                                    <label>الفريق</label>
                                                    <div className='my-2'>
                                                        <select isClearable   className='text-light' name='club_1' onChange={(event) => handleChangeClub(event, 0)} placeholder="اكتب و اختر" >

                                                        <option className='text-center' key="" value="">إختر النادي</option>
                                                            {state?.clubs.map(club => (
                                                                    <option className='text-center' key={club.value} value={club.value}>
                                                                    {club.label}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {penaltyData.slice(0, penaltyData.length / 2).map((_, index) => (
                                                    <div className="form-group col-md-3 border-left" key={index}>
                                                        <label>الفرصة {index + 1}</label>
                                                        <div className="d-flex justify-content-center pt-3 ">
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-success border-0" type="radio" value={1} name={`penelty${index}`} onChange={(event) => handleChange(event, 0, index, index)} id={`penaltyRadio${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio${index}`}>
                                                                    هدف
                                                                </label>
                                                            </div>
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-danger border-0" type="radio" value={0} name={`penelty${index}`}  onChange={(event) => handleChange(event, 0, index, index)} id={`penaltyRadio1${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio1${index}`}>
                                                                    ضائع
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                            
                                            </div>

                                            <div className="penalty row mb-4">
                                                <div className="form-group col-md-3">
                                                    <label>الفريق</label>
                                                    <div className='my-2'>
                                                    <select isClearable   className='text-light'  onChange={(event) => handleChangeClub(event, 1)} placeholder="اكتب و اختر" >
                                                            <option className='text-center' key="" value="">إختر النادي</option>
                                                            {state?.clubs.map(club => (
                                                                <option className='text-center' key={club.value} value={club.value}>
                                                                {club.label}
                                                                </option>
                                                                ))}
                                                    </select>
                                                    </div>
                                                </div>
                                                {penaltyData.slice(penaltyData.length / 2, penaltyData.length).map((p, index) => {
                                                    const indexPenalty = index + Math.floor(penaltyData.length / 2);
                                                    return(
                                                    <div className="form-group col-md-3 border-left" key={index}>
                                                        <label>الفرصة {index + 1}</label>
                                                        <div className="d-flex justify-content-center pt-3 ">
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-success border-0" type="radio" value={1} name={`penelty_2${index}`} onChange={(event) => handleChange(event, 1, indexPenalty, index)} id={`penaltyRadio_2${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio_2${index}`}>
                                                                    هدف
                                                                </label>
                                                            </div>
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-danger border-0" type="radio" value={0} name={`penelty_2${index}`}  onChange={(event) => handleChange(event, 1, indexPenalty, index)} id={`penaltyRadio2_2${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio2_2${index}`}>
                                                                    ضائع
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )})}
                                            </div>

                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-danger moin rounded-pill' onClick={SuppRow}><i class="fa-solid fa-xmark mt-1 px-3"></i></button>
                                                {/* <button className='btn btn-warning rounded-pill' onClick={addPenalty}><i class="fa-solid fa-plus mt-1 px-4"></i></button> */}
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
                    </div>
            }
        </>
    )
}
