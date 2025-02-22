import { useState } from 'react';
import { 
  Users, Package, Calendar, MessageSquare, 
  BarChart2, Settings, Bell, Search,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

// Sample data for charts
const visitorData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 }
];

const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New user registration', time: '5 min ago' },
    { id: 2, text: 'Server update completed', time: '1 hour ago' },
    { id: 3, text: 'Database backup', time: '3 hours ago' }
  ]);

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
    { title: 'Total Bookings', value: '856', icon: Package, change: '+23%' },
    { title: 'Active Tours', value: '45', icon: Calendar, change: '+8%' },
    { title: 'Messages', value: '89', icon: MessageSquare, change: '+15%' }
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>HikeJam Admin</h2>
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="collapse-btn"
          >
            {isSidebarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Package size={20} />
            <span>Bookings</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="notifications">
            <Bell size={20} />
            <div className="notification-badge">3</div>
            <div className="notification-dropdown">
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.text}</p>
                  <span>{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <span className="stat-change">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="chart-container">
          <h3>Visitor Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;