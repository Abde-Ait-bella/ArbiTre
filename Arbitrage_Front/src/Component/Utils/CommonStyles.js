export const CommonStyles = `
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
        font-family: 'Cairo', sans-serif;
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
`