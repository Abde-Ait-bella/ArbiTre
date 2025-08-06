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

    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const { user, club_1, club_2 } = AuthUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clubResponse, matcheRespose] = await Promise.all([
                    axiosClinet.get('/club'),
                    axiosClinet.get('/matche'),
                ]);

                const dataClubs = clubResponse.data.filter((c) => parseInt(c.user_id) === user?.id || c.user_id === null);

                const dataMatch = matcheRespose.data;
                if (!dataMatch || dataMatch.length === 0) {
                    var matchNamber = [0]
                } else (
                    matchNamber = dataMatch.map(item => item.id)
                )

                setState(prevData => ({
                    ...prevData,
                    clubs: dataClubs,
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))
                setLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        setPenaltyData_1([{},{},{},{},{}]);
        setPenaltyData_2([{},{},{},{},{}]);
    }, [club_1, club_2]);

    console.log('club_1', club_1)

    const [penaltyData_1, setPenaltyData_1] = useState([{},{},{},{},{}]);
    const [penaltyData_2, setPenaltyData_2] = useState([{},{},{},{},{}]);
    const [open, setOpen] = useState(false);

    const addPenalty = ()=>{
        setPenaltyData_1([...penaltyData_1, {}]);
        setPenaltyData_2([...penaltyData_2, {}]);
    }
    
    const Open = ()=>{
        setOpen(!open)
        if (!open) {
            setPenaltyData_1([{},{},{},{},{}]);
            setPenaltyData_2([{},{},{},{},{}]);
        }
    }

    const handleChange = (event, indexClub, indexPenalty) => {

        if (indexClub === 0 ) {
            const newPenalty = [...penaltyData_1];
            newPenalty[indexPenalty].club_id = club_1.value;
            newPenalty[indexPenalty].result = event.target.value;
            newPenalty[indexPenalty].opportunity = indexPenalty+1;
            newPenalty[indexPenalty].matche_id = state.matchNamber;
            setPenaltyData_1(newPenalty);
        }else{
            const newPenalty = [...penaltyData_2];
            newPenalty[indexPenalty].club_id = club_2.value;
            newPenalty[indexPenalty].result = event.target.value;
            newPenalty[indexPenalty].opportunity = indexPenalty+1;
            newPenalty[indexPenalty].matche_id = state.matchNamber;
            setPenaltyData_2(newPenalty);
        }
    }

    const SuppRow = () => {
        setError("")
        const newPenalty_1 = [...penaltyData_1];
        const newPenalty_2 = [...penaltyData_2];
        newPenalty_1.pop();
        newPenalty_2.pop();
        setPenaltyData_1(newPenalty_1);
        setPenaltyData_2(newPenalty_2);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {

    const penaltyData = penaltyData_1.concat(penaltyData_2)

    const isComplete = penaltyData.every(p => p.club_id && p.matche_id && p.opportunity && p.result);

        if (isComplete === true) {
            setError("")
            props.dataPenalty(penaltyData);
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
                                <div className="mt-4 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-4 row">
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
                                <div className="mx-1 mt-5 row">
                                    <Skeleton height={40} />
                                </div>

                                <div className="mx-2 mt-3 row">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="mt-3 col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="mt-3 col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="mt-3 col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                    <div className="mt-3 mb-2 col-12">
                                        <div className="mt-2">
                                            <Skeleton height={40} />
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </>
                    :
                    <div className="my-2 row">
                        <div className="col-md-12">
                            <div class=" card text-center bg-light text-white mx-1">
                                <div class="card-header bg-secondary fw-bold">
                                    ضربات الترجيح
                                </div>
                                <div class="card-body">
                                {
                                    open ?
                                        <div className="px-2 py-3 my-1 mt-3 border border-4 rounded row border-secondary">
         
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-primary rounded-pill' onClick={addPenalty}><i class="fa-solid fa-plus px-4"></i></button>
                                            </div>
                                            
                                            <div className="mt-4 mb-4 penalty row">
                                                <div className="form-group col-md-3">
                                                    <label>فريق</label>
                                                    <div className='my-2'>
                                                        <p className='fs-5'>{club_1 ? club_1.label : '...'}</p>
                                                    </div>
                                                </div>
                                                {club_1 ? penaltyData_1.map((_, index) => (
                                                    <div className={`form-group col-md-3 mb-2 ${(index != (penaltyData_1.length - 1)) ? " border-left" : ""}`} key={index}>
                                                        <label>الفرصة {index + 1}</label>
                                                        <div className="pt-3 d-flex justify-content-center ">
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-success border-0" type="radio" value={1} checked={penaltyData_1[index].result == 1 ? 1 : 0} name={`penelty${index}`} onChange={(event) => handleChange(event, 0, index)} id={`penaltyRadio${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio${index}`}>
                                                                    هدف
                                                                </label>
                                                            </div>
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-danger border-0" type="radio" value={0} checked={penaltyData_1[index].result == 0 ? 1 : 0} name={`penelty${index}`}  onChange={(event) => handleChange(event, 0, index)} id={`penaltyRadio1${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio1${index}`}>
                                                                    ضائع
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <span className='text-warning w-50 '>يجب اختيار الفرق أعلاه أولا<span className='text-warning me-2'>!!</span></span>}
                                                            
                                            </div>

                                            <div className="mb-4 penalty row">
                                                <div className="form-group col-md-3">
                                                    <label>فريق</label>
                                                    <div className='my-2'>
                                                        <p className='fs-5'>{club_2 ? club_2.label : '...'}</p>
                                                    </div>
                                                </div>
                                                {club_2 ? penaltyData_2.map((_, index) => (
                                                    <div className={`form-group col-md-3 mb-2 ${(index != (penaltyData_2.length - 1)) ? " border-left" : ""}`} key={index}>
                                                        <label>الفرصة {index + 1}</label>
                                                        <div className="pt-3 d-flex justify-content-center ">
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-success border-0" type="radio" value={1} name={`penelty_2${index}`} checked={penaltyData_2[index].result == 1 ? 1 : 0} onChange={(event) => handleChange(event, 1, index)} id={`penaltyRadio_2${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio_2${index}`}>
                                                                    هدف
                                                                </label>
                                                            </div>
                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input bg-danger border-0" type="radio" value={0} name={`penelty_2${index}`} checked={penaltyData_2[index].result == 0 ? 1 : 0} onChange={(event) => handleChange(event, 1, index)} id={`penaltyRadio2_2${index}`} />
                                                                <label class="form-check-label" for={`penaltyRadio2_2${index}`}>
                                                                    ضائع
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <span className='text-warning w-50 '>يجب اختيار الفرق أعلاه أولا<span className='text-warning me-2'>!!</span></span>}
                                            </div>

                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-danger moin rounded-pill' onClick={SuppRow}><i class="fa-solid fa-minus px-4"></i></button>
                                            </div>
                                   
                                        </div>
                                        : ""
                                }

                                        <div className='mt-2 d-flex justify-content-center'>
                                                <button className={`btn ${!open ? "btn-success" : "btn-danger"} border-white rounded-pill px-5 `} onClick={Open}>{`${!open ? "فتح" : "إغلق"}`}</button>
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
                    </div>
            }
        </>
    )
}
