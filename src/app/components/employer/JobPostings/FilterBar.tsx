import { Button, Input, Select } from "antd";
import { Filter, Search } from "lucide-react";
import React from "react";

const FilterBar = () => {

    const departmentOptions = [
        {value: "all", label: "All Departments"},
        {value: "design", label: "Design"},
        {value: "engineering", label: "Engineering"},
        {value: "Marketing", label: "Marketing"},
    ]
    const statusOptions = [
        {value: "all", label: "All Status"},
        {value: "active", label: "Active"},
        {value: "draft", label: "Draft"},
        {value: "closed", label: "Closed"},
    ]
  return (
    

  <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white rounded-t-3xl border-b border-gray-100">


    <div className="flex flex-1 items-center justify-between gap-4 p-6 bg-white rounded-t-3xl border-b border-gray-100">
        
    <Input 
    prefix={<Search size={18} className="text-gray-400 mr-2 "/>
} placeholder="Search by job title..." className="h-12 rounded-xl .\!bg-gray-50 border-none hover:!bg-gray-100 focus:\:!bg-white"/>
    </div>

    <div className="flex items-center gap-3">
        <Select 
        defaultValue="All Departments"
        options={departmentOptions}
        className="w-44 h-11 custom-select"
        bordered={false}
        style={{backgroundColor: '#f9fafb',  borderRadius: '12px'}}
       
        />
        <Select 
        defaultValue="All Status"
        className="w-44 h-11 custom-select"
        options={statusOptions}
        bordered={false}
        style={{backgroundColor: '#f9fafb',  borderRadius: '12px'}}
       
        />
        
      

        <Button
        icon={<Filter size={16} className="mr-2" />}
        className="h-11 rounded-xl border-none bg-[#f9fafb] hover:!bg-[#f3f4f6] font-semibold text-gray-600 flex items-center px-4 transition-all"
      >
        More Filters
      </Button>
    </div>
    </div>
  );
};

export default FilterBar;



