import React from 'react';
import { Button } from 'primereact/button';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent, DropdownFilterComponent } from '../Utils/FilterComponents';
import { AuthUser } from '../../AuthContext';
import UpdateButton from '../Utils/UpdateButton';
import DeleteButton from '../Utils/DeleteButton';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function ClubListe() {
    const { user } = AuthUser();
    
    // Récupérer les données nécessaires avec les hooks personnalisés
    const { data: allClubs, loading: clubsLoading } = useDataFetching('/club');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(    
        '/club',
        '/dashboard/composants/deletedClub'
    );

    // Filtrer les clubs de l'utilisateur - MÊME PRINCIPE QUE RAPPORTLISTE
    const filteredClubs = allClubs?.filter(
        club => parseInt(club.user_id) == user?.id || club.user_id === null
    ) || [];
    
    // Transformer les données pour le DataTable - MÊME PRINCIPE QUE RAPPORTLISTE
    const clubs = filteredClubs.map(club => {
        const ville = villes?.find(v => v.id === parseInt(club.ville_id));
        
        return {
            id: club.id,
            nom: club.nom,
            abbr: club.abbr,
            ville: ville ? ville.nom : '',
            user_id: club.user_id,
            originalData: club
        };
    });

    // Template pour afficher le nom du club avec l'abréviation
    const clubNameBodyTemplate = (rowData) => {
        return `${rowData.nom} (${rowData.abbr})`;
    };

    // Template pour les actions - MÊME PRINCIPE QUE RAPPORTLISTE
    const actionBodyTemplate = (rowData) => {
        const isDefault = rowData.user_id === null;
        
        return (
            <div className="flex gap-2 justify-content-center">
                {!isDefault ? (
                    <>
                        {/* Utiliser le composant UpdateButton */}
                        <UpdateButton
                            itemId={rowData.id}
                            updatePath="/dashboard/composants/updateClub"
                            tooltip="تعديل النادي"
                        />

                        {/* Utiliser le composant DeleteButton - MÊME PRINCIPE QUE RAPPORTLISTE */}
                        <DeleteButton
                            itemId={rowData.id}
                            onDelete={handleDelete}
                            loading={loadingDelete}
                            loadingItemId={itemIdToDelete}
                            tooltip="حذف النادي"
                        />
                    </>
                ) : (
                    <span className="text-muted">نادي افتراضي</span>
                )}
            </div>
        );
    };

    // Définition des colonnes pour le DataTable - MÊME PRINCIPE QUE RAPPORTLISTE
    const columns = [
        {
            field: 'nom',
            header: 'النادي',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالنادي',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنادي" />,
            body: clubNameBodyTemplate,
            style: { minWidth: '200px', textAlign: 'right' }
        },
        {
            field: 'ville',
            header: 'المدينة أو الجماعة',
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={villes?.map(v => ({label: v.nom, value: v.nom})) || []}
                placeholder="بحث بالمدينة" 
            />,
            style: { minWidth: '150px', textAlign: 'right' }
        },
        {
            field: 'actions',
            header: 'التعديل / الحذف',
            body: actionBodyTemplate,
            style: { minWidth: '200px', textAlign: 'center' }
        }
    ];

    // État de chargement combiné - MÊME PRINCIPE QUE RAPPORTLISTE
    const loading = clubsLoading || villesLoading;

    // Rendu du composant avec le template - MÊME PRINCIPE QUE RAPPORTLISTE
    return (
        <DataTableTemplate
            title="قائمة الأندية"
            data={clubs}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة نادي"
            addButtonPath="/dashboard/composants/addClub"
            globalSearchFields={['nom', 'abbr', 'ville']}
            emptyMessage="لا توجد أندية متاحة"
            onDelete={handleDelete}
        />
    );
}

export default ClubListe;