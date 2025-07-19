import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { axiosClinet } from "../../Api/axios";
import { AuthUser } from "../../AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useFormHandler } from '../Utils/useFormHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { FormInput, FormNumber, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function AddJoueur() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = AuthUser();

    const {
        register,
        handleSubmit,
        errors,
        loading: submitLoading,
        submitError
    } = useFormHandler(
        validationSchemas.joueur,
        '/joueur',
        '/dashboard/composants/addedJoueur'
    );

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axiosClinet.get('/club');
                const filteredClubs = response.data.filter(
                    (c) => parseInt(c.user_id) === user?.id || c.user_id === null
                );
                setClubs(filteredClubs);
            } catch (error) {
                console.error('Error fetching clubs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, [user?.id]);

    if (loading) {
        return (
            <>
                {/* Desktop Skeleton */}
                <div className="my-4 d-flex justify-content-center">
                    <div className="text-center col-sm-12 col-xl-6 d-none d-lg-block">
                        <div className="p-4 rounded bg-secondary h-100">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-start">
                                    <div className="col-md-3">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex align-items-center justify-content-center">
                                    <div className="col-md-5">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-2 row">
                                    <div className="col-12">
                                        <Skeleton height={35} count={4} className="mt-2" />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex justify-content-center">
                                    <div className="col-4">
                                        <Skeleton height={40} width={135} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>

                {/* Mobile Skeleton */}
                <div className="px-4 d-lg-none">
                    <div className="text-center col-sm-12">
                        <div className="p-4 rounded bg-secondary h-100">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-start">
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex align-items-center justify-content-center">
                                    <div className="col-7">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-2 row">
                                    <div className="col-12">
                                        <Skeleton height={35} count={4} className="mt-2" />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex justify-content-center">
                                    <div className="col-6">
                                        <Skeleton height={40} width={135} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="my-4 d-flex justify-content-center">
            <div className="text-center col-sm-12 col-xl-6">
                <div className="p-4 rounded bg-secondary h-100">
                    <div className="d-flex justify-content-start">
                        <Link to="/dashboard/composants/joueur" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                            رجـــوع
                        </Link>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-running ms-3"></i>
                            إضافة لاعب
                        </h2>
                        <p className="mb-0 text-white-50">أضف لاعب جديد إلى قاعدة البيانات</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <ErrorAlert error={submitError} />

                        <div className="row">
                            <div className="col-12">
                                <FormInput
                                    label="اسم اللاعب"
                                    name="nom"
                                    placeholder="أدخل الاسم الكامل للاعب"
                                    register={register}
                                    error={errors.nom}
                                    icon="fas fa-user"
                                    showCharCount={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormInput
                                    label="رقم الرخصة"
                                    name="joueur_numero_licence"
                                    placeholder="رقم الرخصة "
                                    register={register}
                                    error={errors.joueur_numero_licence}
                                    icon="fas fa-id-card"
                                    showCharCount={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormNumber
                                    label="رقم اللاعب"
                                    name="joueur_numero"
                                    placeholder="رقم من 1 إلى 99"
                                    register={register}
                                    error={errors.joueur_numero}
                                    icon="fas fa-hashtag"
                                    min={1}
                                    max={99}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <SubmitButton
                                loading={submitLoading}
                                text="إضــــافة اللاعب"
                                loadingText="جاري إضافة اللاعب..."
                                icon="fas fa-user-plus"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddJoueur;