import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent, DateFilterComponent, DropdownFilterComponent } from '../Utils/FilterComponents';
import { AuthUser } from '../../AuthContext';
import UpdateButton from '../Utils/UpdateButton';
import DeleteButton from '../Utils/DeleteButton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function Matches() {
    const { user } = AuthUser();
    
    // Récupérer toutes les données nécessaires avec nos hooks personnalisés
    const { data: allMatches, loading: matchesLoading } = useDataFetching('/matche');
    const { data: clubs, loading: clubsLoading } = useDataFetching('/club');
    const { data: villes, loading: villesLoading } = useDataFetching('/ville');
    const { data: competition, loading: competitionLoading } = useDataFetching('/competition');
    const { data: categories, loading: categoriesLoading } = useDataFetching('/category');
    
    // Gérer la suppression avec le hook personnalisé
    const { handleDelete, loadingDelete, itemIdToDelete } = useDeleteItem(
        '/matche',
        '/dashboard/DeletedMatche'
    );

    // Filtrer les matches de l'utilisateur
    const matches = allMatches?.filter(
        m => parseInt(m.user_id) === user?.id
    ) || [];
    
    // Template pour afficher la date formatée
    const dateBodyTemplate = (rowData) => {
        if (!rowData.date) return '';
        
        try {
            const dateObj = new Date(rowData.date);
            if (!isNaN(dateObj.getTime())) {
                const day = dateObj.getDate().toString().padStart(2, '0');
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const year = dateObj.getFullYear();
                return `${day}/${month}/${year}`;
            }
        } catch (error) {
            console.error("Date parsing error", error);
        }
        
        return rowData.date;
    };
    
    // Template pour afficher le club domicile
    const homeClubBodyTemplate = (rowData) => {
        const club = clubs?.find(c => c.id === parseInt(rowData.club_id_1));
        return club ? `${club.nom} (${club.abbr})` : '';
    };
    
    // Template pour afficher le club visiteur
    const awayClubBodyTemplate = (rowData) => {
        const club = clubs?.find(c => c.id === parseInt(rowData.club_id_2));
        return club ? `${club.nom} (${club.abbr})` : '';
    };
    
    // Template pour afficher la compétition
    const competitionBodyTemplate = (rowData) => {
        const comp = competition?.find(c => c.id === parseInt(rowData.competition_id));
        return comp ? comp.nom : '';
    };
    
    // Template pour afficher la catégorie
    const categoryBodyTemplate = (rowData) => {
        const cat = categories?.find(c => c.id === parseInt(rowData.categorie_id));
        return cat ? cat.nom : '';
    };
    
    // Template pour afficher le résultat
    const resultBodyTemplate = (rowData) => {
        return <Tag value={`${rowData.result_club_1}-${rowData.result_club_2}`} severity="info" />;
    };
    
    // Template pour afficher la ville
    const villeBodyTemplate = (rowData) => {
        const ville = villes?.find(v => v.id === parseInt(rowData.ville_id));
        return ville ? ville.nom : '';
    };
    
    // Template pour les actions
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center">
                {/* Utiliser le composant UpdateButton */}
                <UpdateButton
                    itemId={rowData.id}
                    updatePath="/updateMatche"
                    tooltip="تعديل المباراة"
                />
                
                {/* Utiliser le composant DeleteButton avec loader Font Awesome */}
                <DeleteButton
                    itemId={rowData.id}
                    onDelete={handleDelete}
                    loading={loadingDelete}
                    loadingItemId={itemIdToDelete}
                    loadingIcon="fa-solid fa-spinner fa-spin text-danger"
                    tooltip="حذف المباراة"
                />
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
            field: 'date',
            header: 'التاريخ',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالتاريخ',
            filterElement: options => <DateFilterComponent options={options} placeholder="بحث بالتاريخ" />,
            body: dateBodyTemplate,
            style: { minWidth: '120px', textAlign: 'center' }
        },
        {
            field: 'club_id_1',
            header: 'الفريق المستقبل',
            filterable: true,
            filterPlaceholder: 'بحث بالفريق المستقبل',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={clubs?.map(c => ({label: `${c.nom} (${c.abbr})`, value: c.id.toString()})) || []}
                placeholder="بحث بالفريق المستقبل"
            />,
            body: homeClubBodyTemplate,
            style: { minWidth: '180px', textAlign: 'center' }
        },
        {
            field: 'club_id_2',
            header: 'الفريق الزائر',
            filterable: true,
            filterPlaceholder: 'بحث بالفريق الزائر',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={clubs?.map(c => ({label: `${c.nom} (${c.abbr})`, value: c.id.toString()})) || []}
                placeholder="بحث بالفريق الزائر"
            />,
            body: awayClubBodyTemplate,
            style: { minWidth: '180px', textAlign: 'center' }
        },
        {
            field: 'competition_id',
            header: 'المنافسة',
            filterable: true,
            filterPlaceholder: 'بحث بالمنافسة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={competition?.map(c => ({label: c.nom, value: c.id.toString()})) || []}
                placeholder="بحث بالمنافسة"
            />,
            body: competitionBodyTemplate,
            style: { minWidth: '150px', textAlign: 'center' }
        },
        {
            field: 'categorie_id',
            header: 'الفئة',
            filterable: true,
            filterPlaceholder: 'بحث بالفئة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={categories?.map(c => ({label: c.nom, value: c.id.toString()})) || []}
                placeholder="بحث بالفئة"
            />,
            body: categoryBodyTemplate,
            style: { minWidth: '120px', textAlign: 'center' }
        },
        {
            field: 'result',
            header: 'النتيجة',
            filterable: true,
            filterPlaceholder: 'بحث بالنتيجة',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنتيجة" />,
            body: resultBodyTemplate,
            style: { minWidth: '100px', textAlign: 'center' }
        },
        {
            field: 'ville_id',
            header: 'المدينة',
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={villes?.map(v => ({label: v.nom, value: v.id.toString()})) || []}
                placeholder="بحث بالمدينة"
            />,
            body: villeBodyTemplate,
            style: { minWidth: '120px', textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'التعديل / الحذف',
            body: actionBodyTemplate,
            style: { width: '120px', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = matchesLoading || clubsLoading || villesLoading || competitionLoading || categoriesLoading;

    // Rendu du composant avec le template
    if (loading && !matches.length) {
        return loadingTemplate();
    }

    return (
        <DataTableTemplate
            title="قائمة المباريات"
            data={matches}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة مباراة"
            addButtonPath="/dashboard/addMatche"
            globalSearchFields={['date', 'club_id_1', 'club_id_2', 'competition_id', 'categorie_id', 'ville_id']}
            emptyMessage="لا توجد مباريات متاحة"
            onDelete={handleDelete}
            loadingTemplate={loadingTemplate}
        />
    );
}

export default Matches;