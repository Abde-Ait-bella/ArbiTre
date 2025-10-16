import React, { useState, useEffect } from 'react';
import { useDataFetching } from '../Component/Utils/hooks';
import DataTableTemplate from '../Component/Utils/DataTableTemplate';
import { TextFilterComponent, DropdownFilterComponent } from '../Component/Utils/FilterComponents';
import DeleteButton from '../Component/Utils/DeleteButton';
import { axiosClinet } from '../Api/axios';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
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

  // Pour la suppression avec API
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Fonction de suppression avec API
  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteItemId(id);

    try {
      // Faire l'appel API
      await axiosClinet.delete(`/users/${id}`);

      // Mettre à jour l'état local après succès de l'API
      setUsers(users.filter(user => user.id !== id));

      // Afficher un message de succès
      toast.current.show({
        severity: 'success',
        summary: 'نجاح',
        detail: 'تم حذف المستخدم بنجاح',
        life: 3000
      });

      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur:`, error);
      toast.current.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء حذف المستخدم',
        life: 3000
      });
      return false;
    } finally {
      setDeleteLoading(false);
      setDeleteItemId(null);
    }
  };

  // Activer/Désactiver un utilisateur (avec appel API)
  const handleStatusChange = async (id, newStatus) => {
    console.log('handleStatusChange appelé avec id:', id, 'newStatus:', newStatus);
    
    // Trouver l'utilisateur concerné
    const user = users.find(u => u.id === id);
    
    // Vérifier si l'utilisateur est un admin
    if (user && user.role === 'super_admin') {
      toast.current.show({
        severity: 'warn',
        summary: 'تحذير',
        detail: 'لا يمكن تغيير حالة المشرفين',
        life: 3000
      });
      return;
    }

    try {
      let endpoint;

      // Déterminer le bon endpoint selon le nouveau statut
      switch (newStatus) {
        case 'accepted':
          endpoint = `admin/users/${id}/activate`;
          break;
        case 'rejected':
          endpoint = `admin/users/${id}/reject`;
          break;
        case 'pending':
          endpoint = `admin/users/${id}/pending`;
          break;
        default:
          console.error(`Statut non reconnu: ${newStatus}`);
          return;
      }

      // Faire l'appel API
      await axiosClinet.post(endpoint);

      // Mettre à jour l'état local après succès de l'API
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
        summary: 'نجاح',
        detail: 'تم تغيير حالة المستخدم بنجاح',
        life: 3000
      });
    } catch (error) {
      console.error(`Erreur lors du changement de statut de l'utilisateur:`, error);
      toast.current.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء تغيير الحالة',
        life: 3000
      });
    }
  };

  // Changer le rôle d'un utilisateur (avec API)
  const handleRoleChange = async (id, newRole) => {
    try {
      // Faire l'appel API
      await axiosClinet.post(`admin/users/${id}/role`, { role: newRole });

      // Mettre à jour l'état local après succès de l'API
      const updatedUsers = users.map(user => {
        if (user.id === id) {
          return { ...user, role: newRole };
        }
        return user;
      });

      setUsers(updatedUsers);

      // Afficher un message de succès
      toast.current.show({
        severity: 'success',
        summary: 'نجاح',
        detail: 'تم تغيير دور المستخدم بنجاح',
        life: 3000
      });
    } catch (error) {
      console.error(`Erreur lors du changement de rôle de l'utilisateur:`, error);
      toast.current.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء تغيير الدور',
        life: 3000
      });
    }
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

  // Template pour le statut
  const statusBodyTemplate = (rowData) => {
    const statusClass = {
      'accepted': 'bg-success',
      'pending': 'bg-warning',
      'rejected': 'bg-danger'
    };

    const statusText = {
      'accepted': 'نشط',
      'pending': 'قيد المراجعة',
      'rejected': 'محظور'
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

    // Vérifier si l'utilisateur est un admin (super_admin)
    const isAdmin = rowData.role === 'super_admin';

    return (
      <div className="flex gap-2 justify-content-center">
        {/* Dropdown pour changer le statut - caché pour les admins */}
        {!isAdmin && (
          <Dropdown
            value={statusOptions.find(opt => opt.value === rowData.status)}
            options={statusOptions}
            onChange={(e) => {
              console.log('Changing status for user:', rowData.id, 'to:', e.value);
              handleStatusChange(rowData.id, e.value);
            }}
            className="rtl-dropdown status-dropdown"
            optionLabel="label"
            placeholder="اختر الحالة"
            itemTemplate={statusOptionTemplate}
            valueTemplate={selectedStatusTemplate}
          />
        )}

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
          loadingIcon="fa-solid fa-spinner fa-spin text-danger fs-2"
          tooltip="حذف المستخدم"
        />
      </div>
    );
  };

  // Définition des colonnes pour le DataTable
  const columns = [
    {
      field: 'name',
      header: 'الاسم',
      sortable: true,
      filterPlaceholder: 'بحث بالاسم',
      filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالاسم" />,
      style: { textAlign: 'center' }
    },
    {
      field: 'email',
      header: 'البريد الإلكتروني',
      filterPlaceholder: 'بحث بالبريد',
      filterElement: options => <TextFilterComponent options={options} placeholder="بحث بالبريد" />,
      style: { textAlign: 'center' }
    },
    {
      field: 'role',
      header: 'الدور',
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
      filterPlaceholder: 'بحث بالحالة',
      filterElement: options => <DropdownFilterComponent
        options={options}
        items={[
          { label: 'نشط', value: 'accepted' },
          { label: 'قيد المراجعة', value: 'pending' },
          { label: 'محظور', value: 'rejected' }
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
      style: { textAlign: 'center', minWidth: '150px' }
    },
    {
      field: 'actions',
      header: 'الإجراءات',
      body: actionBodyTemplate,
      style: { minWidth: '20rem', textAlign: 'center' }
    }
  ];

  // Rendu du composant avec le template
  return (
    <>
      <Toast ref={toast} position="top-center" />

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