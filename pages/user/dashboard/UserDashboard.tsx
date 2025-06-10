"use client";

import { useState } from "react";
import { Home, User, Map, Calendar, Settings, LogOut } from "lucide-react";
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
} from "recharts";
import { logout } from "../../../lib/auth";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />;
      case "profile":
        return <ProfileContent />;
      case "trips":
        return <TripsContent />;
      case "calendar":
        return <CalendarContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <aside className="w-64 bg-white text-gray-800 p-5 flex flex-col shadow-lg order-1">
        <div className="text-2xl font-bold mb-8 text-center text-orange-500">
          HikeJam
        </div>
        <nav className="flex-grow">
          <button
            className={`flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mb-1 ${
              activeTab === "home"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <Home size={20} />
            <span className="ml-3 font-medium">Home</span>
          </button>
          <button
            className={`flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mb-1 ${
              activeTab === "profile"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} />
            <span className="ml-3 font-medium">Profile</span>
          </button>
          <button
            className={`flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mb-1 ${
              activeTab === "trips"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("trips")}
          >
            <Map size={20} />
            <span className="ml-3 font-medium">My Trips</span>
          </button>
          <button
            className={`flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mb-1 ${
              activeTab === "calendar"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            <Calendar size={20} />
            <span className="ml-3 font-medium">Calendar</span>
          </button>
          <button
            className={`flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mb-1 ${
              activeTab === "settings"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-orange-500 hover:text-white"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
            <span className="ml-3 font-medium">Settings</span>
          </button>
        </nav>
        <button
          className="flex items-center w-full p-3 text-left transition-all duration-300 border-none bg-transparent cursor-pointer rounded-lg mt-auto text-orange-500 hover:bg-orange-500 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </aside>
      <main className="flex-grow p-8 bg-gray-50 overflow-y-auto order-2">
        <header className="mb-8 pb-4 border-b-2 border-gray-200">
          <h1 className="m-0 text-gray-800 text-3xl font-semibold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </header>
        <div className="bg-white p-8 rounded-xl shadow-md">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const HomeContent = () => {
  const tripData = [
    { month: "Jan", trips: 2 },
    { month: "Feb", trips: 3 },
    { month: "Mar", trips: 1 },
    { month: "Apr", trips: 4 },
    { month: "May", trips: 3 },
    { month: "Jun", trips: 5 },
  ];

  const distanceData = [
    { month: "Jan", distance: 15 },
    { month: "Feb", distance: 20 },
    { month: "Mar", distance: 10 },
    { month: "Apr", distance: 25 },
    { month: "May", distance: 22 },
    { month: "Jun", distance: 30 },
  ];

  return (
    <div>
      <h2 className="text-gray-800 mt-0 text-2xl font-semibold">
        Welcome back, Adventurer!
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Here's a summary of your recent activities and upcoming trips.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="text-lg text-gray-600 mb-3">Total Trips</h3>
          <div className="text-3xl font-bold text-orange-500">18</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="text-lg text-gray-600 mb-3">Total Distance</h3>
          <div className="text-3xl font-bold text-orange-500">122 km</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
          <h3 className="text-lg text-gray-600 mb-3">Avg. Trip Length</h3>
          <div className="text-3xl font-bold text-orange-500">6.8 km</div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Trips per Month
        </h3>
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
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Distance Hiked per Month
        </h3>
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
  );
};

const ProfileContent = () => (
  <div>
    <h2 className="text-gray-800 mt-0 text-2xl font-semibold">Your Profile</h2>
    <p className="text-gray-600 leading-relaxed">
      Manage your personal information and preferences.
    </p>
    {/* Add form for user profile information */}
  </div>
);

const TripsContent = () => (
  <div>
    <h2 className="text-gray-800 mt-0 text-2xl font-semibold">My Trips</h2>
    <p className="text-gray-600 leading-relaxed">
      View and manage your past and upcoming hiking trips.
    </p>
    {/* Add a list or grid of user's trips */}
  </div>
);

const CalendarContent = () => (
  <div>
    <h2 className="text-gray-800 mt-0 text-2xl font-semibold">Trip Calendar</h2>
    <p className="text-gray-600 leading-relaxed">
      Plan and view your hiking schedule.
    </p>
    {/* Add a calendar component */}
  </div>
);

const SettingsContent = () => (
  <div>
    <h2 className="text-gray-800 mt-0 text-2xl font-semibold">
      Account Settings
    </h2>
    <p className="text-gray-600 leading-relaxed">
      Manage your account preferences and notifications.
    </p>
    {/* Add settings options */}
  </div>
);

export default UserDashboard;
