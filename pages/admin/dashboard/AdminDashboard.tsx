"use client";

import { useState } from "react";
import {
  Users,
  Package,
  Cat,
  Calendar,
  MessageSquare,
  BarChart2,
  Settings,
  Bell,
  Map,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { logout } from "../../../lib/auth";
import { useRouter } from "next/navigation";

const visitorData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const BlogManagement = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
    <p className="text-gray-600">Blog management interface would go here...</p>
  </div>
);

const DestinationManagement = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Destination Management</h2>
    <p className="text-gray-600">
      Destination management interface would go here...
    </p>
  </div>
);

const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New user registration", time: "5 min ago" },
    { id: 2, text: "Server update completed", time: "1 hour ago" },
    { id: 3, text: "Database backup", time: "3 hours ago" },
  ]);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Total Bookings", value: "856", icon: Package, change: "+23%" },
    { title: "Active Tours", value: "45", icon: Calendar, change: "+8%" },
    { title: "Messages", value: "89", icon: MessageSquare, change: "+15%" },
  ];

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "users", label: "Users", icon: Users },
    { id: "bookings", label: "Bookings", icon: Package },
    { id: "destinations", label: "Destinations", icon: Map },
    { id: "blogs", label: "Blogs", icon: Cat },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out p-4 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          {!isSidebarCollapsed && (
            <h2 className="text-xl font-bold text-gray-800">HikeJam Admin</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
        </div>

        <nav className="mt-4 space-y-1">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center w-full px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                activeTab === id
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              } ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}
            >
              <Icon size={20} />
              {!isSidebarCollapsed && (
                <span className="font-medium">{label}</span>
              )}
            </button>
          ))}
        </nav>

        <button
          className={`flex items-center w-full px-3 py-3 mt-auto text-left rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 ${
            isSidebarCollapsed ? "justify-center" : "gap-3"
          }`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none text-sm w-48"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Bell size={20} />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {notifications.length}
              </div>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Notifications
                  </h3>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-sm text-gray-900 mb-1">
                        {notification.text}
                      </p>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4"
                >
                  <div className="p-4 bg-indigo-100 rounded-lg">
                    <stat.icon size={24} className="text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Visitor Overview
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-600"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-600"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ fill: "#4f46e5", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#4f46e5", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === "blogs" && <BlogManagement />}
        {activeTab === "destinations" && <DestinationManagement />}

        {!["dashboard", "blogs", "destinations"].includes(activeTab) && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {activeTab} Management
            </h2>
            <p className="text-gray-600">
              {activeTab} management interface would go here...
            </p>
          </div>
        )}
      </div>

      {showNotifications && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
