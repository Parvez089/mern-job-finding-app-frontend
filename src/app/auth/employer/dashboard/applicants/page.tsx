/** @format */

import ApplicantFilters from "@/app/components/employer/applicants/ApplicantFilters";
import ApplicantTable from "@/app/components/employer/applicants/ApplicantTable";

const ApplicantsPage = () => {
  return (
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      <ApplicantFilters />
      <ApplicantTable />
    </div>
  );
};

export default ApplicantsPage;