import React, { useState, useEffect } from 'react';
import { useDataFetching } from '../Component/Utils/hooks';
import DataTableTemplate from '../Component/Utils/DataTableTemplate';
import { TextFilterComponent, DropdownFilterComponent } from '../Component/Utils/FilterComponents';
import DeleteButton from '../Component/Utils/DeleteButton';
import { axiosClinet } from '../Api/axios';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function UserManagement() {
    // Référence pour les messages toast
    const toast = React.useRef(null);
    
    // Récupérer les données des utilisateurs
    const { data: usersData, loading: usersLoading, error } = useDataFetching('/users');
    
    // S'assurer que les données sont un tableau
    const [users, setUsers] = useState([]);
    
    // États pour la sélection multiple
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [loadingBulkAction, setLoadingBulkAction] = useState(false);
    
    // Options pour le statut en masse
    const statusOptions = [
        { label: 'تفعيل', value: 'accepted' },
        { label: 'تعليق', value: 'pending' },
        { label: 'حظر', value: 'rejected' }
    ];
    
    useEffect(() => {
        // Vérifier si usersData est un tableau, sinon le convertir
        if (usersData) {
            if (Array.isArray(usersData)) {
                setUsers(usersData);
            } else if (usersData.data && Array.isArray(usersData.data)) {
                // Si l'API retourne un objet avec une propriété data qui est un tableau
                setUsers(usersData.data);
            } else {
                // Sinon, initialiser avec un tableau vide
                console.error('Les données des utilisateurs ne sont pas au format attendu:', usersData);
                setUsers([]);
            }
        }
    }, [usersData]);
    
    // Fonction pour actualiser les données
    const refetchUsers = async () => {
        try {
            const response = await axiosClinet.get('/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors de l\'actualisation des utilisateurs:', error);
        }
    };
    
    // Fonction pour effectuer une action en masse sur les utilisateurs sélectionnés (changement local seulement)
    const handleBulkStatusChange = () => {
        if (!selectedStatus || selectedUsers.length === 0) {
            toast.current.show({ 
                severity: 'warn', 
                summary: 'تحذير', 
                detail: 'يرجى تحديد المستخدمين والحالة', 
                life: 3000 
            });
            return;
        }
        
        setLoadingBulkAction(true);
        
        try {
            // Obtenir les IDs des utilisateurs sélectionnés
            const selectedIds = selectedUsers.map(user => user.id);
            
            // Mettre à jour l'état local des utilisateurs sans appel API
            const updatedUsers = users.map(user => {
                if (selectedIds.includes(user.id)) {
                    return { ...user, status: selectedStatus };
                }
                return user;
            });
            
            setUsers(updatedUsers);
            
            // Afficher un message de succès
            toast.current.show({ 
                severity: 'success', 
                summary: 'تغيير الحالة', 
                detail: `تم تغيير حالة ${selectedUsers.length} مستخدمين (تغيير محلي فقط)`, 
                life: 3000 
            });
            
            // Réinitialiser la sélection
            setSelectedUsers([]);
            setSelectedStatus(null);
            
        } catch (error) {
            console.error('Erreur lors du changement de statut en masse:', error);
            toast.current.show({ 
                severity: 'error', 
                summary: 'خطأ', 
                detail: 'حدث خطأ أثناء تغيير الحالة', 
                life: 3000 
            });
        } finally {
            setLoadingBulkAction(false);
        }
    };
    
    // Pour la suppression locale (sans API)
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    
    // Fonction de suppression locale
    const handleDelete = (id) => {
        setDeleteLoading(true);
        setDeleteItemId(id);
        
        // Simuler un délai
        setTimeout(() => {
            // Supprimer l'utilisateur de l'état local
            setUsers(users.filter(user => user.id !== id));
            
            // Afficher un message de succès
            toast.current.show({
                severity: 'info', 
                summary: 'حذف', 
                detail: 'تم حذف المستخدم (تغيير محلي فقط)', 
                life: 3000 
            });
            
            setDeleteLoading(false);
            setDeleteItemId(null);
        }, 800); // Simuler un délai de 800ms
        
        return true;
    };

    // Activer/Désactiver un utilisateur (changement local seulement)
    const handleStatusChange = (id, newStatus) => {
        console.log('handleStatusChange appelé avec id:', id, 'newStatus:', newStatus);
        
        // Mettre à jour l'état local des utilisateurs sans appel API
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                console.log('Mise à jour du statut de l\'utilisateur:', user.name, 'de', user.status, 'à', newStatus);
                return { ...user, status: newStatus };
            }
            return user;
        });
        
        setUsers(updatedUsers);
        
        // Afficher un message de succès
        toast.current.show({ 
            severity: 'success', 
            summary: 'تغيير الحالة', 
            detail: 'تم تغيير حالة المستخدم (تغيير محلي فقط)', 
            life: 3000 
        });
    };

    // Changer le rôle d'un utilisateur (changement local seulement)
    const handleRoleChange = (id, newRole) => {
        // Mettre à jour l'état local des utilisateurs sans appel API
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return { ...user, role: newRole };
            }
            return user;
        });
        
        setUsers(updatedUsers);
        
        // Afficher un message de succès
        toast.current.show({ 
            severity: 'info', 
            summary: 'تغيير الدور', 
            detail: 'تم تغيير دور المستخدم (تغيير محلي فقط)', 
            life: 3000 
        });
    };

    // Formater la date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Template pour la case à cocher de sélection
    const selectionBodyTemplate = (rowData) => {
        return (
            <Checkbox
                checked={selectedUsers.some(u => u.id === rowData.id)}
                onChange={() => {
                    const isSelected = selectedUsers.some(u => u.id === rowData.id);
                    if (isSelected) {
                        setSelectedUsers(selectedUsers.filter(u => u.id !== rowData.id));
                    } else {
                        setSelectedUsers([...selectedUsers, rowData]);
                    }
                }}
            />
        );
    };
    
    // Template pour le statut
    const statusBodyTemplate = (rowData) => {
        const statusClass = {
            'active': 'bg-success',
            'pending': 'bg-warning',
            'blocked': 'bg-danger'
        };
        
        const statusText = {
            'active': 'نشط',
            'pending': 'قيد المراجعة',
            'blocked': 'محظور'
        };
        
        return (
            <span className={`badge ${statusClass[rowData.status] || 'bg-secondary'}`}>
                {statusText[rowData.status] || rowData.status}
            </span>
        );
    };
    
    // Template pour le rôle
    const roleBodyTemplate = (rowData) => {
        return rowData.role === 'super_admin' ? 'مشرف عام' : 'مستخدم';
    };
    
    // Template pour la date de création
    const dateBodyTemplate = (rowData) => {
        return <span dir="ltr">{formatDate(rowData.created_at)}</span>;
    };
    
    // Template pour les actions
    const actionBodyTemplate = (rowData) => {
        const statusOptions = [
            { label: 'نشط', value: 'accepted', className: 'status-active' },
            { label: 'قيد المراجعة', value: 'pending', className: 'status-pending' },
            { label: 'محظور', value: 'rejected', className: 'status-blocked' }
        ];
        
        // Template personnalisé pour les options du dropdown
        const statusOptionTemplate = (option) => {
            return (
                <div className={`status-option ${option.className}`}>
                    {option.label}
                </div>
            );
        };
        
        // Template pour la valeur sélectionnée
        const selectedStatusTemplate = (option, props) => {
            if (option) {
                return (
                    <div className={`selected-status ${option.className}`}>
                        {option.label}
                    </div>
                );
            }
            return <span>{props.placeholder}</span>;
        };
        
        return (
            <div className="flex gap-2 justify-content-center">
                {/* Dropdown pour changer le statut */}
                <Dropdown
                    value={statusOptions.find(opt => opt.value === rowData.status)}
                    options={statusOptions}
                    onChange={handleBulkStatusChange}
                    className="rtl-dropdown status-dropdown"
                    optionLabel="label"
                    placeholder="اختر الحالة"
                    itemTemplate={statusOptionTemplate}
                    valueTemplate={selectedStatusTemplate}
                />
                
                {/* Bouton pour changer le rôle */}
                <button 
                    className="btn btn-sm btn-info"
                    onClick={() => handleRoleChange(rowData.id, rowData.role === 'super_admin' ? 'user' : 'super_admin')}
                >
                    {rowData.role === 'super_admin' ? 'جعله مستخدم' : 'جعله مشرف'}
                </button>
                
                {/* Utiliser le composant DeleteButton */}
                <DeleteButton
                    itemId={rowData.id}
                    onDelete={handleDelete}
                    loading={deleteLoading}
                    loadingItemId={deleteItemId}
                    loadingIcon="fa-solid fa-spinner fa-spin text-danger"
                    tooltip="حذف المستخدم"
                />
            </div>
        );
    };

    // Définition des colonnes pour le DataTable
    const columns = [
        {
            field: 'selection',
            header: 'تحديد',
            body: selectionBodyTemplate,
            style: { width: '4rem', textAlign: 'center' }
        },
        {
            field: 'name',
            header: 'الاسم',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'بحث بالاسم',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالاسم" />,
            style: { textAlign: 'center' }
        },
        {
            field: 'email',
            header: 'البريد الإلكتروني',
            filterable: true,
            filterPlaceholder: 'بحث بالبريد',
            filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالبريد" />,
            style: { textAlign: 'center' }
        },
        {
            field: 'role',
            header: 'الدور',
            filterable: true,
            filterPlaceholder: 'بحث بالدور',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={[
                    { label: 'مشرف عام', value: 'super_admin' },
                    { label: 'مستخدم', value: 'user' }
                ]}
                placeholder="بحث بالدور" 
            />,
            body: roleBodyTemplate,
            style: { textAlign: 'center' }
        },
        {
            field: 'status',
            header: 'الحالة',
            filterable: true,
            filterPlaceholder: 'بحث بالحالة',
            filterElement: options => <DropdownFilterComponent 
                options={options} 
                items={[
                    { label: 'نشط', value: 'active' },
                    { label: 'قيد المراجعة', value: 'pending' },
                    { label: 'محظور', value: 'blocked' }
                ]}
                placeholder="بحث بالحالة" 
            />,
            body: statusBodyTemplate,
            style: { textAlign: 'center' }
        },
        {
            field: 'created_at',
            header: 'تاريخ الإنشاء',
            sortable: true,
            body: dateBodyTemplate,
            style: { textAlign: 'center' }
        },
        {
            field: 'actions',
            header: 'الإجراءات',
            body: actionBodyTemplate,
            style: { width: '20rem', textAlign: 'center' }
        }
    ];

    // Rendu du composant avec le template
    return (
        <>
            <Toast ref={toast} position="top-center" />
            
            {/* Actions en masse */}
            <div className="px-4 pt-4 container-fluid">
                <div className="p-3 rounded d-flex align-items-center justify-content-between" 
                     style={{ backgroundColor: '#1f2937', marginBottom: '1rem' }}>
                    <div className="d-flex align-items-center">
                        <span className="text-white me-2">
                            {selectedUsers.length > 0 
                                ? `تم تحديد ${selectedUsers.length} مستخدم` 
                                : 'لم يتم تحديد أي مستخدم'}
                        </span>
                    </div>
                    
                    <div className="gap-2 d-flex align-items-center">
                        <Dropdown
                            value={selectedStatus}
                            options={statusOptions}
                            onChange={(e) => setSelectedStatus(e.value)}
                            placeholder="اختر الحالة"
                            className="rtl-dropdown"
                            disabled={selectedUsers.length === 0}
                        />
                        
                        <Button
                            label="تطبيق"
                            icon={loadingBulkAction ? "pi pi-spin pi-spinner" : "pi pi-check"}
                            className="p-button-success"
                            onClick={handleBulkStatusChange}
                            disabled={!selectedStatus || selectedUsers.length === 0 || loadingBulkAction}
                        />
                    </div>
                </div>
            </div>
            
            <DataTableTemplate
                title="إدارة المستخدمين"
                data={users}
                columns={columns}
                loading={usersLoading}
                globalSearchFields={['name', 'email', 'role', 'status']}
                emptyMessage="لا يوجد مستخدمين متاحين"
                onDelete={handleDelete}
                showAddButton={false}
            />
            
            {/* Style personnalisé pour les dropdowns dans la table */}
            <style jsx>{`
                .status-dropdown .p-dropdown {
                    min-width: 120px;
                    height: 32px;
                }
                
                .status-dropdown .p-dropdown-label {
                    padding-top: 0.25rem;
                    padding-bottom: 0.25rem;
                    font-size: 0.875rem;
                }
                
                .status-dropdown .p-dropdown-trigger {
                    width: 2rem;
                }
                
                .status-option, .selected-status {
                    display: flex;
                    align-items: center;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 500;
                }
                
                .status-active {
                    background-color: rgba(25, 135, 84, 0.1);
                    color: #198754;
                }
                
                .status-pending {
                    background-color: rgba(255, 193, 7, 0.1);
                    color: #ffc107;
                }
                
                .status-blocked {
                    background-color: rgba(220, 53, 69, 0.1);
                    color: #dc3545;
                }
            `}</style>
        </>
    );
}

export default UserManagement;