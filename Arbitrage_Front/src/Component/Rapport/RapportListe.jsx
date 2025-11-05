import { Tag } from 'primereact/tag';
import { useDataFetching, useDeleteItem } from '../Utils/hooks';
import DataTableTemplate from '../Utils/DataTableTemplate';
import { TextFilterComponent, DateFilterComponent, DropdownFilterComponent } from '../Utils/FilterComponents';
import { AuthUser } from '../../AuthContext';
import PdfPrintButton from '../Utils/PdfPrintButton';
import DetailsButton from '../Utils/DetailsButton';
import UpdateButton from '../Utils/UpdateButton';
import DeleteButton from '../Utils/DeleteButton';
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
    const filteredMatches = allMatches?.filter(
        m => parseInt(m.user_id) == user?.id || m.user_id === null
    ) || [];
    
    // Transformer les données pour le DataTable
    const matches = filteredMatches.map(match => {
        const clubHome = clubs?.find(c => c.id === parseInt(match.club_id_1));
        const clubAway = clubs?.find(c => c.id === parseInt(match.club_id_2));
        const comp = competition?.find(c => c.id === parseInt(match.competition_id));
        const cat = categories?.find(c => c.id === parseInt(match.categorie_id));
        const ville = villes?.find(v => v.id === parseInt(match.ville_id));
        
        // Traitement de la date
        let formattedDate = null;
        if (match.date) {
            if (match.date instanceof Date) {
                formattedDate = match.date;
            } else if (typeof match.date === 'string') {
                const parsedDate = new Date(match.date);
                if (!isNaN(parsedDate.getTime())) {
                    formattedDate = parsedDate;
                }
            }
        }

        return {
            id: match.id,
            date: formattedDate,
            clubHome: clubHome ? `${clubHome.nom} (${clubHome.abbr})` : '',
            clubAway: clubAway ? `${clubAway.nom} (${clubAway.abbr})` : '',
            competition: comp ? comp.nom : '',
            category: cat ? cat.nom : '',
            result: `${match.result_club_1}-${match.result_club_2}`,
            ville: ville ? ville.nom : '',
            originalData: match,
            // Ajouter les données nécessaires pour le bouton PDF
            homeClubName: clubHome?.nom || 'النادي الأول',
            awayClubName: clubAway?.nom || 'النادي الثاني',
            matchDate: formattedDate ? formattedDate.toISOString().split('T')[0] : 'no-date'
        };
    });

    // Template pour afficher la date formatée
    const dateBodyTemplate = (rowData) => {
        if (!rowData.date) return '';
        
        if (rowData.date instanceof Date) {
            const day = rowData.date.getDate().toString().padStart(2, '0');
            const month = (rowData.date.getMonth() + 1).toString().padStart(2, '0');
            const year = rowData.date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        
        return rowData.date;
    };

    // Template pour afficher le résultat avec un Tag
    const resultBodyTemplate = (rowData) => {
        return <Tag value={rowData.result} severity="info" />;
    };
    
    // Template pour les actions - Utilisation des composants réutilisables
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-content-center">
                {/* Utiliser le composant UpdateButton */}
                <UpdateButton
                    itemId={rowData.id}
                    updatePath="/dashboard/updateMatche"
                    tooltip="تعديل المباراة"
                />

                {/* Utiliser le composant DetailsButton */}
                <DetailsButton
                    matchId={rowData.id}
                    className="rounded p-button btn-warning p-button-sm"
                    tooltip="عرض تفاصيل التقرير"
                >
                    التفاصيل
                </DetailsButton>

                {/* Utiliser le composant PdfPrintButton */}
                <PdfPrintButton
                    matchId={rowData.id}
                    homeClubName={rowData.homeClubName}
                    awayClubName={rowData.awayClubName}
                    matchDate={rowData.matchDate}
                    className="rounded p-button-success p-button-sm"
                    tooltip="طباعة التقرير"
                >
                    طباعة
                </PdfPrintButton>
                
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
            style: { minWidth: '150px', textAlign: 'right' }
        },
        {
            field: 'clubHome',
            header: 'الفريق المستقبل',
            filterable: true,
            filterPlaceholder: 'بحث بالفريق المستقبل',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالفريق المستقبل" />,
            style: { minWidth: '200px', textAlign: 'right' }
        },
        {
            field: 'clubAway',
            header: 'الفريق الزائر',
            filterable: true,
            filterPlaceholder: 'بحث بالفريق الزائر',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالفريق الزائر" />,
            style: { minWidth: '200px', textAlign: 'right' }
        },
        {
            field: 'competition',
            header: 'المنافسة',
            filterable: true,
            filterPlaceholder: 'بحث بالمنافسة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={competition?.map(c => ({label: c.nom, value: c.nom})) || []}
                placeholder="بحث بالمنافسة" 
            />,
            style: { minWidth: '150px', textAlign: 'right' }
        },
        {
            field: 'category',
            header: 'الفئة',
            filterable: true,
            filterPlaceholder: 'بحث بالفئة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={categories?.map(c => ({label: c.nom, value: c.nom})) || []}
                placeholder="بحث بالفئة" 
            />,
            style: { minWidth: '150px', textAlign: 'right' }
        },
        {
            field: 'result',
            header: 'النتيجة',
            filterable: true,
            filterPlaceholder: 'بحث بالنتيجة',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالنتيجة" />,
            body: resultBodyTemplate,
            style: { minWidth: '100px', textAlign: 'right' }
        },
        {
            field: 'ville',
            header: 'المدينة',
            filterable: true,
            filterPlaceholder: 'بحث بالمدينة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={villes?.map(v => ({label: v.nom, value: v.nom})) || []}
                placeholder="بحث بالمدينة" 
            />,
            style: { minWidth: '150px', textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'الإجراءات',
            body: actionBodyTemplate,
            style: { minWidth: '250px', textAlign: 'center' }
        }
    ];

    // État de chargement combiné
    const loading = matchesLoading || clubsLoading || villesLoading || competitionLoading || categoriesLoading;

    // Rendu du composant avec le template
    return (
        <DataTableTemplate
            title="قائمة التقارير"
            data={matches}
            columns={columns}
            loading={loading}
            addButtonLabel="إضافة تقرير"
            addButtonPath="/dashboard/addRapport"
            globalSearchFields={['date', 'clubHome', 'clubAway', 'competition', 'category', 'result', 'ville']}
            emptyMessage="لا توجد مباريات متاحة"
            onDelete={handleDelete}
        />
    );
}

export default Matches;