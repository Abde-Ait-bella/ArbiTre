export const GENERIC_ERROR_MESSAGES = {
  // Messages d'erreur génériques en arabe
  GENERAL_FAILURE: 'فشل في الإضافة',
  DUPLICATE_ENTRY: 'هذا العنصر موجود بالفعل',
  DATA_TOO_LONG: 'البيانات المدخلة طويلة جداً',
  MISSING_REQUIRED: 'يرجى ملء جميع الحقول المطلوبة',
  NETWORK_ERROR: 'مشكلة في الاتصال، يرجى المحاولة مرة أخرى',
  INVALID_DATA: 'البيانات المدخلة غير صحيحة',
  NO_PERMISSION: 'ليس لديك صلاحية لهذه العملية',
  NOT_FOUND: 'العنصر المطلوب غير موجود',
  SERVER_ERROR: 'خطأ في الخادم، يرجى المحاولة لاحقاً',
  CONSTRAINT_ERROR: 'خطأ في البيانات المرتبطة',
  
  // Messages spécifiques aux joueurs
  PLAYER_NUMBER_EXISTS: 'رقم اللاعب مستخدم بالفعل',
  LICENSE_EXISTS: 'رقم الرخصة مستخدم بالفعل',
  
  // Messages de succès
  SUCCESS_ADD: 'تم الإضافة بنجاح',
  SUCCESS_UPDATE: 'تم التحديث بنجاح',
  SUCCESS_DELETE: 'تم الحذف بنجاح'
};

// Fonction pour déterminer le message d'erreur approprié
export const getErrorMessage = (error) => {
  if (!error) return GENERIC_ERROR_MESSAGES.GENERAL_FAILURE;
  
  const errorString = JSON.stringify(error).toLowerCase();
  
  // Vérification des erreurs spécifiques aux joueurs
  if (errorString.includes('joueur_numero') && (errorString.includes('duplicate') || errorString.includes('unique'))) {
    return GENERIC_ERROR_MESSAGES.PLAYER_NUMBER_EXISTS;
  }
  
  if (errorString.includes('joueur_numero_licence') && (errorString.includes('duplicate') || errorString.includes('unique'))) {
    return GENERIC_ERROR_MESSAGES.LICENSE_EXISTS;
  }
  
  // Vérification des types d'erreur génériques
  if (errorString.includes('duplicate') || errorString.includes('unique')) {
    return GENERIC_ERROR_MESSAGES.DUPLICATE_ENTRY;
  }
  
  if (errorString.includes('foreign') || errorString.includes('constraint')) {
    return GENERIC_ERROR_MESSAGES.CONSTRAINT_ERROR;
  }
  
  if (errorString.includes('data too long') || errorString.includes('truncated')) {
    return GENERIC_ERROR_MESSAGES.DATA_TOO_LONG;
  }
  
  if (errorString.includes('required') || errorString.includes('null')) {
    return GENERIC_ERROR_MESSAGES.MISSING_REQUIRED;
  }
  
  if (errorString.includes('network') || errorString.includes('timeout')) {
    return GENERIC_ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  // Vérification par code de statut
  if (error.response?.status === 422) {
    return GENERIC_ERROR_MESSAGES.INVALID_DATA;
  }
  
  if (error.response?.status === 403) {
    return GENERIC_ERROR_MESSAGES.NO_PERMISSION;
  }
  
  if (error.response?.status === 404) {
    return GENERIC_ERROR_MESSAGES.NOT_FOUND;
  }
  
  if (error.response?.status >= 500) {
    return GENERIC_ERROR_MESSAGES.SERVER_ERROR;
  }
  
  return GENERIC_ERROR_MESSAGES.GENERAL_FAILURE;
};