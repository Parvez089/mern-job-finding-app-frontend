import { Button } from "antd";
import { Plus } from "lucide-react";
import React from "react";



interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: string;
  onActionClick?: () => void;
}

const PageHeader = ({ title, subtitle, onActionClick }: PageHeaderProps) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
      <div>
        <h1 className='text-3xl !font-bold text-[#0e0f1b] tracking-tight '>
          {title}
        </h1>
        <p className='text-gray-500 font-medium mt-1'>{subtitle}</p>
      </div>

      <Button
        type='primary'
        size='large'
        onClick={onActionClick}
        icon={<Plus size={20} />}
        className='mr-1 font-semibold!'>
        Create New Job
      </Button>
    </div>
  );
};

export default PageHeader;
