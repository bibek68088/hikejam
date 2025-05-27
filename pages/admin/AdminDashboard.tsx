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
import BlogManagement from "./components/blog-management/BlogManagement";
import DestinationManagement from "./components/DestinationManagement/DestinationManagement";

const visitorData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications] = useState([
    { id: 1, text: "New user registration", time: "5 min ago" },
    { id: 2, text: "Server update completed", time: "1 hour ago" },
    { id: 3, text: "Database backup", time: "3 hours ago" },
  ]);

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Total Bookings", value: "856", icon: Package, change: "+23%" },
    { title: "Active Tours", value: "45", icon: Calendar, change: "+8%" },
    { title: "Messages", value: "89", icon: MessageSquare, change: "+15%" },
  ];

  const containerStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  };

  const sidebarStyle: React.CSSProperties = {
    width: isSidebarCollapsed ? "80px" : "250px",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s ease",
    padding: "1rem",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "1rem",
    borderBottom: "1px solid #eee",
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    width: "100%",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: isActive ? "#4f46e5" : "#666",
    transition: "all 0.2s ease",
    borderRadius: "0.5rem",
    backgroundColor: isActive ? "#e0e7ff" : "transparent",
  });

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
  };

  const topBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  };

  const searchBarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  const notificationBadgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "999px",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    width: "300px",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };

  const statsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const iconStyle: React.CSSProperties = {
    padding: "1rem",
    backgroundColor: "#e0e7ff",
    borderRadius: "0.5rem",
    color: "#4f46e5",
  };

  const chartContainerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          {!isSidebarCollapsed && <h2>HikeJam Admin</h2>}
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
            }}
          >
            {isSidebarCollapsed ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
        </div>

        <nav style={{ marginTop: "1rem" }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart2 },
            { id: "users", label: "Users", icon: Users },
            { id: "bookings", label: "Bookings", icon: Package },
            { id: "destinations", label: "Destinations", icon: Map },
            { id: "blogs", label: "Blogs", icon: Cat },
            { id: "settings", label: "Settings", icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              style={navItemStyle(activeTab === id)}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={20} />
              {!isSidebarCollapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div style={mainContentStyle}>
        <div style={topBarStyle}>
          <div style={searchBarStyle}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                fontSize: "0.9rem",
                width: "200px",
              }}
            />
          </div>

          <div style={{ position: "relative", cursor: "pointer" }}>
            <Bell size={20} />
            <div style={notificationBadgeStyle}>{notifications.length}</div>
            <div style={dropdownStyle}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}
                >
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>{n.text}</p>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {n.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div style={statsGridStyle}>
              {stats.map((stat, idx) => (
                <div key={idx} style={cardStyle}>
                  <div style={iconStyle}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <h3
                      style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}
                    >
                      {stat.title}
                    </h3>
                    <p
                      style={{
                        margin: "0.25rem 0",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#22c55e" }}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={chartContainerStyle}>
              <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
                Visitor Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === "blogs" && <BlogManagement />}
        {activeTab === "destinations" && <DestinationManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
