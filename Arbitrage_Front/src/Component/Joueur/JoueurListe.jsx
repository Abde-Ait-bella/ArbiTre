import { Link } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent } from '../Utils/FilterComponents';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function JoueurListe() {
    // Utiliser nos hooks personnalisés
    const { data: joueurs, loading } = useDataFetching(
        '/joueur', 
        (data, user) => data.filter(j => parseInt(j.user_id) === user?.id)
    );
    
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/joueur', 
        '/dashboard/composants/deletedJoueur'
    );

    // Template pour les actions (modifier, supprimer)
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center">
                <Link to={`/dashboard/composants/updateJoueur/${rowData.id}`} className="p-button p-button-icon-only p-button-rounded p-button-text">
                    <i className="pi pi-wrench"></i>
                </Link>
                
                <Button
                    icon={loadingDelete && itemIdToDelete === rowData.id ? 'pi pi-spin pi-spinner' : 'pi pi-trash'}
                    className="p-button-danger p-button-text p-button-rounded"
                    onClick={() => handleDelete(rowData.id)}
                    disabled={loadingDelete && itemIdToDelete === rowData.id}
                />
            </div>
        );
    };

    // Définir les colonnes pour notre DataTable
    const columns = [
        {
            field: 'nom',
            header: 'الاسم',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالاسم',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالاسم" />,
            body: rowData => rowData.nom.toUpperCase()
        },
        {
            field: 'joueur_numero_licence',
            header: 'رقم الرخصة',
            filterable: true,
            filterPlaceholder: 'بحث برقم الرخصة',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث برقم الرخصة" />,
            body: rowData => rowData.joueur_numero_licence.toUpperCase()
        },
        {
            field: 'joueur_numero',
            header: 'رقم الاعب',
            filterable: true,
            filterPlaceholder: 'بحث برقم الاعب',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث برقم الاعب" />
        },
        {
            field: 'actions',
            header: 'الإجراءات',
            body: actionBodyTemplate,
            style: { width: '10rem', textAlign: 'center' }
        }
    ];

    // Utiliser notre composant DataTable générique
    return (
        <DataTableTemplate
            title="قائمة اللاعبين"
            data={joueurs}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة لاعب"
            addButtonPath="/dashboard/composants/addJoueur"
            globalSearchFields={['nom', 'joueur_numero_licence', 'joueur_numero']}
            emptyMessage="لا توجد لاعبين متاحة"
            onDelete={handleDelete}
        />
    );
}

export default JoueurListe;