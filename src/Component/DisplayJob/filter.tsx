import React from "react";
import { Button, Divider, Form, Input } from 'antd';


interface JobFilterProps {
  filters: {
    search: string,
    category: string,
    country: string,
    salary: string,
    skills: string,
  
  };
  onFilterChange: (fiels: string, value: string) => void;
  onClear: () => void;
  onApply: () => void;
}
const JobFilter: React.FC<JobFilterProps>= ({filters, onFilterChange, onClear, onApply}) => {
  return <div className="m-6 bg-white shadow-lg rounded-xl p-4">

    <div className="flex justify-between m-2">
 <h1 className="text-xl">Search remote jobs</h1>
 <Button className="!border-none !text-sm font-semibold 1shadow-none" onClick={onClear}>Clear</Button>

    </div>
   

    <Form name="layout-multiple-horizontal" layout="horizontal">
     
      <Form.Item layout="vertical" name="vertical" >
        <Input value={filters.search} onChange={(e)=> onFilterChange("search", e.target.value)} placeholder="search everything" className="!shadow-none !border-gray-300 !outline-none"/>
      </Form.Item>
      <Form.Item layout="vertical" label="Job Categories"  name="vertical2" >
        <Input value={filters.category} onChange={(e)=> onFilterChange("category", e.target.value)}  placeholder="Search job category..." className="!shadow-none !border-gray-300 !outline-none"/>
      </Form.Item>
      <Form.Item layout="vertical" label="Countries"  name="vertical2" >
        <Input value={filters.country} onChange={(e)=> onFilterChange("country", e.target.value)}  placeholder="Search country.."   className="!shadow-none !border-gray-300 !outline-none"
/>
      </Form.Item>
      <Form.Item layout="vertical" label="Salary Range"  name="vertical2" >
        <Input value={filters.salary} onChange={(e)=> onFilterChange("salary", e.target.value)}  placeholder="Search by salary range" className="!shadow-none !border-gray-300 !outline-none"/>
      </Form.Item>
      <Form.Item layout="vertical" label="Skills"  name="vertical2" >
        <Input value={filters.skills} onChange={(e)=> onFilterChange("skills", e.target.value)}  placeholder="Search Skills" className="!shadow-none !border-gray-300 !outline-none"/>
      </Form.Item>
    </Form>
    <div>
      <Button className="w-full !bg-[var(--bg-color)] !text-white !font-semibold !shadow-none !border-gray-300 !outline-none">Apply Filters</Button>
    </div>
  </div>;
};

export default JobFilter;
