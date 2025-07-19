import { Link } from 'react-router-dom';
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

function ArbitreListe() {
    const { user } = AuthUser();
    
    // Récupérer les données des arbitres et des villes
    const { data: allArbitres, loading: arbitresLoading } = useDataFetching('/arbitre');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/arbitre', 
        '/dashboard/composants/deletedArbitre'
    );

    // Préparer les données: combiner les arbitres par défaut et ceux de l'utilisateur
    const arbitreDefault = allArbitres?.filter(a => a.user_id === null) || [];
    const userArbitres = allArbitres?.filter(a => parseInt(a.user_id) === user?.id) || [];
    const arbitres = [...arbitreDefault, ...userArbitres];
    
    // Template pour afficher la ville
    const villeBodyTemplate = (rowData) => {
        const ville = villes?.find(v => v.id === parseInt(rowData.ville_id));
        return ville ? ville.nom : '';
    };
    
    // Template pour les types d'arbitres (pour le filtre dropdown)
    const getArbitreTypes = () => {
        const types = [...new Set(arbitres.map(a => a.type))];
        return types.map(type => ({ label: type.toUpperCase(), value: type }));
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
                            updatePath="/dashboard/composants/updateArbitre"
                            tooltip="تعديل الحكم"
                        />
                        
                        {/* Utiliser le composant DeleteButton */}
                        <DeleteButton
                            itemId={rowData.id}
                            onDelete={handleDelete}
                            loading={loadingDelete}
                            loadingItemId={itemIdToDelete}
                                            loadingIcon="fa-solid fa-spinner fa-spin text-danger" // Optionnel: rouge pour le danger
                            tooltip="حذف الحكم"
                        />
                    </>
                ) : (
                    <span className="text-muted">حكم افتراضي</span>
                )}
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
            style: { textAlign: 'center' }
        },
        {
            field: 'nom',
            header: 'النسب',
            filterable: true,
            filterPlaceholder: 'بحث بالنسب',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنسب" />,
            body: rowData => rowData.nom.toUpperCase(),
            style: { textAlign: 'center' }
        },
        {
            field: 'type',
            header: 'التخصص',
            filterable: true,
            filterPlaceholder: 'بحث بالتخصص',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={getArbitreTypes()}
                placeholder="بحث بالتخصص" 
            />,
            body: rowData => rowData.type.toUpperCase(),
            style: { textAlign: 'center' }
        },
        {
            field: 'ville_id',
            header: 'المدينة',
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
            header: 'الحدف / التعديل',
            body: actionBodyTemplate,
            style: { width: '15rem', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = arbitresLoading || villesLoading;

    // Rendu du composant avec le template
    return (
        <DataTableTemplate
            title="قائمة الحكام"
            data={arbitres}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة الحكم"
            addButtonPath="/dashboard/composants/addArbitre"
            globalSearchFields={['prenom', 'nom', 'type']}
            emptyMessage="لا توجد حكام متاحة"
            onDelete={handleDelete}
        />
    );
}

export default ArbitreListe;