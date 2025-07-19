import React from "react";
import { Link } from 'react-router-dom';
import { AuthUser } from "../../AuthContext";
import { useFormHandler } from '../Utils/useFormHandler';
import { validationSchemas } from '../Utils/validationSchemas';
import { FormInput, SubmitButton, ErrorAlert } from '../Utils/FormComponents';
import '../../style/forms.css';

function AddVille() {
    const { user } = AuthUser();

    const {
        register,
        handleSubmit,
        errors,
        loading: submitLoading,
        submitError
    } = useFormHandler(
        validationSchemas.ville,
        '/ville',
        '/dashboard/composants/addedVille'
    );

    return (
        <div className="mx-4 my-4 d-flex justify-content-center">
            <div className="text-center col-12 col-lg-6">
                <div className="p-4 rounded bg-secondary h-100 col-md-12">
                    <div className="d-flex justify-content-start">
                        <Link to="/dashboard/composants/villes" className="px-4 mb-3 btn btn-danger">
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                            رجـــوع
                        </Link>
                    </div>
                    
                    <div className="mb-4">
                        <h2 className="text-white fw-bold">
                            <i className="fas fa-city ms-3"></i>
                            إضافة مدينة - جماعة
                        </h2>
                        <p className="mb-0 text-white-50">أضف مدينة أو جماعة جديدة إلى قاعدة البيانات</p>
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
                                text="إضــــافة المدينة"
                                loadingText="جاري إضافة المدينة..."
                                icon="fas fa-plus-circle"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVille;