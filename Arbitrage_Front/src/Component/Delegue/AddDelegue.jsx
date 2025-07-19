import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useFormHandler } from '../Utils/useFormHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { useFetchData } from '../Utils/useFetchData';
import { FormInput, FormSelect, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function AddDelegue() {
    const { data: villes, loading } = useFetchData('/ville');

    const {
        register,
        handleSubmit,
        errors,
        loading: submitLoading,
        submitError
    } = useFormHandler(
        validationSchemas.delegue,
        '/delegue',
        '/dashboard/composants/addedDelegue'
    );

    if (loading) {
        return (
            <>
                {/* Desktop Skeleton */}
                <div className="my-4 d-flex justify-content-center">
                    <div className="text-center col-sm-12 col-xl-6 d-none d-lg-block">
                        <div className="p-4 rounded bg-secondary h-100 skeleton-container">
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
                        <div className="p-4 rounded bg-secondary h-100 skeleton-container">
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
                <div className="p-4 rounded bg-secondary h-100 delegue-form">
                    <div className="d-flex justify-content-start">
                        <Link to="/dashboard/composants/delegues" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right me-2"></i>
                            رجـــوع
                        </Link>
                    </div>
                    
                    <div className="mb-4 form-title">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-user-tie me-3"></i>
                            إضافة مندوب
                        </h2>
                        <p className="mb-0 text-white-50">أضف مندوب جديد إلى قاعدة البيانات</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} noValidate className={submitLoading ? 'loading-overlay' : ''}>
                        <ErrorAlert error={submitError} />
                        
                        <div className="row">
                            <div className="col-md-6">
                                <FormInput
                                    label="الاسم"
                                    name="prenom"
                                    placeholder="أدخل الاسم الأول"
                                    register={register}
                                    error={errors.prenom}
                                    icon="fas fa-user"
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <FormInput
                                    label="النسب"
                                    name="nom"
                                    placeholder="أدخل اسم العائلة"
                                    register={register}
                                    error={errors.nom}
                                    icon="fas fa-user-tag"
                                />
                            </div>
                            
                            <div className="col-12">
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
                        </div>
                        
                        <div className="mt-4">
                            <SubmitButton 
                                loading={submitLoading}
                                text="إضــــافة المندوب"
                                loadingText="جاري إضافة المندوب..."
                                icon="fas fa-user-plus"
                            />
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddDelegue;