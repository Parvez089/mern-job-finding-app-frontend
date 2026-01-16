import React from 'react';
import FilterBar from './FilterBar';
import JobRow from './JobRow';
import { Pagination } from 'antd';

const JobTable = () => {
  const jobData: any[] = [
    { title: "Senior Product Designer", location: "San Francisco, CA", type: "Full-time", department: "Design", candidates: 128, matchPercent: 75, dateCreated: "Mar 12, 2024", status: "Active", avatarBg: "bg-blue-50 text-blue-500", avatarLetter: "T" },
    { title: "Lead Backend Engineer", location: "Remote", type: "Contract", department: "Engineering", candidates: 42, matchPercent: 40, dateCreated: "Mar 10, 2024", status: "Draft", avatarBg: "bg-orange-50 text-orange-500", avatarLetter: "L" },
    { title: "Marketing Operations", location: "Austin, TX", type: "Full-time", department: "Marketing", candidates: 86, matchPercent: 62, dateCreated: "Mar 08, 2024", status: "Active", avatarBg: "bg-indigo-50 text-indigo-500", avatarLetter: "N" },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mt-8">
      {/* Search and Dropdowns */}
      <FilterBar />

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#fcfdff] border-b border-gray-50">
            <tr>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Title & Details</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Department</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidates</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Date Created</th>
              <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job, index) => (
              <JobRow key={index} job={job} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="p-6 flex items-center justify-between border-t border-gray-50 bg-[#fcfdff]">
        <p className="text-xs font-semibold text-gray-400">Showing 1 to 4 of 24 job posts</p>
        <Pagination size="small" total={24} defaultCurrent={1} className="custom-pagination" />
      </div>
    </div>
  );
};

export default JobTable;