import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent, DropdownFilterComponent } from '../Utils/FilterComponents';
import { AuthUser } from '../../AuthContext';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function ClubListe() {
    const { user } = AuthUser();
    
    // Récupérer les données des clubs et des villes
    const { data: allClubs, loading: clubsLoading } = useDataFetching('/club');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/club',
        '/dashboard/composants/deletedClub'
    );

    // Préparer les données: combiner les clubs par défaut et ceux de l'utilisateur
    const clubsDefault = allClubs?.filter(c => c.user_id === null) || [];
    const userClubs = allClubs?.filter(c => parseInt(c.user_id) === user?.id) || [];
    const clubs = [...clubsDefault, ...userClubs];
    
    // Template pour afficher le nom du club avec l'abréviation
    const clubNameBodyTemplate = (rowData) => {
        return `${rowData.nom} (${rowData.abbr})`;
    };
    
    // Template pour afficher la ville
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
                        <Link to={`/dashboard/composants/updateClub/${rowData.id}`} className="p-button p-button-icon-only p-button-rounded p-button-text">
                            <i className="pi pi-wrench"></i>
                        </Link>
                        
                        <Button
                            icon={loadingDelete && itemIdToDelete === rowData.id ? 'pi pi-spin pi-spinner' : 'pi pi-trash'}
                            className="p-button-danger p-button-text p-button-rounded"
                            onClick={() => handleDelete(rowData.id)}
                            disabled={loadingDelete && itemIdToDelete === rowData.id}
                        />
                    </>
                ) : (
                    <span className="text-muted">نادي افتراضي</span>
                )}
            </div>
        );
    };

    // Définition des colonnes pour le DataTable
    const columns = [
        {
            field: 'nom',
            header: 'النادي',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالنادي',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنادي" />,
            body: clubNameBodyTemplate,
            style: { textAlign: 'center' }
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
            style: { textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'التعديل / الحذف',
            body: actionBodyTemplate,
            style: { width: '15rem', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = clubsLoading || villesLoading;

    // Rendu du composant avec le template
    return (
        <DataTableTemplate
            title="قائمة الأندية"
            data={clubs}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة نادي"
            addButtonPath="/dashboard/composants/addClub"
            globalSearchFields={['nom', 'abbr']}
            emptyMessage="لا توجد أندية متاحة"
            onDelete={handleDelete}
        />
    );
}

export default ClubListe;