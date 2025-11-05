import React from 'react';

// Composant Input avec validation et limite de caractères (mis à jour)
export const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  register, 
  error, 
  className = '',
  icon = null,
  maxLength,
  showCharCount = false,
  ...props 
}) => {
  const [charCount, setCharCount] = React.useState(0);

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-white form-label fw-bold">
          {icon && <i className={`${icon} ms-2`}></i>}
          {label}
          {showCharCount && maxLength && (
            <span className="text-white-50 ms-2 small">
              ({charCount}/{maxLength})
            </span>
          )}
        </label>
      )}
      <div className="position-relative">
        <input
          id={name}
          type={type}
          maxLength={maxLength}
          className={`form-control modern-input ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          {...register(name, {
            onChange: (e) => {
              if (showCharCount) {
                setCharCount(e.target.value.length);
              }
            }
          })}
          {...props}
        />
        {error && (
          <div className="invalid-feedback modern-error">
            <i className="fas fa-exclamation-triangle ms-2"></i>
            {error.message}
          </div>
        )}
        {maxLength && !error && charCount > maxLength * 0.8 && (
          <div className="form-text text-warning small">
            <i className="fas fa-exclamation-triangle ms-1"></i>
            تقترب من الحد الأقصى للأحرف
          </div>
        )}
      </div>
    </div>
  );
};

// Composant Select avec validation
export const FormSelect = ({ 
  label, 
  name, 
  options, 
  register, 
  error, 
  placeholder = 'اختر...',
  className = '',
  icon = null,
  ...props 
}) => (
  <div className={`mb-3 ${className}`}>
    {label && (
      <label htmlFor={name} className="text-white form-label fw-bold">
        {icon && <i className={`${icon} ms-2`}></i>}
        {label}
      </label>
    )}
    <div className="position-relative">
      <select
        id={name}
        className={`form-select modern-select ${error ? 'is-invalid' : ''}`}
        {...register(name)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option.id} value={parseInt(option.id)}>
            {option.nom}
          </option>
        ))}
      </select>
      {error && (
        <div className="invalid-feedback modern-error">
          <i className="fas fa-exclamation-triangle ms-2"></i>
          {error.message}
        </div>
      )}
    </div>
  </div>
);

// Composant pour les champs numériques (corrigé)
export const FormNumber = ({ 
  label, 
  name, 
  placeholder, 
  register, 
  error, 
  className = '',
  icon = null,
  min = 0,
  max,
  ...props 
}) => (
  <div className={`mb-3 ${className}`}>
    {label && (
      <label htmlFor={name} className="text-white form-label fw-bold">
        {icon && <i className={`${icon} ms-2`}></i>}
        {label}
      </label>
    )}
    <div className="position-relative">
      <input
        id={name}
        type="number"
        min={min}
        max={max}
        className={`form-control modern-input ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        {...register(name, { 
          setValueAs: (value) => {
            // Convertir en nombre ou retourner undefined si vide
            if (value === '' || value === null || value === undefined) {
              return undefined;
            }
            const num = Number(value);
            return isNaN(num) ? undefined : num;
          }
        })}
        {...props}
      />
      {error && (
        <div className="invalid-feedback modern-error">
          <i className="fas fa-exclamation-triangle ms-2"></i>
          {error.message}
        </div>
      )}
    </div>
  </div>
);

// Composant bouton de soumission avec loader
export const SubmitButton = ({ 
  loading, 
  text = 'إضــــافة', 
  loadingText = 'جاري الإضافة...', 
  className = 'px-5 py-2 btn btn-danger fw-bold modern-btn',
  icon = 'fas fa-plus'
}) => (
  <button 
    type="submit" 
    className={`${className} ${loading ? 'loading' : ''}`}
    disabled={loading}
  >
    {loading ? (
      <>
        <div className="spinner-border spinner-border-sm ms-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {loadingText}
      </>
    ) : (
      <>
        <i className={`${icon} ms-2`}></i>
        {text}
      </>
    )}
  </button>
);

// Composant d'affichage d'erreur avec style amélioré
export const ErrorAlert = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mb-4 alert alert-danger modern-alert d-flex align-items-center animate__animated animate__fadeIn" role="alert">
      <i className="fas fa-exclamation-circle ms-3 fs-5"></i>
      <div className="flex-grow-1">
        <strong>خطأ!</strong> {error}
      </div>
    </div>
  );
};

// Composant d'affichage de succès
export const SuccessAlert = ({ message, show }) => {
  if (!show) return null;
  
  return (
    <div className="mb-4 alert alert-success modern-alert d-flex align-items-center animate__animated animate__fadeIn" role="alert">
      <i className="fas fa-check-circle ms-3 fs-5"></i>
      <div className="flex-grow-1">
        <strong>نجح!</strong> {message}
      </div>
    </div>
  );
};

// Composant pour les Radio Buttons
export const FormRadioGroup = ({ 
  label, 
  name, 
  options, 
  register, 
  error, 
  className = '',
  icon = null 
}) => (
  <div className={`mb-3 ${className}`}>
    {label && (
      <fieldset className="mb-3 row">
        <legend className="pt-2 mb-2 text-white col-form-label col-sm-3 fw-bold">
          {icon && <i className={`${icon} ms-2`}></i>}
          {label}
        </legend>
        <div className="col-sm-9">
          {options?.map((option) => (
            <div key={option.value} className="mb-2 form-check">
              <input
                className={`form-check-input ${error ? 'is-invalid' : ''}`}
                type="radio"
                value={option.value}
                id={`${name}_${option.value}`}
                {...register(name)}
              />
              <label 
                className="text-white form-check-label" 
                htmlFor={`${name}_${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
          {error && (
            <div className="invalid-feedback modern-error d-block">
              <i className="fas fa-exclamation-triangle ms-2"></i>
              {error.message}
            </div>
          )}
        </div>
      </fieldset>
    )}
  </div>
);