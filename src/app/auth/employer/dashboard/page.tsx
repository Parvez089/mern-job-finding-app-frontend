"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "@/app/components/employer/TotalApplication";
import HiringTrendsChart from "@/app/components/employer/Chart";
import RecentJobPosts from "@/app/components/employer/RecentJobPosts";

interface DashboardStats {
  totalApplicants: number;
  totalJobs: number;
  totalInterviews: number;
  totalHires: number;
  jobsPercentage: number;
  applicantsPercentage: number;
  interviewsPercentage: number;
  hiresPercentage: number;
  isJobUp: boolean;
  isApplicantsUp: boolean;
  isInterviewsUp: boolean;
  isHiresUp: boolean;
}

// ✅ Safe default — all fields initialized to 0/false
// so .toLocaleString() never runs on undefined
const DEFAULT_STATS: DashboardStats = {
  totalApplicants: 0,
  totalJobs: 0,
  totalInterviews: 0,
  totalHires: 0,
  jobsPercentage: 0,
  applicantsPercentage: 0,
  interviewsPercentage: 0,
  hiresPercentage: 0,
  isJobUp: false,
  isApplicantsUp: false,
  isInterviewsUp: false,
  isHiresUp: false,
};

const EmployerDashboard = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/applications/employer/dashboard-stats`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // ✅ Merge with defaults so missing fields never cause crashes
        setStats({ ...DEFAULT_STATS, ...res.data });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Keep DEFAULT_STATS on error — no crash
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

  return (
    <div>
      {/* ── Stats Cards ──────────────────── */}
      <div className='grid md:grid-cols-4 grid-cols-2 gap-6'>
        <StatsCard
          title='Total Applicants'
          value={loading ? "..." : stats.totalApplicants.toLocaleString()}
          percentage={`${Math.abs(stats.applicantsPercentage)}%`}
          isUp={stats.isApplicantsUp}
        />
        <StatsCard
          title='Active Jobs'
          value={loading ? "..." : stats.totalJobs.toLocaleString()}
          percentage={`${stats.jobsPercentage}%`}
          isUp={stats.isJobUp}
        />
        <StatsCard
          title='Interviews'
          value={loading ? "..." : stats.totalInterviews.toLocaleString()}
          percentage={`${Math.abs(stats.interviewsPercentage)}%`}
          isUp={stats.interviewsPercentage > 0}
          isDown={stats.interviewsPercentage < 0}
        />
        <StatsCard
          title='Hires'
          value={loading ? "..." : stats.totalHires.toLocaleString()}
          percentage={`${Math.abs(stats.hiresPercentage)}%`}
          isUp={stats.hiresPercentage > 0}
          isDown={stats.hiresPercentage < 0}
        />
      </div>

      {/* ── Chart ────────────────────────── */}
      <div className='mt-6'>
        <HiringTrendsChart />
      </div>

      {/* ── Recent Job Posts ─────────────── */}
      <div className='mt-6'>
        <RecentJobPosts />
      </div>
    </div>
  );
};

export default EmployerDashboard;