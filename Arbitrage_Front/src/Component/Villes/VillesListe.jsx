import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent } from '../Utils/FilterComponents';
import UpdateButton from '../Utils/UpdateButton';
import DeleteButton from '../Utils/DeleteButton';

function VillesListe() {
    // Utiliser nos hooks personnalisés
    const { data: villes, loading } = useDataFetching(
        '/ville', 
        (data, user) => data.filter(v => parseInt(v.user_id) === user?.id || v.user_id === null)
    );
    
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/ville', 
        '/dashboard/composants/deletedVille'
    );

    // Template pour les actions
    const actionBodyTemplate = (rowData) => {
        // Ne pas permettre la suppression des villes par défaut (user_id === null)
        const canDelete = rowData.user_id !== null;
        
        return (
            <div className="flex gap-2 justify-content-center">
                {canDelete && (
                    <>
                        {/* Utiliser le composant UpdateButton */}
                        <UpdateButton
                            itemId={rowData.id}
                            updatePath="/dashboard/composants/updateVille"
                            tooltip="تعديل المدينة"
                        />
                        
                        {/* Utiliser le composant DeleteButton avec loader Font Awesome */}
                        <DeleteButton
                            itemId={rowData.id}
                            onDelete={handleDelete}
                            loading={loadingDelete}
                            loadingItemId={itemIdToDelete}
                            loadingIcon="fa-solid fa-spinner fa-spin text-danger"
                            tooltip="حذف المدينة"
                        />
                    </>
                )}
                
                {!canDelete && <span className="text-muted">مدينة افتراضية</span>}
            </div>
        );
    };

    // Définir les colonnes
    const columns = [
        {
            field: 'nom',
            header: 'اسم المدينة',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالمدينة" />
        },
        {
            field: 'actions',
            header: 'الإجراءات',
            body: actionBodyTemplate,
            style: { width: '12rem', textAlign: 'center' }
        }
    ];

    return (
        <DataTableTemplate
            title="قائمة المدن"
            data={villes}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة مدينة"
            addButtonPath="/dashboard/composants/addVille"
            globalSearchFields={['nom']}
            emptyMessage="لا توجد مدن متاحة"
            onDelete={handleDelete}
        />
    );
}

export default VillesListe;