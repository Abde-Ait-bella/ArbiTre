import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent, DropdownFilterComponent } from '../Utils/FilterComponents';
import { AuthUser } from '../../AuthContext';
import UpdateButton from '../Utils/UpdateButton';
import DeleteButton from '../Utils/DeleteButton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function DelegueListe() {
    const { user } = AuthUser();
    
    // Récupérer les données des délégués et des villes avec nos hooks personnalisés
    const { data: allDelegues, loading: deleguesLoading } = useDataFetching('/delegue');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/delegue',
        '/dashboard/composants/deletedDelegue'
    );

    // Préparer les données: combiner les délégués par défaut et ceux de l'utilisateur
    const deleguesDefault = allDelegues?.filter(d => d.user_id === null) || [];
    const userDelegues = allDelegues?.filter(d => parseInt(d.user_id) === user?.id) || [];
    const delegues = [...deleguesDefault, ...userDelegues];
    
    // Template pour afficher le nom de la ville
    const villeBodyTemplate = (rowData) => {
        const ville = villes?.find(v => v.id === parseInt(rowData.ville_id));
        return ville ? ville.nom : '';
    };
    
    // Template pour les actions (modifier/supprimer)
    const actionBodyTemplate = (rowData) => {
        const isDefault = rowData.user_id === null;
        
        return (
            <div className="flex gap-2 justify-content-center">
                {!isDefault ? (
                    <>
                        {/* Utiliser le composant UpdateButton */}
                        <UpdateButton
                            itemId={rowData.id}
                            updatePath="/dashboard/composants/updateDelegue"
                            tooltip="تعديل المندوب"
                        />
                        
                        {/* Utiliser le composant DeleteButton avec loader Font Awesome */}
                        <DeleteButton
                            itemId={rowData.id}
                            onDelete={handleDelete}
                            loading={loadingDelete}
                            loadingItemId={itemIdToDelete}
                            loadingIcon="fa-solid fa-spinner fa-spin text-danger"
                            tooltip="حذف المندوب"
                        />
                    </>
                ) : (
                    <span className="text-muted">مندوب افتراضي</span>
                )}
            </div>
        );
    };

    // Template pour le skeleton loading
    const loadingTemplate = () => {
        return (
            <div className="px-4 pt-4 container-fluid">
                <div className="p-4 text-center rounded" style={{ backgroundColor: '#1f2937' }}>
                    <SkeletonTheme baseColor="#3a3f5c" highlightColor="#6C7293">
                        <Skeleton height={60} count={1} className="mb-4" />
                        <Skeleton height={40} count={5} />
                    </SkeletonTheme>
                </div>
            </div>
        );
    };

    // Définition des colonnes pour le DataTable
    const columns = [
        {
            field: 'prenom',
            header: 'الاسم',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالاسم',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالاسم" />,
            body: rowData => rowData.prenom.toUpperCase(),
            style: { minWidth: '150px', textAlign: 'center' }
        },
        {
            field: 'nom',
            header: 'النسب',
            filterable: true,
            filterPlaceholder: 'بحث بالنسب',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنسب" />,
            body: rowData => rowData.nom.toUpperCase(),
            style: { minWidth: '150px', textAlign: 'center' }
        },
        {
            field: 'ville_id',
            header: 'المدينة',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={villes?.map(v => ({ label: v.nom, value: v.id.toString() }))}
                placeholder="بحث بالمدينة" 
            />,
            body: villeBodyTemplate,
            style: { minWidth: '150px', textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'الإجراءات',
            body: actionBodyTemplate,
            style: { width: '15rem', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = deleguesLoading || villesLoading;

    // Rendu du composant avec le template
    if (loading && !delegues.length) {
        return loadingTemplate();
    }

    return (
        <DataTableTemplate
            title="قائمة المندوبين"
            data={delegues}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة مندوب"
            addButtonPath="/dashboard/composants/addDelegue"
            globalSearchFields={['prenom', 'nom']}
            emptyMessage="لا توجد مندوبين متاحة"
            onDelete={handleDelete}
            loadingTemplate={loadingTemplate}
        />
    );
}

export default DelegueListe;