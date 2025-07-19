
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUpdateHandler } from '../Utils/useUpdateHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { FormInput, FormNumber, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function UpdateJoueur() {
    const {
        register,
        handleSubmit,
        errors,
        loading,
        submitLoading,
        submitError,
        initialData
    } = useUpdateHandler(
        validationSchemas.joueur,
        '/joueur',
        '/dashboard/composants/updatedJoueur'
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
                                        <Skeleton height={30} />
                                    </div>
                                    <div className="col-10">
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                                <div className="mt-2 row">
                                    <div className="col-md-3">
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-md-9">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                                <div className="mt-2 row">
                                    <div className="col-md-3">
                                        <Skeleton height={35} />
                                    </div>
                                    <div className="col-md-9">
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
                <div className="mx-4 d-lg-none">
                    <div className="text-center col-sm-12 col-xl-6">
                        <div className="p-4 rounded bg-secondary h-100">
                            <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className="col-7">
                                        <Skeleton height={35} />
                                    </div>
                                </div>
                                <div className="mt-4 row d-flex align-items-center justify-content-center">
                                    <div className="col-5">
                                        <Skeleton height={25} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                                <div className="mt-2 row d-flex align-items-center justify-content-center">
                                    <div className="col-5">
                                        <Skeleton height={25} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <Skeleton height={30} />
                                    </div>
                                </div>
                                <div className="mt-2 row d-flex align-items-center justify-content-center">
                                    <div className="col-5">
                                        <Skeleton height={25} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <Skeleton height={30} />
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
                        <Link to="/dashboard/composants/joueur" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                            رجـــوع
                        </Link>
                    </div>
                    
                    <div className="mb-4">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-edit ms-3"></i>
                            تعديل اللاعب
                        </h2>
                        <p className="mb-0 text-white-50">عدّل بيانات اللاعب</p>
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
                                    maxLength={30}
                                    showCharCount={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormInput
                                    label="رقم الرخصة"
                                    name="joueur_numero_licence"
                                    placeholder="رقم الرخصة (15 حرف كحد أقصى)"
                                    register={register}
                                    error={errors.joueur_numero_licence}
                                    icon="fas fa-id-card"
                                    maxLength={15}
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
                                text="تعديـــل اللاعب"
                                loadingText="جاري تعديل اللاعب..."
                                icon="fas fa-save"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateJoueur;