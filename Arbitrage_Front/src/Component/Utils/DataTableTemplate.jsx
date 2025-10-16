import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';
import {CommonStyles} from './CommonStyles'; 
import { Dropdown } from 'primereact/dropdown';

// Import des composants de filtre
import { DateFilterComponent, TextFilterComponent, DropdownFilterComponent } from './FilterComponents';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const DataTableTemplate = ({
    title,
    data,
    columns,
    loading,
    addButtonLabel,
    addButtonPath,
    globalSearchFields,
    customFilters,
    emptyMessage,
    onDelete,
    showAddButton = true,
    selectionMode,
    selection,
    onSelectionChange
}) => {
    // Assurer que data est un tableau
    const [processedData, setProcessedData] = useState([]);
    
    useEffect(() => {
        if (data) {
            if (Array.isArray(data)) {
                setProcessedData(data);
            } else if (data.data && Array.isArray(data.data)) {
                // Si l'API retourne un objet avec une propriété data qui est un tableau
                setProcessedData(data.data);
            } else {
                // Sinon, initialiser avec un tableau vide
                console.error('Les données ne sont pas au format attendu:', data);
                setProcessedData([]);
            }
        } else {
            setProcessedData([]);
        }
    }, [data]);
    
    // États pour le filtrage
    const [filters, setFilters] = useState(
        columns.reduce((acc, col) => {
            if (col.filterable) {
                acc[col.field] = {
                    value: null,
                    matchMode: col.filterMatchMode || FilterMatchMode.CONTAINS
                };
            }
            return acc;
        }, { global: { value: null, matchMode: FilterMatchMode.CONTAINS }})
    );
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Gérer le changement de filtre global
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    // Header du tableau avec recherche globale et bouton d'ajout
    const renderHeader = () => {
        return (
            <div className="header-container">
                {showAddButton && addButtonPath && (
                    <div className="header-button">
                        <Link to={addButtonPath} className="no-underline">
                            <Button 
                                icon="fa-solid fa-circle-plus ms-2" 
                                label={addButtonLabel} 
                                className="rounded btn-warning"
                                style={{ direction: 'rtl' }}
                            />
                        </Link>
                    </div>
                )}

                <div className="">
                    <span className="p-input-icon-left">
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

    // Mise à jour du template de pagination responsive
    const getPaginatorTemplate = () => {
        const isMobile = window.innerWidth < 768;
        
        return isMobile 
            ? 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown'
            : 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';
    };

    // Template pour le nombre de lignes par page avec traduction
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
                <Dropdown 
                    value={options.value} 
                    options={dropdownOptions} 
                    onChange={options.onChange} 
                    className="rtl-dropdown"
                    style={{ minWidth: isMobile ? '4rem' : '6rem' }} 
                />
            </div>
        );
    };

    // Template pour afficher le compteur de résultats
    const paginatorRight = isMobile 
        ? null 
        : <div className="p-d-flex p-ai-center" style={{fontFamily: "Cairo"}}>
              عرض <b>{processedData ? processedData.length : 0}</b> من السجلات
          </div>;

    // Rendu du composant DataTable
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
                        value={processedData}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        header={renderHeader()}
                        globalFilterFields={globalSearchFields}
                        filters={filters}
                        onFilter={(e) => setFilters(e.filters)}
                        emptyMessage={emptyMessage || "لا توجد بيانات متاحة"}
                        loading={loading}
                        rowHover
                        responsiveLayout="scroll"
                        style={{ fontFamily: "Cairo" }}
                        className="rtl-table"
                        paginatorTemplate={getPaginatorTemplate()}
                        currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
                        paginatorRight={paginatorRight}
                        paginatorClassName="ltr-paginator"
                        locale="ar"
                        paginatorRowsPerPageTemplate={paginatorRowsPerPageTemplate}
                        selectionMode={selectionMode}
                        selection={selection}
                        onSelectionChange={onSelectionChange}
                    >
                        {columns.map(col => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable={col.sortable}
                                filter={col.filterable}
                                filterField={col.filterField || col.field}
                                filterPlaceholder={col.filterPlaceholder}
                                showFilterOperator={false}
                                filterElement={col.filterElement}
                                body={col.body}
                                style={col.style || { textAlign: 'right' }}
                            />
                        ))}
                    </DataTable>
                )}
            </div>
            <style jsx>{CommonStyles}</style>
        </div>
    );
};

export default DataTableTemplate;