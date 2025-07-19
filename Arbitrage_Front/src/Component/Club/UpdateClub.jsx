import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUpdateHandler } from '../Utils/useUpdateHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { FormInput, FormSelect, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function UpdateClub() {
    const [villes, setVilles] = useState([]);
    const [stades, setStades] = useState([]);
    const [relatedDataLoading, setRelatedDataLoading] = useState(true);
    const { user } = AuthUser();

    const {
        register,
        handleSubmit,
        errors,
        loading,
        submitLoading,
        submitError
    } = useUpdateHandler(
        validationSchemas.club,
        '/club',
        '/dashboard/composants/updatedClub',
        '/club'
    );

    useEffect(() => {
        const fetchRelatedData = async () => {
            try {
                const [villesRes, stadesRes] = await Promise.all([
                    axiosClinet.get('/ville'),
                    axiosClinet.get('/stade')
                ]);

                const filteredVilles = villesRes.data.filter(
                    (v) => parseInt(v.user_id) === user?.id || v.user_id === null
                );
                const filteredStades = stadesRes.data.filter(
                    (s) => parseInt(s.user_id) === user?.id || s.user_id === null
                );

                setVilles(filteredVilles);
                setStades(filteredStades);
            } catch (error) {
                console.error('Error fetching related data:', error);
            } finally {
                setRelatedDataLoading(false);
            }
        };

        fetchRelatedData();
    }, [user?.id]);

    if (loading || relatedDataLoading) {
        return (
            <div className="my-4 d-flex justify-content-center">
                <div className="text-center col-sm-12 col-xl-6 d-none d-lg-block">
                    <div className="p-4 rounded bg-secondary h-100">
                        <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-5">
                                    <Skeleton height={40} />
                                </div>
                            </div>
                            <div className="mt-4 row">
                                <div className="col-2">
                                    <Skeleton height={35} />
                                </div>
                                <div className="col-10">
                                    <Skeleton height={35} />
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="col-2">
                                    <div className="mt-2">
                                    </div>
                                </div>
                                <div className="col-10">
                                    <div className="mt-2">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="col-12">
                                    <div className="mt-2">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="col-12">
                                    <div className="mt-2">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 row d-flex justify-content-between">
                                <div className="col-3">
                                    <div className="mt-2">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mt-2">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                            </div>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-4 d-flex justify-content-center">
            <div className="text-center col-sm-12 col-xl-6">
                <div className="p-4 rounded bg-secondary h-100">
                    <div className="mb-3 d-flex justify-content-start">
                        <Link to="/dashboard/composants/clubs" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                            رجـــوع
                        </Link>
                    </div>
                    
                    <div className="mb-4">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-edit ms-3"></i>
                            تعديل النادي
                        </h2>
                        <p className="mb-0 text-white-50">عدّل بيانات النادي</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <ErrorAlert error={submitError} />

                        <div className="row">
                            <div className="col-12">
                                <FormInput
                                    label="اسم النادي"
                                    name="nom"
                                    placeholder="أدخل الاسم الكامل للنادي"
                                    register={register}
                                    error={errors.nom}
                                    icon="fas fa-shield-alt"
                                />
                            </div>

                            <div className="col-12">
                                <FormInput
                                    label="التسمية المختصرة"
                                    name="abbr"
                                    placeholder="التسمية الملخصة (مثال: OCA)"
                                    register={register}
                                    error={errors.abbr}
                                    icon="fas fa-code"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormSelect
                                    label="المدينة"
                                    name="ville_id"
                                    options={villes}
                                    register={register}
                                    error={errors.ville_id}
                                    placeholder="اختر المدينة"
                                    icon="fas fa-map-marker-alt"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormSelect
                                    label="الملعب"
                                    name="stade_id"
                                    options={stades}
                                    register={register}
                                    error={errors.stade_id}
                                    placeholder="اختر الملعب"
                                    icon="fas fa-futbol"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <SubmitButton
                                loading={submitLoading}
                                text="تعديـــل النادي"
                                loadingText="جاري تعديل النادي..."
                                icon="fas fa-save"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateClub;