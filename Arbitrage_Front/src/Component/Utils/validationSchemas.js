import * as yup from 'yup';

export const errorMessages = {
  required: 'هذا الحقل مطلوب',
  minLength: (min) => `يجب أن يكون الحد الأدنى ${min} أحرف`,
  maxLength: (max) => `يجب أن يكون الحد الأقصى ${max} حرف`,
  number: 'يجب أن يكون رقماً صحيحاً',
  positive: 'يجب أن يكون رقماً موجباً',
  email: 'يرجى إدخال بريد إلكتروني صحيح',
  phone: 'رقم الهاتف غير صحيح',
  date: 'تاريخ غير صحيح',
  onlyLetters: 'يجب أن يحتوي على أحرف فقط',
  uppercase: 'يجب أن يحتوي على أحرف كبيرة فقط',
  invalidNumber: 'يرجى إدخال رقم صحيح',
  numberRange: (min, max) => `يجب أن يكون الرقم بين ${min} و ${max}`,
  dataToolong: 'البيانات طويلة جداً، يرجى تقليل عدد الأحرف'
};

export const validationSchemas = {
  club: yup.object({
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(50, errorMessages.maxLength(50))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    abbr: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(10, errorMessages.maxLength(10))
      .matches(/^[A-Zأ-ي]+$/, errorMessages.uppercase),
    ville_id: yup.string()
      .required(errorMessages.required),
    stade_id: yup.string()
      .required(errorMessages.required)
  }),

  arbitre: yup.object({
    prenom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(30, errorMessages.maxLength(30))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(30, errorMessages.maxLength(30))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    ville_id: yup.string()
      .required(errorMessages.required),
    type: yup.string()
      .required(errorMessages.required)
      .oneOf(['center', 'Assistant'], 'يجب اختيار نوع التخصص')
  }),

  delegue: yup.object({
    prenom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(30, errorMessages.maxLength(30))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(30, errorMessages.maxLength(30))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    ville_id: yup.string()
      .required(errorMessages.required),
  }),

  ville: yup.object({
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(50, errorMessages.maxLength(50))
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters)
  }),

  stade: yup.object({
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(100, errorMessages.maxLength(100)),
    ville_id: yup.string()
      .required(errorMessages.required)
  }),

  joueur: yup.object({
    nom: yup.string()
      .required(errorMessages.required)
      .min(2, errorMessages.minLength(2))
      .max(30, errorMessages.maxLength(30)) // Réduit à 30 caractères
      .matches(/^[a-zA-Zأ-ي\s]+$/, errorMessages.onlyLetters),
    joueur_numero_licence: yup.string()
      .required(errorMessages.required)
      .min(3, errorMessages.minLength(3))
      .max(15, errorMessages.maxLength(15)) // Réduit à 15 caractères
      .matches(/^[A-Za-z0-9\-\/]+$/, 'يجب أن يحتوي على أرقام وأحرف فقط'),
    joueur_numero: yup.number()
      .typeError(errorMessages.invalidNumber)
      .required(errorMessages.required)
      .positive(errorMessages.positive)
      .integer('يجب أن يكون رقماً صحيحاً')
      .min(1, errorMessages.numberRange(1, 99))
      .max(99, errorMessages.numberRange(1, 99))
  })
};