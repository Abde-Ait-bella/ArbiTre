import React, { useState, useEffect } from 'react';
import { axiosClinet } from '../Api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosClinet.get('/users');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };


  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClinet.put(`/users/${editingUser.id}`, formData);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        await axiosClinet.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'active':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'blocked':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active':
        return 'نشط';
      case 'pending':
        return 'قيد المراجعة';
      case 'blocked':
        return 'محظور';
      default:
        return status;
    }
  };

  return (
    <div className="px-4 pt-4 container-fluid">
      <div className="row g-4">
        <div className="col-12">
          <div className="p-4 rounded bg-secondary">
            <h6 className="mb-4">إدارة المستخدمين</h6>
            <div className="table-responsive">
              <table className="table mb-0 align-middle text-start table-hover">
                <thead>
                  <tr className="text-white">
                    <th scope="col">الاسم</th>
                    <th scope="col">البريد الإلكتروني</th>
                    <th scope="col">الدور</th>
                    <th scope="col">الحالة</th>
                    <th scope="col">تاريخ الإنشاء</th>
                    <th scope="col">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array(5).fill().map((_, idx) => (
                      <tr key={idx}>
                        <td><Skeleton height={20} /></td>
                        <td><Skeleton height={20} /></td>
                        <td><Skeleton height={20} /></td>
                        <td><Skeleton height={20} /></td>
                        <td><Skeleton height={20} /></td>
                        <td><Skeleton height={20} /></td>
                      </tr>
                    ))
                  ) : (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role === 'super_admin' ? 'مشرف عام' : 'مستخدم'}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </td>
                        <td dir="ltr">{formatDate(user.created_at)}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(user)}>
                            تعديل
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h5 className="modal-title">تعديل المستخدم</h5>
                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">الاسم</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">الدور</label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">مستخدم</option>
                      <option value="super_admin">مشرف عام</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">الحالة</label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">نشط</option>
                      <option value="pending">قيد المراجعة</option>
                      <option value="blocked">محظور</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>إلغاء</button>
                    <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;