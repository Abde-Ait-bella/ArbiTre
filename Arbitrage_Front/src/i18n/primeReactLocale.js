import { locale, addLocale } from 'primereact/api';

export const setupArabicLocale = () => {
    // Configuration globale de la localisation arabe pour PrimeReact
    addLocale('ar', {
        startsWith: 'يبدأ بـ',
        contains: 'يحتوي على',
        notContains: 'لا يحتوي على',
        endsWith: 'ينتهي بـ',
        equals: 'يساوي',
        notEquals: 'لا يساوي',
        noFilter: 'بدون تصفية',
        filter: 'تصفية',
        lt: 'أقل من',
        lte: 'أقل من أو يساوي',
        gt: 'أكبر من',
        gte: 'أكبر من أو يساوي',
        dateIs: 'التاريخ هو',
        dateIsNot: 'التاريخ ليس',
        dateBefore: 'التاريخ قبل',
        dateAfter: 'التاريخ بعد',
        custom: 'مخصص',
        clear: 'مسح',
        apply: 'تطبيق',
        matchAll: 'مطابقة الكل',
        matchAny: 'مطابقة أي',
        addRule: 'إضافة قاعدة',
        removeRule: 'إزالة قاعدة',
        accept: 'نعم',
        reject: 'لا',
        choose: 'اختيار',
        upload: 'رفع',
        cancel: 'إلغاء',
        dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesShort: ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
        dayNamesMin: ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'],
        monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        monthNamesShort: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'],
        today: 'اليوم',
        weekHeader: 'أسبوع',
        firstDayOfWeek: 1,
        dateFormat: 'dd/mm/yy',
        weak: 'ضعيف',
        medium: 'متوسط',
        strong: 'قوي',
        passwordPrompt: 'أدخل كلمة المرور',
        emptyFilterMessage: 'لا توجد نتائج',
        searchPlaceholder: 'بحث...',
        emptyMessage: 'لا توجد بيانات متاحة',
    });
    
    // Définir l'arabe comme langue par défaut
    locale('ar');
};