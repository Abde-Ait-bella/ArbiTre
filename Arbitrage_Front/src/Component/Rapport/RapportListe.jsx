// ArbiTre\Arbitrage_Front\src\Component\Rapport\RapportListe.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClinet } from "../../Api/axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthUser } from "../../AuthContext";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption } from 'primereact/api';

// Import PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

// Importer les styles CSS de PrimeReact
import "primereact/resources/themes/lara-dark-indigo/theme.css"; // thème sombre
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function Matches() {
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

    const [matches, setMatches] = useState([]);
    const [club, setClub] = useState([]);
    const [villes, setVilles] = useState([]);
    const [competition, setCompetition] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [idRapport, setIdRapport] = useState();
    const { user } = AuthUser();
    const navigate = useNavigate();

    // État pour le filtrage PrimeReact
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'date': { value: null, matchMode: FilterMatchMode.DATE_IS }, // Utilisez DATE_IS pour le filtrage simple
        'clubHome': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'clubAway': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'competition': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'category': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'result': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'ville': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        fetchData();
        
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchData = async () => {
        try {
            const matchesRes = await axiosClinet.get('/matche');
            const clubRes = await axiosClinet.get('/club');
            const villesRes = await axiosClinet.get('/ville');
            const competitionRes = await axiosClinet.get('/competition');
            const categoriesRes = await axiosClinet.get('/category');

            const filteredMatches = matchesRes.data.filter((m) =>
                parseInt(m.user_id) === user?.id || m.user_id === null
            );

            // Transformer les données pour PrimeReact
            const formattedMatches = filteredMatches.map(match => {
                const clubHome = clubRes.data.find(c => c.id === parseInt(match.club_id_1));
                const clubAway = clubRes.data.find(c => c.id === parseInt(match.club_id_2));
                const comp = competitionRes.data.find(c => c.id === parseInt(match.competition_id));
                const cat = categoriesRes.data.find(c => c.id === parseInt(match.categorie_id));
                const ville = villesRes.data.find(v => v.id === parseInt(match.ville_id));
                
                // Assurez-vous que la date est un objet Date valide
                let formattedDate = null;
                if (match.date) {
                    if (match.date instanceof Date) {
                        formattedDate = match.date;
                    } else if (typeof match.date === 'string') {
                        const parsedDate = new Date(match.date);
                        if (!isNaN(parsedDate.getTime())) {
                            formattedDate = parsedDate;
                        }
                    }
                }

                return {
                    id: match.id,
                    date: formattedDate, // Date valide ou null
                    clubHome: clubHome ? `${clubHome.nom} (${clubHome.abbr})` : '',
                    clubAway: clubAway ? `${clubAway.nom} (${clubAway.abbr})` : '',
                    competition: comp ? comp.nom : '',
                    category: cat ? cat.nom : '', // Assurez-vous que cette ligne est correcte
                    result: `${match.result_club_1}-${match.result_club_2}`,
                    ville: ville ? ville.nom : '',
                    originalData: match // Conserver les données originales pour d'autres opérations
                };
            });

            setMatches(formattedMatches);
            setClub(clubRes.data);
            setVilles(villesRes.data);
            setCompetition(competitionRes.data);
            setCategories(categoriesRes.data);
            setLoading(false);

        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setLoadingDelete(true);
        setIdRapport(id);
        axiosClinet.delete(`/matche/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    navigate('/dashboard/DeletedMatche');
                }
            })
            .catch((error) => {
                console.error(`Error deleting match with id ${id}:`, error);
            })
            .finally(() => {
                setLoadingDelete(false);
            });
    };

    // Gérer le changement de filtre global
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    // Header personnalisé pour la table avec le bouton d'ajout et la recherche globale
    const renderHeader = () => {
        return (
            <div className="header-container">
                <div className="header-button">
                    <Link to="/dashboard/addRapport" className="no-underline">
                        <Button 
                            icon="fa-solid fa-circle-plus ms-2" 
                            label="إضافة تقرير" 
                            className="rounded btn-warning "
                            style={{ direction: 'rtl' }}
                        />
                    </Link>
                </div>

                <div className="header-search">
                    <span className="p-input-icon-left ">
                        <i className="pi pi-search" style={{ left: "20px" }} />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="بحث..."
                            style={{ width: '100%', direction: 'rtl' }}
                        />
                    </span>
                </div>
            </div>
        );
    };

    // Template pour la colonne d'actions
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center">
                <Link to={`/dashboard/updateMatche/${rowData.id}`} className="p-button p-button-icon-only p-button-rounded p-button-text">
                    <i className="pi pi-wrench"></i>
                </Link>

                <Link to={`/dashboard/detailleRapport/${rowData.id}`} className="p-button btn-warning p-button-sm">
                    التفاصيل
                </Link>
                
                <Button
                    icon={loadingDelete && idRapport === rowData.id ? 'pi pi-spin pi-spinner' : 'pi pi-trash'}
                    className="p-button-danger p-button-text p-button-rounded"
                    onClick={() => handleDelete(rowData.id)}
                    disabled={loadingDelete && idRapport === rowData.id}
                />
            </div>
        );
    };

    // Template pour la colonne de résultat
    const resultBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.result} severity="info" />
        );
    };

    // Ajoutez cette fonction dans votre composant Matches
const dateBodyTemplate = (rowData) => {
    if (!rowData.date) return '';
    
    // Si c'est un objet Date, le formater en chaîne
    if (rowData.date instanceof Date) {
        // Format: JJ/MM/AAAA
        const day = rowData.date.getDate().toString().padStart(2, '0');
        const month = (rowData.date.getMonth() + 1).toString().padStart(2, '0');
        const year = rowData.date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Si c'est déjà une chaîne, la retourner directement
    return rowData.date;
};

    const header = renderHeader();

    // Ajoutez ce style dans votre composant ou dans un fichier CSS séparé
    const rtlTableStyles = {
        '.p-datatable .p-datatable-tbody > tr > td': {
            textAlign: 'right',
            direction: 'rtl'
        },
        '.p-datatable .p-datatable-thead > tr > th': {
            textAlign: 'right',
            direction: 'rtl'
        },
        '.p-column-filter': {
            direction: 'rtl'
        }
    };


    // Créez ces composants au début du fichier, en dehors du composant Matches

// Composant de filtre de date séparé
const DateFilterComponent = React.memo(({ options, placeholder }) => {
    // S'assurer que la valeur initiale est un objet Date valide ou null
    const [localValue, setLocalValue] = useState(() => {
        if (options.value instanceof Date) return options.value;
        if (typeof options.value === 'string') {
            const parsedDate = new Date(options.value);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return null;
    });

    // Appliquer le filtre immédiatement quand une date est sélectionnée
    const handleDateChange = (e) => {
        const newValue = e.value;
        setLocalValue(newValue);
        
        // Appliquer le filtre directement
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearDateFilter = () => {
        setLocalValue(null);
        if (options.filterCallback) {
            options.filterCallback(null);
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <Calendar
                value={localValue}
                onChange={handleDateChange} // Utilisez la nouvelle fonction handleDateChange
                dateFormat="dd/mm/yy"
                placeholder={placeholder || "بحث بالتاريخ"}
                // showIcon
                style={{width: '100%', direction: 'rtl'}}
                className="p-column-filter"
                locale="ar"
            />
        </div>
    );
});

// Modifiez le TextFilterComponent pour qu'il fonctionne immédiatement:
const TextFilterComponent = React.memo(({ options, placeholder }) => {
    const [localValue, setLocalValue] = useState(options.value || '');

    // Appliquer le filtre immédiatement après la saisie
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        
        // Appliquer le filtre directement
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearFilter = () => {
        setLocalValue('');
        if (options.filterCallback) {
            options.filterCallback('');
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <InputText
                value={localValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                style={{width: '100%', direction: 'rtl'}}
                className="p-inputtext p-component p-filled"
            />
        </div>
    );
});

// Modifiez le composant DropdownFilterComponent pour appliquer le filtre immédiatement
const DropdownFilterComponent = React.memo(({ options, items, placeholder }) => {
    const [localValue, setLocalValue] = useState(options.value);

    // Appliquer immédiatement le filtre lors du changement de sélection
    const handleDropdownChange = (e) => {
        const newValue = e.value;
        setLocalValue(newValue);
        
        // Appliquer le filtre directement
        if (options.filterCallback) {
            options.filterCallback(newValue);
        }
    };

    const clearFilter = () => {
        setLocalValue(null);
        if (options.filterCallback) {
            options.filterCallback(null);
        }
    };

    return (
        <div className="p-column-filter" style={{width: '100%'}}>
            <Dropdown
                value={localValue}
                options={items}
                onChange={handleDropdownChange} // Utilisez la nouvelle fonction
                placeholder={placeholder}
                className="p-column-filter"
                style={{width: '100%', direction: 'rtl'}}
                showClear
            />
        </div>
    );
});

    // Créez un template personnalisé pour le sélecteur de lignes par page:
    const paginatorRowsPerPageTemplate = (options) => {
        const isMobile = window.innerWidth < 768;
        
        const dropdownOptions = isMobile
            ? [
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '15', value: 15 }
            ]
            : [
                { label: '5 عناصر', value: 5 },
                { label: '10 عناصر', value: 10 },
                { label: '15 عنصر', value: 15 },
                { label: '20 عنصر', value: 20 }
            ];

        return (
            <div className={`mx-${isMobile ? '1' : '3'} d-flex align-items-center`}>
                {!isMobile && <span className="me-2">عناصر:</span>}
                <Dropdown value={options.value} 
                         options={dropdownOptions} 
                         onChange={options.onChange} 
                         className="rtl-dropdown"
                         style={{ minWidth: isMobile ? '4rem' : '6rem' }} />
            </div>
        );
    };

    // Template spécifique pour le filtre de date
    const dateFilterTemplate = (options) => {
        return <DateFilterComponent options={options} placeholder="بحث بالتاريخ" />;
    };

    // Template pour les options de filtre texte
    const getColumnFilterTemplate = (options, placeholder) => {
        return <TextFilterComponent options={options} placeholder={placeholder} />;
    };

    // Template pour les filtres de type dropdown
    const getDropdownFilterTemplate = (options, items, placeholder) => {
        return <DropdownFilterComponent options={options} items={items} placeholder={placeholder} />;
    };

    // Créez une fonction pour générer le template de pagination en fonction de la taille d'écran
const getPaginatorTemplate = () => {
    // Détecter si on est sur mobile (largeur < 768px)
    const isMobile = window.innerWidth < 768;
    
    return isMobile 
        ? 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'
        : 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';
};

    const paginatorRight = isMobile 
        ? null 
        : <div className="p-d-flex p-ai-center" style={{fontFamily: "Cairo"}}>
              عرض <b>{matches ? matches.length : 0}</b> من السجلات
          </div>;

    return (
        <div className="px-4 pt-4 container-fluid">
            <div className="p-4 text-center rounded" style={{ backgroundColor: '#1f2937' }}>
                {loading ? (
                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                        <Skeleton height={60} count={1} className="mb-4" />
                        <Skeleton height={40} count={5} />
                    </SkeletonTheme>
                ) : (
                    <DataTable
                        value={matches}
                        dataKey="id"  // Assurez-vous que cette propriété est définie
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        header={header}
                        globalFilterFields={['date', 'clubHome', 'clubAway', 'competition', 'category', 'result', 'ville']}
                        filters={filters}
                        onFilter={(e) => setFilters(e.filters)}
                        emptyMessage="لا توجد مباريات متاحة"
                        loading={loading}
                        rowHover
                        responsiveLayout="scroll"
                        style={{ fontFamily: "Cairo" }}
                        className="rtl-table"
                        paginatorTemplate={getPaginatorTemplate()}
                        currentPageReportTemplate="صفحة {currentPage} من {totalPages}" // Ajout du template de rapport de page en arabe
                        paginatorRight={paginatorRight}
                        paginatorClassName="ltr-paginator"
                        locale="ar"
                        paginatorRowsPerPageTemplate={paginatorRowsPerPageTemplate}
                    >
                        <Column 
                            field="date" 
                            header="التاريخ " 
                            sortable 
                            dataType="date" 
                            filter 
                            filterField="date"
                            filterPlaceholder="بحث بالتاريخ"
                            showFilterOperator={false} // Supprimez les opérateurs pour simplifier
                            filterElement={dateFilterTemplate}
                            style={{ minWidth: '150px', textAlign: 'right' }}
                            body={dateBodyTemplate}
                        />
                        <Column 
                            field="clubHome" 
                            header="الفريق المستقبل" 
                            filter 
                            filterField="clubHome"
                            filterPlaceholder="بحث بالفريق المستقبل"
                            showFilterOperator={false}
                            filterElement={(options) => getColumnFilterTemplate(options, "بحث بالفريق المستقبل")}
                            style={{ minWidth: '200px', textAlign: 'right' }} 
                        />
                        <Column 
                            field="clubAway" 
                            header="الفريق الزائر" 
                            filter 
                            filterField="clubAway"
                            filterPlaceholder="بحث بالفريق الزائر"
                            showFilterOperator={false}
                            filterElement={options => getColumnFilterTemplate(options, "بحث بالفريق الزائر")}
                            style={{ minWidth: '200px', textAlign: 'right' }} 
                        />
                        <Column 
                            field="competition" 
                            header="المنافسة" 
                            sortable 
                            filter 
                            filterField="competition"
                            filterPlaceholder="بحث بالمنافسة"
                            showFilterOperator={false}
                            filterElement={options => getDropdownFilterTemplate(
                                options, 
                                competition.map(c => ({label: c.nom, value: c.nom})),
                                "بحث بالمنافسة"
                            )}
                            style={{ minWidth: '150px', textAlign: 'right' }} 
                        />
                        <Column 
                            field="category" 
                            header="الفئة" 
                            filter 
                            showFilterOperator={false}
                            filterElement={options => getDropdownFilterTemplate(
                                options, 
                                categories.map(c => ({label: c.nom, value: c.nom})),
                                "بحث بالفئة"
                            )}
                            style={{ minWidth: '150px', textAlign: 'right' }} 
                        />
                        <Column 
                            field="result" 
                            header="النتيجة" 
                            filter 
                            filterField="result"
                            filterPlaceholder="بحث بالنتيجة"
                            showFilterOperator={false}
                            filterElement={options => getColumnFilterTemplate(options, "بحث بالنتيجة")}
                            style={{ minWidth: '100px', textAlign: 'right' }} 
                            body={resultBodyTemplate} 
                        />
                        <Column 
                            field="ville" 
                            header="المدينة" 
                            filter 
                            filterField="ville"
                            filterPlaceholder="بحث بالمدينة"
                            showFilterOperator={false}
                            filterElement={options => getColumnFilterTemplate(options, "بحث بالمدينة")}
                            style={{ minWidth: '150px', textAlign: 'center' }} 
                        />
                        <Column header="الإجراءات" body={actionBodyTemplate} style={{ minWidth: '150px', textAlign: 'right' }} />
                    </DataTable>
                )}
            </div>
            <style jsx>{`
                .rtl-table .p-datatable-header {
                padding: 0;
                padding-bottom: 1.5rem;
            }
                .p-dropdown-label p_inputtext {
                color: red;
                padding: 0;
                }
                
                .rtl-table .p-datatable-tbody > tr > td {
                    text-align: right;
                    direction: rtl;
                }
                .rtl-table .p-datatable-thead > tr > th {
                    text-align: right;
                    direction: rtl;
                    
                }
                .rtl-table .p-column-filter {
                    direction: rtl;
                }
                
                /* Styles pour la pagination LTR */
                .ltr-paginator {
                    direction: ltr !important;
                }
                .ltr-paginator .p-paginator-pages {
                    direction: ltr !important;
                }
                .p-paginator-page, .p-paginator-first, .p-paginator-prev, .p-paginator-next, .p-paginator-last {
                    transform: rotate(0deg) !important;
                }
                /* Aligner texte du rapport de page */
                .p-paginator-current {
                    direction: ltr !important;
                }

                .ltr-paginator .p-dropdown {
                    height: 2.5rem !important;
                }
                 .ltr-paginator .p-dropdown .p-inputtext {
                    padding: 0 1rem 0 0  !important;
                    display: flex !important;
                    align-items: center !important;
                }

                /* Styles pour les boutons de filtrage */
                .p-dropdown-items{
                font-family: 'Cairo', sans-serif;
                padding: 0;
                }

                .p-inputtext{
                font-family: 'Cairo' !important;
                }
 
                .p-column-filter-constraints{
                        font-family: 'Cairo', sans-serif;
                }
    .p-column-filter-menu-button {
        margin-right: 0.5rem;
        }
    .p-column-filter-overlay {
        direction: rtl;
        text-align: right;
    }
    
    .p-column-filter-buttonbar {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        padding: 1rem 0.5rem;
    }
    
    .p-column-filter-buttonbar .p-button {
        margin: 0 0.25rem;
        border-radius: 0.5rem;
    }
    
    /* Style pour les menus déroulants de filtre */
    .p-column-filter-matchmode-dropdown,
    .p-column-filter-constraint-dropdown {
        direction: rtl;
        text-align: right;
    }
    
    /* Assurer que les icônes sont correctement positionnées */
    .p-dropdown-trigger {
        order: 1;
    }
    
    .p-dropdown-label {
        order: 2;
        text-align: right;
    }

    /* Traduction forcée pour le message vide */
    .p-datatable .p-datatable-emptymessage td {
        text-align: center !important;
    }
    
    /* Traduction forcée pour les libellés des nombres d'éléments par page */
    .p-paginator-rpp-options .p-dropdown-label::before {
        content: 'عدد العناصر: ';
    }
    
    /* Cacher les textes non traduits si nécessaire */
    .p-paginator-current:not([dir="rtl"]) {
        visibility: hidden;
        position: relative;
    }
    
    /* Remplacer par du texte traduit */
    .p-paginator-current:not([dir="rtl"])::after {
        visibility: visible;
        position: absolute;
        left: 0;
        top: 0;
        content: "صفحة " attr(data-pc-page) " من " attr(data-pc-totalpage);
    }

    /* Styles pour forcer la traduction des éléments de filtre */
    .p-column-filter-overlay {
        text-align: right !important;
        direction: rtl !important;
    }
    
    .p-column-filter-row {
        direction: rtl !important;
    }
    
    /* Remplacer les textes Apply et Clear */
    /*.p-column-filter-buttonbar .p-button:first-child::after {
        content: 'تطبيق';
        visibility: visible;
        display: block;
    }
    
    .p-column-filter-buttonbar .p-button:last-child::after {
        content: 'مسح';
        visibility: visible;
        display: block;
    }
    
    .p-column-filter-buttonbar .p-button span {
        display: none;
    }*/
    
    /* Style pour le menu déroulant des opérateurs */
    .p-column-filter-operator-dropdown .p-dropdown-label {
        text-align: right;
        direction: rtl;
        padding-right: 10px;
    }
    
    /* Style pour les options du menu déroulant */
    .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
        text-align: right;
        direction: rtl;
    }

    /* Styles pour le calendrier */
.p-datepicker {
    direction: rtl;
    text-align: right;
    z-index: 2000 !important; /* Assurez-vous que le calendrier est au-dessus des autres éléments */
    font-family: 'Cairo', sans-serif; /* Utiliser la police Cairo pour le calendrier */
}

.p-datepicker .p-datepicker-header {
    direction: rtl;
}

.p-datepicker-title {
    direction: rtl;
}

.p-datepicker .p-datepicker-header .p-datepicker-prev {
    order: 2;
}

.p-datepicker .p-datepicker-header .p-datepicker-next {
    order: 1;
}

.p-datepicker table {
    direction: rtl;
}

/* Style pour les boutons du calendrier */
.p-datepicker .p-datepicker-buttonbar {
    display: flex;
    flex-direction: row-reverse;
}

/* Vos styles existants... */
    
    /* ===== Styles modernes pour toutes les barres de défilement ===== */
    
    /* Scrollbar pour Chrome, Edge, et Safari */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #2a3342;
        border-radius: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #4b5563;
        border-radius: 8px;
        transition: background 0.2s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #6366f1;
    }
    
    ::-webkit-scrollbar-corner {
        background: #2a3342;
    }
    
    /* Scrollbar pour Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #2a3342;
    }
    
    /* Styles spécifiques pour le DataTable */
    .p-datatable .p-datatable-wrapper {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #2a3342;
    }
    
    /* Styles pour les listes déroulantes */
    .p-dropdown-panel .p-dropdown-items-wrapper {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #2a3342;
    }
    
    /* Styles pour le calendrier */
    .p-datepicker-panel .p-datepicker-items-wrapper {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #2a3342;
    }
    
    /* Animation fluide au survol */
    .p-datatable .p-datatable-wrapper::-webkit-scrollbar-thumb:hover,
    .p-dropdown-panel .p-dropdown-items-wrapper::-webkit-scrollbar-thumb:hover {
        background: #6366f1;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
    
    /* Style pour le scroll horizontal du tableau */
    .p-datatable .p-datatable-wrapper::-webkit-scrollbar-thumb:horizontal {
        min-width: 40px;
    }
    
    /* Style pour les scrollbars dans les modales */
    .p-dialog-content::-webkit-scrollbar {
        width: 6px;
    }
    
    .p-dialog-content::-webkit-scrollbar-thumb {
        background: #4b5563;
        border-radius: 6px;
    }
    
    .p-dialog-content::-webkit-scrollbar-thumb:hover {
        background: #6366f1;
    }

    /* Styles responsive pour la pagination */
    @media screen and (max-width: 768px) {
        /* Réduire l'espace entre les boutons de pagination */
        .p-paginator .p-paginator-element {
            min-width: 2rem !important;
            height: 2rem !important;
            margin: 0 0.1rem !important;
        }
        
        /* Réduire la taille du sélecteur de pages */
        .p-paginator .p-dropdown {
            width: auto !important;
            min-width: 5rem !important;
        }
        
        /* Ajuster l'affichage des pages */
        .p-paginator .p-paginator-pages {
            display: flex;
            max-width: 120px;
            overflow-x: auto;
        }
        
        /* Masquer le texte du rapport de page sur mobile */
        .p-paginator-right {
            display: none;
        }
    }
    
    /* Styles pour tablettes */
    @media screen and (min-width: 769px) and (max-width: 992px) {
        .p-paginator .p-paginator-element {
            min-width: 2.5rem !important;
            height: 2.5rem !important;
        }
        
        /* Réduire légèrement le texte de rapport */
        .p-paginator-right {
            font-size: 0.9rem;
        }
    }
    
    /* Assurer que la pagination reste accessible en RTL */
    .ltr-paginator .p-paginator {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        justify-content: center;
        padding: 0.5rem;
    }
    
    /* Style pour le compteur de résultats */
    .p-paginator-right {
        margin-top: 0.5rem;
        width: 100%;
        text-align: center;
    }
    
    @media screen and (min-width: 768px) {
        .p-paginator-right {
            margin-top: 0;
            width: auto;
        }
    }

    /* Styles pour le header du DataTable */
    .header-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: center;
    }
    
    .header-button {
        width: 100%;
    }
    
    .header-button .p-button {
        width: 100%;
    }
    
    .header-search {
        width: 100%;
        display: flex;
        justify-content: left;
    }
    
    /* Media query pour tablettes et desktop */
    @media screen and (min-width: 768px) {
        .header-container {
            flex-direction: row;
            justify-content: space-between;
        }
        
        .header-button {
            width: auto;
        }
        
        .header-button .p-button {
            width: auto;
        }
        
        .header-search {
            width: 100%;
        }
    }
    
    @media screen and (min-width: 992px) {
        .header-search {
            width: 50%;
        }
    }

     @media screen and (max-width: 992px) {
        .header-search span{
            width: 100%;
        }
    }
`}</style>
        </div>
    );
}

export default Matches;