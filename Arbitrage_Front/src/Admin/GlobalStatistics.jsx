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
  const [statisticsData, setStatisticsData] = useState({
    matchesByMonth: [],
    refereeActivity: [],
    categoriesDistribution: [],
    userActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you'd fetch actual data from your API
        // These are placeholder endpoints
        const [matchesRes, refereesRes, categoriesRes, usersRes] = await Promise.all([
          axiosClinet.get('/admin/statistics/matches'),
          axiosClinet.get('/admin/statistics/referees'),
          axiosClinet.get('/admin/statistics/categories'),
          axiosClinet.get('/admin/statistics/users')
        ]);

        setStatisticsData({
          matchesByMonth: matchesRes.data,
          refereeActivity: refereesRes.data,
          categoriesDistribution: categoriesRes.data,
          userActivity: usersRes.data
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // For demo purposes, set some placeholder data
        setStatisticsData({
          matchesByMonth: generateMockData('months', 12),
          refereeActivity: generateMockData('referees', 5),
          categoriesDistribution: generateMockData('categories', 6),
          userActivity: generateMockData('activity', 7)
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to generate mock data for demonstration
  const generateMockData = (type, count) => {
    const labels = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      referees: ['حكم 1', 'حكم 2', 'حكم 3', 'حكم 4', 'حكم 5'],
      categories: ['الصغار', 'الفتيان', 'الشبان', 'الشرفي الثاني', 'الشرفي الأول', 'الشرفي الممتاز'],
      activity: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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

  const activityData = {
    labels: statisticsData.userActivity.labels,
    datasets: [
      {
        label: 'نشاط المستخدمين',
        data: statisticsData.userActivity.data,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <div className="container-fluid pt-4 px-4">
      {loading ? (
        <div className="row g-4">
          {Array(4).fill().map((_, idx) => (
            <div key={idx} className="col-sm-12 col-md-6">
              <div className="bg-secondary rounded p-4">
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
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="bg-secondary rounded p-4">
                <h6 className="mb-4">الإحصائيات التفصيلية</h6>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-sm-12 col-md-6">
              <div className="bg-secondary rounded p-4">
                <h6 className="mb-4">المباريات حسب الشهر</h6>
                <Bar data={matchesData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="bg-secondary rounded p-4">
                <h6 className="mb-4">نشاط الحكام</h6>
                <Pie data={refereeData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-sm-12 col-md-6">
              <div className="bg-secondary rounded p-4">
                <h6 className="mb-4">توزيع الفئات</h6>
                <Pie data={categoriesData} options={{ responsive: true }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="bg-secondary rounded p-4">
                <h6 className="mb-4">نشاط المستخدمين</h6>
                <Line data={activityData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GlobalStatistics;