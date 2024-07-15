import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../style/Rapport/DetailleRapport.css";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Header } from "./AddRapport/HeaderRapport";
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



function DetailleRapport() {

    const [rapports, setRapports] = useState();
    const [arbitre, setArbitre] = useState();
    const [club, setClub] = useState();
    const [categories, setCategories] = useState();
    const [avertissemets, setAvertissemets] = useState();
    const [changements, setChangements] = useState();
    const [buts, setButs] = useState();
    const [ville, setVille] = useState();
    const [loading, setLoading] = useState(true);
    const [skypTable, setSkypTable] = useState(false);
    const [marginB, setMarginB] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axiosClinet.get('/matche')
            .then((respense) => {
                setRapports(respense.data.find((r) => r.id === parseInt(id)))
            })

        axiosClinet.get('/arbitre')
            .then((respense) => {
                setArbitre(respense.data)
            })

        axiosClinet.get('/club')
            .then((respense) => {
                setClub(respense.data)
            })

        axiosClinet.get('/category')
            .then((respense) => {
                setCategories(respense.data)
            })

        axiosClinet.get('/avertissement')
            .then((respense) => {
                setAvertissemets(respense.data)
            })

        axiosClinet.get('/changement')
            .then((respense) => {
                setChangements(respense.data)
            })

        axiosClinet.get('/but')
            .then((respense) => {
                setButs(respense.data)
            })

        axiosClinet.get('/ville')
            .then((respense) => {
                setVille(respense.data)
                setLoading(false)
            })

    }, [])

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
            @media print {
                @page {
                    size: auto; /* Utilisez la taille automatique pour permettre le positionnement absolu */
                }
                
                .print-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
            
                .contentP {
                    margin-top: 75px; 
                }
                .contentP2 {
                    margin-top: 125px; 
                }
                .signature{
                    margin-top: 50px;
                }
                .page-break {
                    page-break-before: always; /* Ajoutez cette ligne */
                    display: block;
                    align-items: center;
                    content: "";
                }

                .btn_print {
                    display: none;
                  }
            
                body {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
            }
        `,
    });


    const avertissemetG = avertissemets?.filter((a) => parseInt(a.matche_id) === parseInt(id) && a.type === "G");
    const avertissemetR = avertissemets?.filter((a) => parseInt(a.matche_id) === parseInt(id) && a.type === "R");
    const changementClub1 = changements?.filter((ch) => parseInt(ch.matche_id) === parseInt(id) && parseInt(ch.club_id) === parseInt(rapports?.club_id_1));
    const changementClub2 = changements?.filter((ch) => parseInt(ch.matche_id) === parseInt(id) && parseInt(ch.club_id) === parseInt(rapports?.club_id_2));
    const But_1 = buts?.filter((b) => parseInt(b.matche_id) === parseInt(id) && parseInt(b.club_id) === parseInt(rapports?.club_id_1));
    const But_2 = buts?.filter((b) => parseInt(b.matche_id) === parseInt(id) && parseInt(b.club_id) === parseInt(rapports?.club_id_2));

    useEffect(() => {
        if (But_1?.length > 5 || But_2?.length > 5 || changementClub1?.length > 5 || changementClub2?.length > 5) {
            setSkypTable(true);
        } else {
            setSkypTable(false);
        }
    }, [But_1, But_2]);


    useEffect(() => {
        if (avertissemetG?.length + avertissemetR?.length > 16) {
            setMarginB(true);
        } else {
            setMarginB(false);
        }
    }, [But_1, But_2]);

    //Gestion column table Changements

    const [RestBUT1, setRestBUT1] = useState();
    const [RestBUT2, setRestBUT2] = useState();

    const restBUT = parseInt(But_1?.length - But_2?.length);

    useEffect(() => {
        if (But_1?.length > But_2?.length) {
            setRestBUT2(Math.abs(restBUT));
        } else if (But_1?.length < But_2?.length) {
            setRestBUT1(Math.abs(restBUT));
        } else {
            setRestBUT1(0);
            setRestBUT2(0);
        }
    }, [But_1, But_2, restBUT]);

    // Utiliser Array.from avec une fonction de rappel
    const restBUT_2 = Array.from({ length: RestBUT2 }, (_, index) => index + 1);
    const restBUT_1 = Array.from({ length: RestBUT1 }, (_, index) => index + 1);

    //Gestion column table Changements 

    const [RestCH1, setRestCH1] = useState();
    const [RestCH2, setRestCH2] = useState();

    const restCH = parseInt(changementClub1?.length - changementClub2?.length);

    useEffect(() => {
        if (changementClub1?.length > changementClub2?.length) {
            setRestCH2(Math.abs(restCH));
        } else if (changementClub1?.length < changementClub2?.length) {
            setRestCH1(Math.abs(restCH));
        } else {
            setRestCH1(0);
            setRestCH2(0);
        }
    }, [changementClub1, changementClub2, restCH]);

    // Utiliser Array.from avec une fonction de rappel
    const restCH_2 = Array.from({ length: RestCH2 }, (_, index) => index + 1);
    const restCH_1 = Array.from({ length: RestCH1 }, (_, index) => index + 1);


    return (
        <>
            {
                loading ?

                    <div className="bg-white m-4 rounded">
                        <div className="row container-none container-lg-block mb-4 px-lg-4 py-4 d-flex justify-content-center">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row">
                                    <div className="col-1">
                                        <Skeleton height={45} width={53} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4 mt-4">
                                        <Skeleton height={60} />
                                    </div>
                                    <div className="col-4 mt-4">
                                        <Skeleton height={60} />
                                    </div>
                                    <div className="col-4 mt-4">
                                        <Skeleton height={60} />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-3 ps-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 px-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 px-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 pe-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 ps-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 px-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 px-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-3 pe-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-6">
                                        <Skeleton height={80} />
                                    </div>
                                    <div className="col-3 ">
                                        <Skeleton height={80} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={80} />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-6">
                                        <Skeleton height={150} />
                                    </div>
                                    <div className="col-6">
                                        <Skeleton height={150} />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-2 ps-1">
                                        <Skeleton height={35} />
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div >

                    :
                    < div >
                        <div dir="rtl" className="detailleRapport bg-white m-4 rounded" ref={componentRef}>
                            <div className="print-content">
                                <button className="p-2 pb-1 btn_print ps-3 pe-3" onClick={handlePrint}><i class="fa-solid fa-print"></i></button>
                                <Header />
                                <div className="container table-responsive contentP">
                                    <table className="table table-bordered text-dark">
                                        <thead>
                                            <tr>
                                                <th class="p-1 px-3">الموسم الرياضي : {rapports?.saison?.nom}</th>
                                                <th class="p-1 px-3">التاريخ : {rapports?.date}</th>
                                                <th class="p-1 px-3"><span className="ms-3">الحكم :</span> {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_c_id))?.prenom.toUpperCase()} {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_c_id))?.nom.toUpperCase()}</th>
                                                <th class="p-1 px-3">المدينة : {ville?.find((a) => a.id === parseInt(rapports?.centre_ville))?.nom}</th>
                                            </tr>
                                            <tr>
                                                <th class="p-1 px-3">المقابلة: {club?.find((c) => c.id === parseInt(rapports?.club_id_1))?.abbr} # {club?.find((c) => c.id === parseInt(rapports?.club_id_2))?.abbr}</th>
                                                <th class="p-1 px-3">التوقيت : {rapports?.temps}</th>
                                                <th class="p-1 px-3"><span className="ms-3">المساعد 1 :</span> {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_a1_id))?.prenom.toUpperCase()} {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_a1_id))?.nom.toUpperCase()}</th>
                                                <th class="p-1 px-3">المدينة : {ville?.find((a) => a.id === parseInt(rapports?.assistant_1_ville))?.prenom} {ville?.find((a) => a.id === parseInt(rapports?.assistant_1_ville))?.nom}</th>
                                            </tr>
                                            <tr>
                                                <th class="p-1 px-3">النتيجة : {rapports?.result_club_1} - {rapports?.result_club_2}</th>
                                                <th class="p-1 px-3">الملعب : {rapports?.stade?.nom}</th>
                                                <th class="p-1 px-3" ><span className="ms-3">المساعد 2 :</span> {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_a2_id))?.prenom.toUpperCase()} {arbitre?.find((a) => a.id === parseInt(rapports?.arbitre_a2_id))?.nom.toUpperCase()}</th>
                                                <th class="p-1 px-3">المدينة : {ville?.find((a) => a.id === parseInt(rapports?.assistant_2_ville))?.nom}</th>
                                            </tr>
                                            <tr>
                                                <th class="p-1 px-3">المنافسة : {rapports?.competition?.nom} <span className="me-5">الفئة : {categories?.find((a) => a.id === rapports?.categorie_id)?.nom}</span></th>
                                                <th class="p-1 px-3">المدينة : {rapports?.stade?.ville?.nom}</th>
                                                <th class="p-1 px-3"><span className="ms-3">المراقب :</span> {rapports?.delegue?.prenom.toUpperCase()} {rapports?.delegue?.nom.toUpperCase()}</th>
                                                <th class="p-1 px-3">المدينة : {ville?.find((a) => a.id === parseInt(rapports?.delegue_ville))?.nom}</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* Avertissement */}
                                            <div className="row">
                                                <div className="table-responsive">
                                                    <table className={`table table-bordered ${marginB ? "mb-0" : ""} `}>
                                                        <thead>
                                                            <tr>
                                                                <th colSpan={5} className="bg-dark p-1 px-3 text-white">الاندارات :</th>
                                                            </tr>
                                                            <tr className="text-center">
                                                                <th className="p-1 px-3">الفريق</th>
                                                                <th className="p-1 px-3">إسم اللاعب</th>
                                                                <th className="p-1 px-3">رقم الرخصة</th>
                                                                <th className="p-1 px-3">سبب الإنذار</th>
                                                                <th className="p-1 px-3">دق.</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="text-center">
                                                            {avertissemetG?.length == 0 ?
                                                                <tr className="text-center">
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                </tr>
                                                                : avertissemetG?.map((a) => (
                                                                    <tr>
                                                                        <th className="p-1 px-3">{club?.find((c) => c.id === parseInt(a.club_id))?.abbr}</th>
                                                                        <th className="p-1 px-3">{a?.nom.toUpperCase()}</th>
                                                                        <th className="p-1 px-3">{a.joueur_numero_licence}</th>
                                                                        <th className="p-1 px-3">{a.cause}</th>
                                                                        <th className="p-1 px-3">{a.minute}</th>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan={5} className="bg-dark p-1 px-3 text-white">الطرد :</th>
                                                            </tr>
                                                            <tr className="text-center">
                                                                <th className="p-1 px-3">الفريق</th>
                                                                <th className="p-1 px-3">إسم اللاعب</th>
                                                                <th className="p-1 px-3">رقم الرخصة</th>
                                                                <th className="p-1 px-3">سبب الطرد</th>
                                                                <th className="p-1 px-3">دق.</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="text-center">
                                                            {avertissemetR?.length == 0 ?
                                                                <tr className="text-center">
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                    <td className="py-1">-</td>
                                                                </tr>
                                                                : avertissemetR?.map((a) => (
                                                                    <tr>
                                                                        <th className="p-1 px-3">{club?.find((c) => c.id === parseInt(a.club_id))?.abbr}</th>
                                                                        <th className="p-1 px-3">{a?.nom.toUpperCase()}</th>
                                                                        <th className="p-1 px-3">{a.joueur_numero_licence}</th>
                                                                        <th className="p-1 px-3">{a.cause}</th>
                                                                        <th className="p-1 px-3">{a.minute}</th>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Changements and Buts tables */}
                                        <div className="col-md-6">
                                            <div className="row">
                                                {/* Changement table */}
                                                <div className="col-md-6">
                                                    <div className="table-responsive">
                                                        <div className="row col-md-12 me-0">
                                                            <div className="p-0 sub-table-1">
                                                                <table className="table table-bordered">
                                                                    <thead>

                                                                        <tr>
                                                                            <th colSpan={3} className="bg-dark p-1 px-3 text-white">التغييرات :</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="p-1 px-0 text-center" colSpan={3}>ف.م : {club?.find((c) => c.id === parseInt(rapports?.club_id_1))?.abbr}</th>
                                                                        </tr>
                                                                        <tr className="text-center border-top-0">
                                                                            <th className="p-1">خ : </th>
                                                                            <th className="p-1">د : </th>
                                                                            <th className="p-1">دق : </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {changementClub1?.length === 0 & RestCH1 === 0
                                                                            ?
                                                                            <tr className="text-center">
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                            </tr>
                                                                            : changementClub1?.map((ch) => (
                                                                                <tr className="text-center">
                                                                                    <td className="p-1">{ch.joueur_num_sort}</td>
                                                                                    <td className="p-1">{ch.joueur_num_entr}</td>
                                                                                    <td className="p-1">{ch.minute}</td>
                                                                                </tr>
                                                                            ))}
                                                                        {RestCH1 ?
                                                                            restCH_1.map((index) => (
                                                                                <tr className="text-center borderd" key={index}>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                </tr>
                                                                            ))
                                                                            :
                                                                            ""
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="p-0 sub-table-2">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan={3} className="bg-dark p-1 px-3 text-dark">-</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="p-1 px-0 text-center" colSpan={3}>ف.ز : {club?.find((c) => c.id === parseInt(rapports?.club_id_2))?.abbr}</th>
                                                                        </tr>
                                                                        <tr className="text-center border-top-0">
                                                                            <th className="p-1">خ : </th>
                                                                            <th className="p-1">د : </th>
                                                                            <th className="p-1">دق : </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {changementClub2?.length === 0 & RestCH2 === 0
                                                                            ?
                                                                            <tr className="text-center">
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                            </tr>
                                                                            :
                                                                            changementClub2?.map((ch) => (
                                                                                <tr className="text-center">
                                                                                    <td className="p-1">{ch.joueur_num_sort}</td>
                                                                                    <td className="p-1">{ch.joueur_num_entr}</td>
                                                                                    <td className="p-1">{ch.minute}</td>
                                                                                </tr>
                                                                            ))}
                                                                        {RestCH2 ?
                                                                            restCH_2.map((index) => (
                                                                                <tr className="text-center borderd" key={index}>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                </tr>
                                                                            ))
                                                                            :
                                                                            ""
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Buts table */}
                                                <div className="col-md-6">
                                                    <div className="table-responsive">
                                                        <div className="row col-md-12 me-0">
                                                            <div className="p-0 sub-table-1">
                                                                <table className="table table-bordered">
                                                                    <thead>

                                                                        <tr>
                                                                            <th colSpan={3} className="bg-dark p-1 px-3 text-white">الأهداف :</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="p-1 px-0 text-center" colSpan={3}>ف.م : {club?.find((c) => c.id === parseInt(rapports?.club_id_1))?.abbr}</th>
                                                                        </tr>
                                                                        <tr className="text-center border-top-0">
                                                                            <th className="p-1">الرقم : </th>
                                                                            <th className="p-1">دق : </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {But_1?.length === 0 & RestBUT1 === 0
                                                                            ?
                                                                            <tr className="text-center">
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                            </tr>
                                                                            :
                                                                            But_1?.map((b) => (
                                                                                <tr className="text-center">
                                                                                    <td className="p-1">{b.joueur_numero}</td>
                                                                                    <td className="p-1">{b.minute}</td>
                                                                                </tr>
                                                                            ))}
                                                                        {RestBUT1 ?
                                                                            restBUT_1.map((index) => (
                                                                                <tr className="text-center borderd" key={index}>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                </tr>
                                                                            ))
                                                                            :
                                                                            ""
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="p-0 sub-table-2">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan={3} className="bg-dark p-1 px-3 text-dark">-</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="p-1 px-0 text-center" colSpan={3}>ف.ز : {club?.find((c) => c.id === parseInt(rapports?.club_id_2))?.abbr}</th>
                                                                        </tr>
                                                                        <tr className="text-center border-top-0">
                                                                            <th className="p-1">الرقم : </th>
                                                                            <th className="p-1">دق : </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {But_2?.length === 0 & RestBUT2 === 0
                                                                            ?
                                                                            <tr className="text-center">
                                                                                <td className="p-1">-</td>
                                                                                <td className="p-1">-</td>
                                                                            </tr>
                                                                            :
                                                                            But_2?.map((b) => (
                                                                                <tr className="text-center">
                                                                                    <td className="p-1">{b.joueur_numero}</td>
                                                                                    <td className="p-1">{b.minute}</td>
                                                                                </tr>
                                                                            ))}
                                                                        {RestBUT2 ?
                                                                            restBUT_2.map((index) => (
                                                                                <tr className="text-center borderd" key={index}>
                                                                                    <td className="py-1">-</td>
                                                                                    <td className="py-1">-</td>
                                                                                </tr>
                                                                            ))
                                                                            :
                                                                            ""
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className={`col-md-12 ${skypTable ? "page-break" : ""}`}>
                                                    <table className={`table ${skypTable ? "contentP2" : ""}`}>
                                                        <thead>
                                                            <tr className="text-center bg-dark text-white">
                                                                <th scope="col" className="p-1">الأحداث المسجلة قبل, أثناء و بعد المباراة : </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="text-dark">
                                                                <th scope="row">1.	توقيت حضور مراقب المباراة : <p className="text-center mb-0">{rapports?.temp_presence_delegue}</p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>2. توقيت حضور رجال الأمن مع الإشارة الى العدد : <p className="text-center mb-0 mt-2"><span>التوقيت : {rapports?.temp_presence_agents_sécurité}</span> <span className="me-2">العدد : {rapports?.nombre_agents_sécurité}</span></p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>3. أرضية الملعب : <p className="text-center mb-0">{rapports?.etat_stade}</p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>4. مستودع  ملابس الحكام : <p className="text-center mb-0">{rapports?.etat_vestiaire}</p></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row">
                                                    <p className="fw-bold">دق. : الدقيقة / خ. : خر ج / د. : دخل  / ف.م. : الفريق المضيف / ف.ز. : الفريق الزائر</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={` container ${skypTable ? "" : "page-break contentP2"}`}>
                                    <div>
                                        <label htmlFor="" className="fw-bold fs-5 text-dark text-center mb-5">التقرير الإضافي :
                                            <p className="mt-3 text-dark fs-5">{rapports?.rapport_supp}</p></label>
                                    </div>
                                    <div className="signature">
                                        <label htmlFor="" className="fw-bold fs-5 text-dark">توقيع الحكم : </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
            }
        </>
    )

}
export default DetailleRapport;