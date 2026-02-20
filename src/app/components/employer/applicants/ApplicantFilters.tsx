/** @format */
import { Select, Button } from "antd";
import { Filter } from "lucide-react";

const ApplicantFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#4850e5] uppercase">Job Role</label>
        <Select defaultValue="all" style={{ width: 200 }} className="h-10 rounded-xl"
          options={[{ value: "all", label: "All Job Roles" }]} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#4850e5] uppercase">Status</label>
        <Select defaultValue="all" style={{ width: 160 }} className="h-10 rounded-xl"
          options={[{ value: "all", label: "All Statuses" }]} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-[#4850e5] uppercase">Source</label>
        <Select defaultValue="all" style={{ width: 160 }} className="h-10 rounded-xl"
          options={[{ value: "all", label: "All Sources" }]} />
      </div>

      <Button icon={<Filter size={18} />} className="mt-5 h-10 w-10 flex items-center justify-center rounded-xl" />
    </div>
  );
};

export default ApplicantFilters;