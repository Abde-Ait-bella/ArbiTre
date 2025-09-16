import { useState, useEffect } from 'react';
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
    userMatches: { labels: [], data: [] },
    deviceUsage: { labels: [], data: [] }
  });
  const [loading, setLoading] = useState(true);
  const [summaryStats, setSummaryStats] = useState({
    totalMatches: 0,
    totalReferees: 0,
    totalReports: 0,
    completionRate: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      let matchesData = { labels: [], data: [] };
      let refereesData = { labels: [], data: [] };
      let categoriesData = { labels: [], data: [] };
      let userMatchesData = { labels: [], data: [] };
      let deviceUsageData = { labels: [], data: [] };
      
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
      
      try {
        // Récupérer les statistiques d'utilisation des appareils
        const deviceUsageRes = await axiosClinet.get('/dashboard/admin/statistics/device-usage');
        if (deviceUsageRes.data && deviceUsageRes.data.labels && deviceUsageRes.data.data) {
          deviceUsageData = deviceUsageRes.data;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques d\'utilisation des appareils:', err);
        deviceUsageData = generateMockData('devices', 3);
      }
      
      // Mettre à jour les données statistiques
      setStatisticsData({
        matchesByMonth: matchesData,
        refereeActivity: refereesData,
        categoriesDistribution: categoriesData,
        userMatches: userMatchesData,
        deviceUsage: deviceUsageData
      });
      
      setLoading(false);
    };

    fetchData();
  }, []);

  // Effet pour calculer les statistiques de résumé
  useEffect(() => {
    if (!loading && statisticsData.matchesByMonth.data.length > 0) {
      const totalMatches = statisticsData.matchesByMonth.data.reduce((sum, count) => sum + count, 0);
      const totalReferees = statisticsData.refereeActivity.labels ? statisticsData.refereeActivity.labels.length : 0;
      
      // Simuler un calcul de rapports (85% des matches ont des rapports)
      const totalReports = Math.round(totalMatches * 0.85);
      const completionRate = Math.round((totalReports / totalMatches) * 100);
      
      setSummaryStats({
        totalMatches,
        totalReferees,
        totalReports,
        completionRate
      });
    }
  }, [loading, statisticsData]);

  // Helper to generate mock data for demonstration
  const generateMockData = (type, count) => {
    const labels = {
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      referees: ['محمد الطاهيري', 'أحمد أبو زيد', 'يوسف العزيزي', 'سعيد بنمبارك', 'عبد الله الناصري', 'كريم البقالي', 'حسن المرزوقي', 'عمر الفاسي'],
      categories: ['الصغار', 'الفتيان', 'الشبان', 'الشرفي الثاني', 'الشرفي الأول', 'الشرفي الممتاز'],
      activity: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      users: ['أحمد محمد', 'سعيد الراشدي', 'كريم العلوي', 'نبيل العمراني', 'عبد الرحمان', 'يوسف بنعمر', 'ياسين المالكي', 'أيوب الناصري'],
      devices: ['الهاتف المحمول', 'الكمبيوتر', 'الجهاز اللوحي']
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

  const deviceUsageData = {
    labels: statisticsData.deviceUsage.labels,
    datasets: [
      {
        label: 'الأجهزة المستخدمة',
        data: statisticsData.deviceUsage.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
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
          
          <div className="mt-4 row g-4">
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">نشاط الحكام</h6>
                <Pie data={refereeData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">توزيع الفئات</h6>
                <Pie data={categoriesData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          <div className="mt-4 row g-4">
            <div className="col-sm-12 col-md-12">
              <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">المستخدمين وعدد المباريات المسجلة</h6>
                <div style={{ height: '200px' }} className="d-flex justify-content-center">
                  <Pie 
                    data={userMatchesData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
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
            <div className="col-sm-12 col-md-6">
           
            </div>
          </div>

          <div className="mt-4 row g-4">
            <div className="col-12">
              <div className="p-4 rounded bg-secondary">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="mb-4">المباريات حسب الشهر</h6>
                    <div style={{ height: '260px' }}>
                      <Bar 
                        data={matchesData} 
                        options={{ 
                          responsive: true, 
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <h6 className="mb-4">إحصائيات استخدام التطبيق</h6> */}
                    {/* <div className="row" style={{ height: '260px' }}>
                      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                        <h4 className="mb-2 text-center">
                          {statisticsData.deviceUsage.data && statisticsData.deviceUsage.data[0] ? statisticsData.deviceUsage.data[0] : 0}
                        </h4>
                        <p className="text-center">مستخدم الهاتف المحمول</p>
                      </div>
                      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                        <h4 className="mb-2 text-center">
                          {statisticsData.deviceUsage.data && statisticsData.deviceUsage.data[1] ? statisticsData.deviceUsage.data[1] : 0}
                        </h4>
                        <p className="text-center">مستخدم الكمبيوتر</p>
                      </div>
                      <div className="mt-4 col-md-12 d-flex flex-column justify-content-center align-items-center">
                        <h4 className="mb-2 text-center">
                          {statisticsData.deviceUsage.data && statisticsData.deviceUsage.data[2] ? statisticsData.deviceUsage.data[2] : 0}
                        </h4>
                        <p className="text-center">مستخدم الجهاز اللوحي</p>
                      </div>
                    </div> */}
                       <div className="p-4 rounded bg-secondary">
                <h6 className="mb-4">نوع الجهاز المستخدم</h6>
                <div className="d-flex justify-content-center" style={{ height: '260px' }}>
                  <Pie 
                    data={deviceUsageData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const label = context.label || '';
                              const value = context.raw || 0;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = Math.round((value * 100) / total);
                              return `${label}: ${value} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GlobalStatistics;