import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../style/Rapport/DetailleRapport.css";
import { useState } from "react";
import { Header } from "./AddRapport/HeaderRapport";
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailleRapport() {
  // Ajouter un nouvel état pour le chargement du PDF
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [rapports, setRapports] = useState();
  const [arbitre, setArbitre] = useState();
  const [club, setClub] = useState();
  const [categories, setCategories] = useState();
  const [avertissemets, setAvertissemets] = useState();
  const [changements, setChangements] = useState();
  const [buts, setButs] = useState();
  const [ville, setVille] = useState();
  const [penalty, setPenalty] = useState();
  const [loading, setLoading] = useState(true);
  const [skypTable, setSkypTable] = useState(false);
  const [marginB, setMarginB] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axiosClinet.get("/matche").then((respense) => {
      setRapports(respense.data.find((r) => r.id === parseInt(id)));
    });

    axiosClinet.get("/arbitre").then((respense) => {
      setArbitre(respense.data);
    });

    axiosClinet.get("/club").then((respense) => {
      setClub(respense.data);
    });

    axiosClinet.get("/category").then((respense) => {
      setCategories(respense.data);
    });

    axiosClinet.get("/avertissement").then((respense) => {
      setAvertissemets(respense.data);
    });

    axiosClinet.get("/changement").then((respense) => {
      setChangements(respense.data);
    });

    axiosClinet.get("/but").then((respense) => {
      setButs(respense.data);
    });

    axiosClinet.get("/ville").then((respense) => {
      setVille(respense.data);
    });

    axiosClinet.get("/penalty").then((respense) => {
      setPenalty(respense.data);
      setLoading(false);
    });
  }, []);

  const componentRef = useRef();

  const handlePrint = () => {
    // Activer l'indicateur de chargement
    setIsPdfLoading(true);

    axiosClinet

      .get(`rapport/${id}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      })
      .then((response) => {
        // Désactiver l'indicateur de chargement
        setIsPdfLoading(false);

        // Vérifier que la réponse contient des données
        if (response.data.size === 0) {
          console.error("Le PDF reçu est vide");
          return;
        }

        // Créer un URL pour le blob
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Ouvrir le PDF dans un nouvel onglet
        window.open(url, '_blank');

        // Nettoyer l'URL créée après un délai
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      })
      .catch((error) => {
        // Désactiver l'indicateur de chargement en cas d'erreur
        setIsPdfLoading(false);
        console.error("Erreur lors de la récupération du PDF:", error);
        alert("Impossible de générer le rapport PDF");
      });
  }

  const avertissemetG = avertissemets?.filter(
    (a) => parseInt(a.matche_id) === parseInt(id) && a.type === "G"
  );
  const avertissemetR = avertissemets?.filter(
    (a) => parseInt(a.matche_id) === parseInt(id) && a.type === "R"
  );
  const changementClub1 = changements?.filter(
    (ch) =>
      parseInt(ch.matche_id) === parseInt(id) &&
      parseInt(ch.club_id) === parseInt(rapports?.club_id_1)
  );
  const changementClub2 = changements?.filter(
    (ch) =>
      parseInt(ch.matche_id) === parseInt(id) &&
      parseInt(ch.club_id) === parseInt(rapports?.club_id_2)
  );
  const But_1 = buts?.filter(
    (b) =>
      parseInt(b.matche_id) === parseInt(id) &&
      parseInt(b.club_id) === parseInt(rapports?.club_id_1)
  );
  const But_2 = buts?.filter(
    (b) =>
      parseInt(b.matche_id) === parseInt(id) &&
      parseInt(b.club_id) === parseInt(rapports?.club_id_2)
  );

  useEffect(() => {
    if (
      But_1?.length > 5 ||
      But_2?.length > 5 ||
      changementClub1?.length > 5 ||
      changementClub2?.length > 5
    ) {
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
      {loading ? (
        <div className="m-4 bg-white rounded">
          <div className="py-4 mb-4 container-lg-block d-flex justify-content-center px-lg-4 container-none row">
            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
              <div className="row">
                <div className="col-1">
                  <Skeleton height={45} width={53} />
                </div>
              </div>

              <div className="row">
                <div className="mt-4 col-4">
                  <Skeleton height={60} />
                </div>
                <div className="mt-4 col-4">
                  <Skeleton height={60} />
                </div>
                <div className="mt-4 col-4">
                  <Skeleton height={60} />
                </div>
              </div>

              <div className="mt-4 row">
                <div className="col-3 ps-1">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
                <div className="px-1 col-3">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
                <div className="px-1 col-3">
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
                <div className="px-1 col-3">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
                <div className="px-1 col-3">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
                <div className="col-3 pe-1">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
              </div>

              <div className="mt-4 row">
                <div className="col-6">
                  <Skeleton height={80} />
                </div>
                <div className="col-3">
                  <Skeleton height={80} />
                </div>
                <div className="col-3">
                  <Skeleton height={80} />
                </div>
              </div>

              <div className="mt-4 row">
                <div className="col-6">
                  <Skeleton height={150} />
                </div>
                <div className="col-6">
                  <Skeleton height={150} />
                </div>
              </div>

              <div className="mt-4 row">
                <div className="col-2 ps-1">
                  <Skeleton height={35} />
                  <Skeleton height={35} />
                </div>
              </div>
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div>
          <div
            dir="rtl"
            className="m-4 bg-white rounded detailleRapport"
            ref={componentRef}
          >
            <div className="print-content">
                      <button
                className="p-2 pb-1 btn_print pe-3 ps-3"
                onClick={handlePrint}
                disabled={isPdfLoading} // Désactiver le bouton pendant le chargement
              >
                {isPdfLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  <i className="fa-print fa-solid"></i>
                )}
              </button>
              <Header />
              <div className="rapport-title">
                <h3>تقريـــــــر الحكـــــم</h3>
              </div>
              <div className="container contentP table-responsive">
                <table className="table table-bordered text-dark">
                  <thead>
                    <tr>
                      <th className="p-0 px-3 th">المنافسة/الفئة : </th>
                      <th class="px-2 p-0">{rapports?.competition?.nom}</th>
                      <th class="px-2 p-0">
                        {
                          categories?.find(
                            (a) => a.id === rapports?.categorie_id
                          )?.nom
                        }
                      </th>
                      <th class="px-3 p-0 th">الساعة</th>
                      <th class="px-3 p-1">{rapports?.temps}</th>
                      <th class="px-2 p-0 th">حكم الساحة</th>
                      <th class="px-2 p-0">
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_c_id)
                          )
                          ?.prenom.toUpperCase()}{" "}
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_c_id)
                          )
                          ?.nom.toUpperCase()}
                      </th>
                      <th class="px-3 p-0 th">المدينة</th>
                      <th class="px-3 p-1">
                        {
                          ville?.find(
                            (a) => a.id === parseInt(rapports?.centre_ville)
                          )?.nom
                        }
                      </th>
                    </tr>
                    <tr>
                      <th className="p-0 px-3 th">المباراة</th>
                      <th className="p-0 px-2" colSpan={2}>
                        {
                          club?.find(
                            (c) => c.id === parseInt(rapports?.club_id_1)
                          )?.abbr
                        }{" "}
                        #{" "}
                        {
                          club?.find(
                            (c) => c.id === parseInt(rapports?.club_id_2)
                          )?.abbr
                        }
                      </th>
                      <th className="p-0 px-2 th">الملعب</th>
                      <th className="p-0 px-2">{rapports?.stade?.nom}</th>
                      <th className="p-0 px-2 th">الحكم المساعد 1</th>
                      <th className="p-0 px-2">
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_a1_id)
                          )
                          ?.prenom.toUpperCase()}{" "}
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_a1_id)
                          )
                          ?.nom.toUpperCase()}
                      </th>
                      <th className="p-0 px-2 th">المدينة</th>
                      <th className="p-0 px-2">
                        {
                          ville?.find(
                            (a) =>
                              a.id === parseInt(rapports?.assistant_1_ville)
                          )?.prenom
                        }{" "}
                        {
                          ville?.find(
                            (a) =>
                              a.id === parseInt(rapports?.assistant_1_ville)
                          )?.nom
                        }
                      </th>
                    </tr>
                    <tr>
                      <th className="p-0 px-2 th">النتيجة النهائية</th>
                      <th class="px-2 p-1" colSpan={2}>
                        {rapports?.result_club_1} - {rapports?.result_club_2}
                      </th>
                      <th class="px-2 p-0 th">المدينة</th>
                      <th class="px-2 p-0">{rapports?.ville?.nom}</th>
                      <th class="px-2 p-0 th">الحكم المساعد 2</th>
                      <th class="px-3 p-0">
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_a2_id)
                          )
                          ?.prenom.toUpperCase()}{" "}
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_a2_id)
                          )
                          ?.nom.toUpperCase()}
                      </th>

                      <th className="p-0 px-2 th">المدينة</th>
                      <th class="px-2 p-0">
                        {
                          ville?.find(
                            (a) =>
                              a.id === parseInt(rapports?.assistant_2_ville)
                          )?.nom
                        }
                      </th>
                    </tr>
                    <tr>
                      <th class="px-2 p-0 th">التاريخ</th>
                      <th className="p-0 px-2" colSpan={2}>
                        {rapports?.date}
                      </th>
                      <th class="px-2 p-0 th">المندوب</th>
                      <th className="p-0 px-2">
                        {rapports?.delegue?.prenom.toUpperCase()}{" "}
                        {rapports?.delegue?.nom.toUpperCase()}
                      </th>
                      <th class="px-2 p-0 th">الحكم الرابع</th>
                      <th class="px-3 p-0">
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_4_id)
                          )
                          ?.prenom.toUpperCase()}{" "}
                        {arbitre
                          ?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_4_id)
                          )
                          ?.nom.toUpperCase()}
                      </th>
                      <th class="px-2 p-0 th">المدينة</th>
                      <th class="px-2 p-0">
                        {
                          ville?.find(
                            (a) => a.id === parseInt(rapports?.arbitre_4_ville)
                          )?.nom
                        }
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    {/* Avertissement  */}
                    <div className="row">
                      <div className="table-responsive">
                        <table
                          className={`table table-bordered ${marginB ? "mb-0" : ""
                            } `}
                        >
                          <thead>
                            <tr>
                              <th
                                colSpan={5}
                                className="p-1 px-3 text-center text-dark th"
                              >
                                الانذارات
                              </th>
                            </tr>
                            <tr className="text-center">
                              <th className="p-1 px-3">الفريق</th>
                              <th className="p-1 px-3">إسم اللاعب</th>
                              <th className="p-1 px-3">الرخصة</th>
                              <th className="p-1 px-3">سبب الإنذار</th>
                              <th className="p-1 px-3">الدقيقة</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {avertissemetG?.length == 0 ? (
                              <tr className="text-center">
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                              </tr>
                            ) : (
                              avertissemetG?.map((a) => (
                                <tr>
                                  <th className="p-1 px-3">
                                    {
                                      club?.find(
                                        (c) => c.id === parseInt(a.club_id)
                                      )?.abbr
                                    }
                                  </th>
                                  <th className="p-1 px-3">
                                    {a?.nom.toUpperCase()}
                                  </th>
                                  <th className="p-1 px-3">
                                    {a.joueur_numero_licence}
                                  </th>
                                  <th className="p-1 px-3">{a.cause}</th>
                                  <th className="p-1 px-3">{a.minute}</th>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th
                                colSpan={5}
                                className="p-1 px-3 text-center text-dark th"
                              >
                                الطرد
                              </th>
                            </tr>
                            <tr className="text-center">
                              <th className="p-1 px-3">الفريق</th>
                              <th className="p-1 px-3">إسم اللاعب</th>
                              <th className="p-1 px-3">الرخصة</th>
                              <th className="p-1 px-3">سبب الطرد</th>
                              <th className="p-1 px-3">الدقيقة</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {avertissemetR?.length == 0 ? (
                              <tr className="text-center">
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                                <td className="py-1">-</td>
                              </tr>
                            ) : (
                              avertissemetR?.map((a) => (
                                <tr>
                                  <th className="p-1 px-3">
                                    {
                                      club?.find(
                                        (c) => c.id === parseInt(a.club_id)
                                      )?.abbr
                                    }
                                  </th>
                                  <th className="p-1 px-3">
                                    {a?.nom.toUpperCase()}
                                  </th>
                                  <th className="p-1 px-3">
                                    {a.joueur_numero_licence}
                                  </th>
                                  <th className="p-1 px-3">{a.cause}</th>
                                  <th className="p-1 px-3">{a.minute}</th>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Changements and Buts tables */}
                  <div className="col-md-6">
                    <div className="">
                      {/* Changement table */}
                      <div className="col-md">
                        <div className="table-responsive">
                          <div className="col-md-12 me-0 row">
                            <div className="p-0 sub-table-1">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={3}
                                      className="p-1 px-3 text-center th-border text-dark th"
                                    >
                                      التغييرات
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={3}
                                    >
                                      الفريق(أ) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_1)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <th className="p-1">خروج</th>
                                    <th className="p-1">دخول</th>
                                    <th className="p-1">الدقيقة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(changementClub1?.length === 0) &
                                    (RestCH1 === 0) ? (
                                    <tr className="text-center">
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                    </tr>
                                  ) : (
                                    changementClub1?.map((ch) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {ch.joueur_num_sort}
                                        </td>
                                        <td className="p-1">
                                          {ch.joueur_num_entr}
                                        </td>
                                        <td className="p-1">{ch.minute}</td>
                                      </tr>
                                    ))
                                  )}
                                  {RestCH1
                                    ? restCH_1.map((index) => (
                                      <tr
                                        className="text-center borderd"
                                        key={index}
                                      >
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                      </tr>
                                    ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                            <div className="p-0 sub-table-2">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={3}
                                      className="p-1 px-3 text-center th-border th"
                                    >
                                      -
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={3}
                                    >
                                      الفريق (ب) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_2)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <th className="p-1">خروج</th>
                                    <th className="p-1">دخول</th>
                                    <th className="p-1">الدقيقة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(changementClub2?.length === 0) &
                                    (RestCH2 === 0) ? (
                                    <tr className="text-center">
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                    </tr>
                                  ) : (
                                    changementClub2?.map((ch) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {ch.joueur_num_sort}
                                        </td>
                                        <td className="p-1">
                                          {ch.joueur_num_entr}
                                        </td>
                                        <td className="p-1">{ch.minute}</td>
                                      </tr>
                                    ))
                                  )}
                                  {RestCH2
                                    ? restCH_2.map((index) => (
                                      <tr
                                        className="text-center borderd"
                                        key={index}
                                      >
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                      </tr>
                                    ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* penalty table */}
                      <div className="col-md">
                        <div className="table-responsive">
                          <div className="col-md-12 me-0 row">
                            <div className="p-0 sub-table-1">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={6}
                                      className="p-1 px-3 text-center th-border text-dark th"
                                    >
                                      ضربات الترجيح
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={6}
                                    >
                                      الفريق(أ) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_1)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 1
                                      )?.result}
                                    </td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 2
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 2
                                    )?.result : "-"}</td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 3
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 3
                                      )?.result : "-"}
                                    </td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 4
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 4
                                      ).result : "-"}
                                    </td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 5
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 5
                                      ).result : "-"}
                                    </td>
                                    <td className="p-1" rowSpan={2}>
                                      مجموع الأهداف
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {(But_1?.length === 0) & (RestBUT1 === 0) ? ( */}
                                  <tr className="text-center">
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 6
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 6
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 7
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 7
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 8
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 8
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 9
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 9
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 10
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 10
                                    ).result : "-"}</td>
                                    <td className="p-1" rowSpan={2}>0
                                      {penalty?.filter(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.result === 1
                                      ).length}
                                    </td>
                                  </tr>
                                  {
                                    penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 11
                                    ) ?
                                      <tr className="text-center border-top-0">
                                        <td className="p-1">{penalty?.find(
                                          (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 11
                                        )?.result}
                                        </td>
                                        <td className="p-1">{
                                          penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 12
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 12
                                          )?.result : "-"
                                        }
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 13
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 13
                                          )?.result : "-"}
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 14
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 14
                                          )?.result : "-"}
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 15
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_1) && p.opportunity === 15
                                          )?.result : "-"}
                                        </td>
                                      </tr>
                                      : ""
                                  }
                                  {/* ) : (
                                    But_1?.map((b) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {b.joueur_numero}
                                        </td>
                                        <td className="p-1">{b.minute}</td>
                                      </tr>
                                    ))
                                  )} */}
                                  {/* {RestBUT1
                                    ? restBUT_1.map((index) => (
                                        <tr
                                          className="text-center borderd"
                                          key={index}
                                        >
                                          <td className="p-1">-</td>
                                          <td className="p-1">-</td>
                                          <td className="p-1">-</td>
                                          <td className="p-1">-</td>
                                          <td className="p-1">-</td>
                                          <td className="p-1" rowSpan={2}>
                                            مجموع الأهداف
                                          </td>
                                        </tr>
                                      ))
                                    : ""} */}
                                </tbody>
                              </table>
                            </div>
                            <div className="p-0 sub-table-2">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={6}
                                      className="p-1 px-3 text-center th-border th"
                                    >
                                      -
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={6}
                                    >
                                      الفريق(ب) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_2)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 1
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 1
                                      )?.result : "-"}
                                    </td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 2
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 2
                                    )?.result : "-"}</td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 3
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 3
                                      )?.result : "-"}
                                    </td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 4
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 4
                                      ).result : "-"}
                                    </td>
                                    <td className="p-1">
                                      {penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 5
                                      ) ? penalty?.find(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 5
                                      ).result : "-"}
                                    </td>
                                    <td className="p-1" rowSpan={2}>
                                      مجموع الأهداف
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="text-center">
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 6
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 6
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 7
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 7
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 8
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 8
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 9
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 9
                                    ).result : "-"}</td>
                                    <td className="p-1">{penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 10
                                    ) ? penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 10
                                    ).result : "-"}</td>
                                    <td className="p-1" rowSpan={2}>{penalty?.filter(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.result === 1
                                    ).length < 10 ? "0" : ""}
                                      {penalty?.filter(
                                        (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.result === 1
                                      ).length}
                                    </td>
                                  </tr>
                                  {
                                    penalty?.find(
                                      (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 11
                                    ) ?
                                      <tr className="text-center border-top-0">
                                        <td className="p-1">{penalty?.find(
                                          (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 11
                                        )?.result}
                                        </td>
                                        <td className="p-1">{
                                          penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 12
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 12
                                          )?.result : "-"
                                        }
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 13
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 13
                                          )?.result : "-"}
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 14
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 14
                                          )?.result : "-"}
                                        </td>
                                        <td className="p-1">
                                          {penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 15
                                          ) ? penalty?.find(
                                            (p) => p.matche_id === parseInt(id) && p.club_id === parseInt(rapports.club_id_2) && p.opportunity === 15
                                          )?.result : "-"}
                                        </td>
                                      </tr>
                                      : ""
                                  }
                                  {/* ) : (
                                    But_2?.map((b) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {b.joueur_numero}
                                        </td>
                                        <td className="p-1">{b.minute}</td>
                                      </tr>
                                    ))
                                  )}
                                  {RestBUT2
                                    ? restBUT_2.map((index) => (
                                        <tr
                                          className="text-center borderd"
                                          key={index}
                                        >
                                          <td className="py-1">-</td>
                                          <td className="py-1">-</td>
                                          <td className="py-1">-</td>
                                        </tr>
                                      ))
                                    : ""} */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Buts table */}
                      <div className="col-md">
                        <div className="table-responsive">
                          <div className="col-md-12 me-0 row">
                            <div className="p-0 sub-table-1">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={3}
                                      className="p-1 px-3 text-center th-border text-dark th"
                                    >
                                      الأهداف
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={3}
                                    >
                                      الفريق(أ) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_1)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <th className="p-1">الرقم</th>
                                    <th className="p-1">اسم الاعب</th>
                                    <th className="p-1">الدقيقة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {console.log("penalty", penalty)}
                                  {(But_1?.length === 0) & (RestBUT1 === 0) ? (
                                    <tr className="text-center">
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                    </tr>
                                  ) : (
                                    But_1?.map((b) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {b.joueur_numero}
                                        </td>
                                        <td className="p-1">{b.joueur_nom}</td>
                                        <td className="p-1">{b.minute}</td>
                                      </tr>
                                    ))
                                  )}
                                  {RestBUT1
                                    ? restBUT_1.map((index) => (
                                      <tr
                                        className="text-center borderd"
                                        key={index}
                                      >
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                      </tr>
                                    ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                            <div className="p-0 sub-table-2">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th
                                      colSpan={3}
                                      className="p-1 px-3 text-center th-border th"
                                    >
                                      -
                                    </th>
                                  </tr>
                                  <tr>
                                    <th
                                      className="p-1 px-0 text-center"
                                      colSpan={3}
                                    >
                                      الفريق(ب) :{" "}
                                      {
                                        club?.find(
                                          (c) =>
                                            c.id ===
                                            parseInt(rapports?.club_id_2)
                                        )?.abbr
                                      }
                                    </th>
                                  </tr>
                                  <tr className="text-center border-top-0">
                                    <th className="p-1">الرقم</th>
                                    <th className="p-1">اسم الاعب</th>
                                    <th className="p-1">الدقيقة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(But_2?.length === 0) & (RestBUT2 === 0) ? (
                                    <tr className="text-center">
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                      <td className="p-1">-</td>
                                    </tr>
                                  ) : (
                                    But_2?.map((b) => (
                                      <tr className="text-center">
                                        <td className="p-1">
                                          {b.joueur_numero}
                                        </td>
                                        <td className="p-1">{b.joueur_nom}</td>
                                        <td className="p-1">{b.minute}</td>
                                      </tr>
                                    ))
                                  )}
                                  {RestBUT2
                                    ? restBUT_2.map((index) => (
                                      <tr
                                        className="text-center borderd"
                                        key={index}
                                      >
                                        <td className="py-1">-</td>
                                        <td className="py-1">-</td>
                                      </tr>
                                    ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                                                <div className={`col-md-12 ${skypTable ? "page-break" : ""}`}>
                                                    <table className={`table ${skypTable ? "contentP2" : ""}`}>
                                                        <thead>
                                                            <tr className="text-center text-dark">
                                                                <th scope="col" className="p-1">الأحداث المسجلة قبل, أثناء و بعد المباراة : </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="text-dark">
                                                                <th scope="row">1.	توقيت حضور مراقب المباراة : <p className="mb-0 text-center">{rapports?.temp_presence_delegue}</p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>2. توقيت حضور رجال الأمن مع الإشارة الى العدد : <p className="mt-2 mb-0 text-center"><span>التوقيت : {rapports?.temp_presence_agents_sécurité}</span> <span className="me-2">العدد : {rapports?.nombre_agents_sécurité}</span></p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>3. أرضية الملعب : <p className="mb-0 text-center">{rapports?.etat_stade}</p></th>
                                                            </tr>
                                                            <tr className="text-dark">
                                                                <th>4. مستودع  ملابس الحكام : <p className="mb-0 text-center">{rapports?.etat_vestiaire}</p></th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row">
                                                    <p className="fw-bold">دق. : الدقيقة / خ. : خر ج / د. : دخل  / ف.م. : الفريق المضيف / ف.ز. : الفريق الزائر</p>
                                                </div>
                                            </div> */}
                  </div>
                </div>
                <div
                  className="mt-5 expl-content01"
                  style={{ fontSize: "11px" }}
                >
                  <p className="d-flex align-items-center">
                    (*) في حالة ركلات الترجيحية , يتم تعبئة الخانة كالآتي :
                    تسجيل الركلة :
                    <table className="table w-auto table-bordered me-2 ms-2">
                      <thead>
                        <tr>
                          <th
                            style={{
                              lineHeight: "0px",
                              paddingTop: "11px",
                              fontSize: "7px",
                            }}
                          >
                            09
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              lineHeight: "1px",
                              fontFamily: "FontAwesome",
                              paddingRight: "10px",
                              fontSize: "7px",
                            }}
                          >
                            X
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    ضياع الركلة الترجيحية :
                    <table className="table w-auto table-bordered me-2">
                      <thead>
                        <tr>
                          <th
                            style={{
                              lineHeight: "0px",
                              paddingTop: "11px",
                              fontSize: "7px",
                            }}
                          >
                            09
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              lineHeight: "1px",
                              fontFamily: "FontAwesome",
                              paddingRight: "10px",
                              fontSize: "7px",
                            }}
                          >
                            O
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                </div>
              </div>
              <div
                className={` container ${skypTable ? "" : "page-break contentP2"
                  }`}
              >
                <div className="expl-content02">
                  <p>
                    يشار هنا إلى جميع الأحداث المسجلة قبل وأثناء وبعد المباراة
                    مع تحديد حالةالملعب وتصرفات الجمهور
                  </p>
                </div>
                <div>
                  <label>
                    <p className="mt-3 text-dark fs-6 ligne">
                      {rapports?.rapport_supp}
                    </p>
                  </label>
                </div>
                <div className="ligne signature">
                  <label htmlFor="" className="text-dark fs-6">
                    حرر في مدينة :{" "}
                  </label>
                  <label htmlFor="" className="text-dark fs-6">
                    بتاريخ :{" "}
                  </label>
                  <label htmlFor="" className="text-dark fs-6">
                    إمضاء الحكم :{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DetailleRapport;
