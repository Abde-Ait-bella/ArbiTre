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

function StadesListe() {
    const { user } = AuthUser();
    
    // Récupérer les données des stades et des villes avec nos hooks personnalisés
    const { data: allStades, loading: stadesLoading } = useDataFetching('/stade');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/stade',
        '/dashboard/composants/deletedStade'
    );

    // Préparer les données: combiner les stades par défaut et ceux de l'utilisateur
    const stadesDefault = allStades?.filter(s => s.user_id === null) || [];
    const userStades = allStades?.filter(s => parseInt(s.user_id) == user?.id) || [];
    const stades = [...stadesDefault, ...userStades];
    
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
                            updatePath="/dashboard/composants/updateStade"
                            tooltip="تعديل الملعب"
                        />
                        
                        {/* Utiliser le composant DeleteButton avec loader Font Awesome */}
                        <DeleteButton
                            itemId={rowData.id}
                            onDelete={handleDelete}
                            loading={loadingDelete}
                            loadingItemId={itemIdToDelete}
                            loadingIcon="fa-solid fa-spinner fa-spin text-danger"
                            tooltip="حذف الملعب"
                        />
                    </>
                ) : (
                    <span className="text-muted">ملعب افتراضي</span>
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
            field: 'nom',
            header: 'الملعب',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالملعب',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالملعب" />,
            style: { minWidth: '200px', textAlign: 'center' }
        },
        {
            field: 'ville_id',
            header: 'المدينة أو الجماعة',
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={villes?.map(v => ({ label: v.nom, value: v.id.toString() }))}
                placeholder="بحث بالمدينة" 
            />,
            body: villeBodyTemplate,
            style: { minWidth: '200px', textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'الحدف أو التعديل',
            body: actionBodyTemplate,
            style: { width: '15rem', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = stadesLoading || villesLoading;

    // Rendu du composant avec le template
    if (loading && !stades.length) {
        return loadingTemplate();
    }

    return (
        <DataTableTemplate
            title="قائمة الملاعب"
            data={stades}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة ملعب"
            addButtonPath="/dashboard/composants/addStade"
            globalSearchFields={['nom']}
            emptyMessage="لا توجد ملاعب متاحة"
            onDelete={handleDelete}
            loadingTemplate={loadingTemplate}
        />
    );
}

export default StadesListe;