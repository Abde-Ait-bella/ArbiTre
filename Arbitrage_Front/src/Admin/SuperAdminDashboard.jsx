import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosClinet } from '../Api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMatches: 0,
    totalClubs: 0,
    totalReferees: 0,
    totalReports: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, matchesRes, clubsRes, refereesRes, reportsRes] = await Promise.all([
          axiosClinet.get('/users/count'),
          axiosClinet.get('/matche/count'),
          axiosClinet.get('/club/count'),
          axiosClinet.get('/arbitre/count'),
          axiosClinet.get('/matche/count') // Assuming reports are matches
        ]);

        setStats({
          totalUsers: usersRes.data,
          totalMatches: matchesRes.data,
          totalClubs: clubsRes.data,
          totalReferees: refereesRes.data,
          totalReports: reportsRes.data
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userData = {
    labels: ['المستخدمين النشطين', 'المستخدمين غير النشطين'],
    datasets: [
      {
        data: [stats.totalUsers * 0.8, stats.totalUsers * 0.2], // This is placeholder data
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const matchData = {
    labels: ['كأس العرش', 'البطولة', 'المحلية'],
    datasets: [
      {
        label: 'عدد المباريات',
        data: [
          stats.totalMatches * 0.3, 
          stats.totalMatches * 0.5, 
          stats.totalMatches * 0.2
        ], // Placeholder data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
      }
    ],
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-users fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي المستخدمين</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalUsers}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-futbol fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي المباريات</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalMatches}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-shield fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي الأندية</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalClubs}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-book fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي التقارير</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalReports}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="bg-secondary rounded p-4">
            <h6 className="mb-4">إحصائيات المستخدمين</h6>
            <div style={{ height: '300px' }}>
              <Pie data={userData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-secondary rounded p-4">
            <h6 className="mb-4">إحصائيات المباريات</h6>
            <div style={{ height: '300px' }}>
              <Bar data={matchData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="bg-secondary rounded p-4">
            <div className="d-flex justify-content-between mb-4">
              <h6 className="mb-0">الوصول السريع</h6>
            </div>
            <div className="d-flex justify-content-around">
              <Link to="/dashboard/admin/users" className="btn btn-primary">إدارة المستخدمين</Link>
              <Link to="/dashboard/admin/statistics" className="btn btn-primary">الإحصائيات التفصيلية</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;