import React from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUpdateHandler } from '../Utils/useUpdateHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { FormInput, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function UpdateVille() {
    const {
        register,
        handleSubmit,
        errors,
        loading,
        submitLoading,
        submitError
    } = useUpdateHandler(
        validationSchemas.ville,
        '/ville',
        '/dashboard/composants/updatedVille'
    );

    if (loading) {
        return (
            <>
                {/* Desktop Skeleton */}
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
                                <div className="mt-3 row d-flex justify-content-between">
                                    <div className="col-3">
                                        <Skeleton height={36} />
                                    </div>
                                    <div className="col-3">
                                        <Skeleton height={36} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        </div>
                    </div>
                </div>

                {/* Mobile Skeleton */}
                <div className="mx-4 my-4 d-lg-none">
                    <div className="text-center col-sm-12 col-xl-6">
                        <div className="p-4 rounded bg-secondary h-100">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className="col-6">
                                        <Skeleton height={40} />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex align-items-center justify-content-center">
                                    <div className="col-5">
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                                <div className="mt-2 row">
                                    <div className="col-12">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                                <div className="mt-3 row d-flex justify-content-between">
                                    <div className="col-5">
                                        <Skeleton height={36} />
                                    </div>
                                    <div className="col-5">
                                        <Skeleton height={36} />
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
                <div className="p-4 mx-4 rounded bg-secondary h-100 mx-lg-0">
                    <div className="mb-3 d-flex justify-content-start">
                        <Link to="/dashboard/composants/villes" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                            رجـــوع
                        </Link>
                    </div>
                    
                    <div className="mb-4">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-edit ms-3"></i>
                            تعديل المدينة
                        </h2>
                        <p className="mb-0 text-white-50">عدّل بيانات المدينة أو الجماعة</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <ErrorAlert error={submitError} />

                        <div className="row">
                            <div className="col-12">
                                <FormInput
                                    label="اسم المدينة أو الجماعة"
                                    name="nom"
                                    placeholder="أدخل اسم المدينة أو الجماعة"
                                    register={register}
                                    error={errors.nom}
                                    icon="fas fa-map-marked-alt"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <SubmitButton
                                loading={submitLoading}
                                text="تعديـــل المدينة"
                                loadingText="جاري تعديل المدينة..."
                                icon="fas fa-save"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateVille;