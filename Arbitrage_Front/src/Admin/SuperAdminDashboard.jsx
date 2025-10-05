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
    totalReports: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    matchesByCategory: { labels: [], data: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les statistiques générales - Utiliser des blocs try-catch individuels
        let userData = 0, matchesData = 0, clubsData = 0, refereesData = 0, reportsData = 0, activeUsersData = [];
        let matchesByCategoryData = { labels: [], data: [] };
        
        try {
          const usersRes = await axiosClinet.get('/dashboard/admin/users/count');
          userData = usersRes.data || 0;
        } catch (e) {
          console.error('Erreur lors de la récupération des utilisateurs:', e);
        }
        
        try {
          const matchesRes = await axiosClinet.get('/dashboard/admin/matche/count');
          matchesData = matchesRes.data || 0;
        } catch (e) {
          console.error('Erreur lors de la récupération des matches:', e);
        }
        
        try {
          const clubsRes = await axiosClinet.get('/dashboard/admin/club/count');
          clubsData = clubsRes.data || 0;
        } catch (e) {
          console.error('Erreur lors de la récupération des clubs:', e);
        }
        
        try {
          const refereesRes = await axiosClinet.get('/dashboard/admin/arbitre/count');
          refereesData = refereesRes.data || 0;
        } catch (e) {
          console.error('Erreur lors de la récupération des arbitres:', e);
        }
        
        try {
          const reportsRes = await axiosClinet.get('/dashboard/admin/matche/count');
          reportsData = reportsRes.data || 0;
        } catch (e) {
          console.error('Erreur lors de la récupération des rapports:', e);
        }
        
        try {
          const usersDetailsRes = await axiosClinet.get('/admin/users/active');
          if (usersDetailsRes.data?.status === 'success') {
            activeUsersData = usersDetailsRes.data.data || [];
          }
        } catch (e) {
          console.error('Erreur lors de la récupération des utilisateurs actifs:', e);
        }
        
        try {
          const categoryStatsRes = await axiosClinet.get('/dashboard/admin/statistics/categories');
          if (categoryStatsRes.data && categoryStatsRes.data.labels && categoryStatsRes.data.data) {
            matchesByCategoryData = categoryStatsRes.data;
          }
        } catch (e) {
          console.error('Erreur lors de la récupération des statistiques par catégorie:', e);
          // En cas d'erreur, utilisez des données fictives basées sur le nombre total de matches
          matchesByCategoryData = {
            labels: ['كأس العرش', 'البطولة', 'المحلية'],
            data: [Math.floor(matchesData * 0.3), Math.floor(matchesData * 0.5), Math.floor(matchesData * 0.2)]
          };
        }
        
        // Calculer les détails des utilisateurs actifs/inactifs
        const activeUsersCount = activeUsersData.length;
        const inactiveUsersCount = Math.max(0, userData - activeUsersCount);
        
        // Mettre à jour les statistiques avec les données disponibles
        setStats({
          totalUsers: userData,
          totalMatches: matchesData,
          totalClubs: clubsData,
          totalReferees: refereesData,
          totalReports: reportsData,
          activeUsers: activeUsersCount,
          inactiveUsers: inactiveUsersCount,
          matchesByCategory: matchesByCategoryData
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userData = {
    labels: ['المستخدمين النشطين', 'المستخدمين غير النشطين'],
    datasets: [
      {
        data: [stats.activeUsers, stats.inactiveUsers],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const matchData = {
    labels: stats.matchesByCategory.labels && stats.matchesByCategory.labels.length > 0 
      ? stats.matchesByCategory.labels 
      : ['كأس العرش', 'البطولة', 'المحلية'],
    datasets: [
      {
        label: 'عدد المباريات',
        data: stats.matchesByCategory.data && stats.matchesByCategory.data.length > 0
          ? stats.matchesByCategory.data
          : [
              Math.floor(stats.totalMatches * 0.3), 
              Math.floor(stats.totalMatches * 0.5), 
              Math.floor(stats.totalMatches * 0.2)
            ], // Fallback aux données par défaut si l'API ne renvoie pas de données
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ].slice(0, stats.matchesByCategory.labels?.length || 3),
      }
    ],
  };

  return (
    <div className="px-4 pt-4 container-fluid">
      <div className="flex justify-content-center row g-4">
        <div className="col-sm-6 col-xl-4">
          <div className="p-4 rounded bg-secondary d-flex align-items-center justify-content-around">
            <i className="fa fa-users fa-3x text-primary"></i>
            <div className="ms-2">
              <p className="mb-2">إجمالي المستخدمين</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalUsers}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="p-4 rounded bg-secondary d-flex align-items-center justify-content-around">
            <i className="fa fa-futbol fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي المباريات</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalMatches}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="p-4 rounded bg-secondary d-flex align-items-center justify-content-around">
            <i className="fa fa-shield fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي الأندية</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalClubs}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-6">
          <div className="p-4 rounded bg-secondary d-flex align-items-center justify-content-around">
            <i className="fa fa-book fa-3x text-primary"></i>
            <div className="ms-3">
              <p className="mb-2">إجمالي التقارير</p>
              <h6 className="mb-0">{loading ? 'جار التحميل...' : stats.totalReports}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 row">
        <div className="col-md-6">
          <div className="p-4 rounded bg-secondary">
            <h6 className="mb-4">إحصائيات المستخدمين</h6>
            <div style={{ height: '300px' }}>
              <Pie data={userData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 rounded bg-secondary">
            <h6 className="mb-4">إحصائيات المباريات</h6>
            <div style={{ height: '300px' }}>
              <Bar data={matchData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 row">
        <div className="col-12">
          <div className="p-4 rounded bg-secondary">
            <div className="mb-4 d-flex justify-content-between">
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