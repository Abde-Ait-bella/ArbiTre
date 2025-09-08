import React, { useState, useEffect } from 'react';
import { axiosClinet } from '../Api/axios';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement 
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  PointElement,
  LineElement
);

function GlobalStatistics() {
  // Initialiser les états pour stocker les données statistiques
  const [statisticsData, setStatisticsData] = useState({
    matchesByMonth: { labels: [], data: [] },
    refereeActivity: { labels: [], data: [] },
    categoriesDistribution: { labels: [], data: [] },
    userMatches: { labels: [], data: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let matchesData = { labels: [], data: [] };
      let refereesData = { labels: [], data: [] };
      let categoriesData = { labels: [], data: [] };
      let userMatchesData = { labels: [], data: [] };
      
      setLoading(true);
      
      try {
        // Récupérer les statistiques des matches par mois
        const matchesRes = await axiosClinet.get('/dashboard/admin/statistics/matches');
        if (matchesRes.data && matchesRes.data.labels && matchesRes.data.data) {
          matchesData = matchesRes.data;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques de matches:', err);
        matchesData = generateMockData('months', 12);
      }
      
      try {
        // Récupérer les statistiques des arbitres
        const refereesRes = await axiosClinet.get('/dashboard/admin/statistics/referees');
        if (refereesRes.data && refereesRes.data.labels && refereesRes.data.data) {
          refereesData = refereesRes.data;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques d\'arbitres:', err);
        refereesData = generateMockData('referees', 8);
      }
      
      try {
        // Récupérer les statistiques des catégories
        const categoriesRes = await axiosClinet.get('/dashboard/admin/statistics/categories');
        if (categoriesRes.data && categoriesRes.data.labels && categoriesRes.data.data) {
          categoriesData = categoriesRes.data;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques de catégories:', err);
        categoriesData = generateMockData('categories', 6);
      }
      
      try {
        // Récupérer les statistiques des utilisateurs par matches
        const userMatchesRes = await axiosClinet.get('/dashboard/admin/statistics/users-matches');
        if (userMatchesRes.data && userMatchesRes.data.labels && userMatchesRes.data.data) {
          userMatchesData = userMatchesRes.data;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques d\'utilisateurs par matches:', err);
        userMatchesData = generateMockData('users', 8);
      }
      
      // Mettre à jour les données statistiques
      setStatisticsData({
        matchesByMonth: matchesData,
        refereeActivity: refereesData,
        categoriesDistribution: categoriesData,
        userMatches: userMatchesData
      });
      
      setLoading(false);
    };

    fetchData();
  }, []);

  // Helper to generate mock data for demonstration
  const generateMockData = (type, count) => {
    const labels = {
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      referees: ['محمد الطاهيري', 'أحمد أبو زيد', 'يوسف العزيزي', 'سعيد بنمبارك', 'عبد الله الناصري', 'كريم البقالي', 'حسن المرزوقي', 'عمر الفاسي'],
      categories: ['الصغار', 'الفتيان', 'الشبان', 'الشرفي الثاني', 'الشرفي الأول', 'الشرفي الممتاز'],
      activity: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      users: ['أحمد محمد', 'سعيد الراشدي', 'كريم العلوي', 'نبيل العمراني', 'عبد الرحمان', 'يوسف بنعمر', 'ياسين المالكي', 'أيوب الناصري']
    };

    return {
      labels: labels[type].slice(0, count),
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 50) + 10)
    };
  };

  const matchesData = {
    labels: statisticsData.matchesByMonth.labels,
    datasets: [
      {
        label: 'المباريات الشهرية',
        data: statisticsData.matchesByMonth.data,
        backgroundColor: '#36A2EB'
      }
    ]
  };

  const refereeData = {
    labels: statisticsData.refereeActivity.labels,
    datasets: [
      {
        label: 'عدد المباريات',
        data: statisticsData.refereeActivity.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const categoriesData = {
    labels: statisticsData.categoriesDistribution.labels,
    datasets: [
      {
        label: 'الفئات',
        data: statisticsData.categoriesDistribution.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const userMatchesData = {
    labels: statisticsData.userMatches.labels,
    datasets: [
      {
        label: 'عدد المباريات المسجلة',
        data: statisticsData.userMatches.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#00D8B6',
          '#8B5CF6'
        ]
      }
    ]
  };

  return (
    <div className="px-4 pt-4 container-fluid">
      {loading ? (
        <div className="row g-4">
          {Array(4).fill().map((_, idx) => (
            <div key={idx} className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <Skeleton height={30} width="60%" />
                <div style={{ height: '300px' }}>
                  <Skeleton height="100%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 row g-4">
            <div className="col-12">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">الإحصائيات التفصيلية</h6>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">المباريات حسب الشهر</h6>
                <Bar data={matchesData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">نشاط الحكام</h6>
                <Pie data={refereeData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          <div className="mt-4 row g-4">
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">توزيع الفئات</h6>
                <Pie data={categoriesData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">المستخدمين وعدد المباريات المسجلة</h6>
                <Pie 
                  data={userMatchesData} 
                  options={{ 
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value} مباراة`;
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GlobalStatistics;