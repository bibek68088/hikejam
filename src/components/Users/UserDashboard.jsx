"use client"

import { useState } from "react"
import { Home, User, Map, Calendar, Settings, LogOut } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import "./UserDashboard.css"

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home")

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "profile":
        return <ProfileContent />
      case "trips":
        return <TripsContent />
      case "calendar":
        return <CalendarContent />
      case "settings":
        return <SettingsContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">HikeJam</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
            <Home size={20} />
            <span>Home</span>
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button className={`nav-item ${activeTab === "trips" ? "active" : ""}`} onClick={() => setActiveTab("trips")}>
            <Map size={20} />
            <span>My Trips</span>
          </button>
          <button
            className={`nav-item ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            <Calendar size={20} />
            <span>Calendar</span>
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
        <button className="nav-item logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
      <main className="content">
        <header className="content-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>
        <div className="content-body">{renderContent()}</div>
      </main>
    </div>
  )
}

const HomeContent = () => {
  const tripData = [
    { month: "Jan", trips: 2 },
    { month: "Feb", trips: 3 },
    { month: "Mar", trips: 1 },
    { month: "Apr", trips: 4 },
    { month: "May", trips: 3 },
    { month: "Jun", trips: 5 },
  ]

  const distanceData = [
    { month: "Jan", distance: 15 },
    { month: "Feb", distance: 20 },
    { month: "Mar", distance: 10 },
    { month: "Apr", distance: 25 },
    { month: "May", distance: 22 },
    { month: "Jun", distance: 30 },
  ]

  return (
    <div>
      <h2>Welcome back, Adventurer!</h2>
      <p>Here's a summary of your recent activities and upcoming trips.</p>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Trips</h3>
          <div className="stat-value">18</div>
        </div>
        <div className="stat-card">
          <h3>Total Distance</h3>
          <div className="stat-value">122 km</div>
        </div>
        <div className="stat-card">
          <h3>Avg. Trip Length</h3>
          <div className="stat-value">6.8 km</div>
        </div>
      </div>
      <div className="chart-container">
        <h3>Trips per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tripData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#ff6b35" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h3>Distance Hiked per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={distanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#ff6b35" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const ProfileContent = () => (
  <div>
    <h2>Your Profile</h2>
    <p>Manage your personal information and preferences.</p>
    {/* Add form for user profile information */}
  </div>
)

const TripsContent = () => (
  <div>
    <h2>My Trips</h2>
    <p>View and manage your past and upcoming hiking trips.</p>
    {/* Add a list or grid of user's trips */}
  </div>
)

const CalendarContent = () => (
  <div>
    <h2>Trip Calendar</h2>
    <p>Plan and view your hiking schedule.</p>
    {/* Add a calendar component */}
  </div>
)

const SettingsContent = () => (
  <div>
    <h2>Account Settings</h2>
    <p>Manage your account preferences and notifications.</p>
    {/* Add settings options */}
  </div>
)

export default UserDashboard

