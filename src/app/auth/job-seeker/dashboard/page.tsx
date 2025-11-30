import React from "react";

const page = () => {
  return    <div className="p-4 space-y-4">

      {/* Welcome Section */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold">Welcome Back, John 👋</h2>
        <p className="text-sm">Profile Completed: 80%</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Find Jobs", "Upload Resume", "Edit Profile", "Applied Jobs"].map((btn) => (
          <button key={btn} className="bg-blue-500 text-white p-3 rounded-xl shadow">
            {btn}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Applied", value: 14 },
          { title: "Shortlisted", value: 5 },
          { title: "Interview", value: 2 },
          { title: "Rejected", value: 3 },
        ].map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

    </div>;
};

export default page;
