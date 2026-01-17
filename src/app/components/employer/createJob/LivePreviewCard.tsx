/** @format */
import { Eye } from "lucide-react";
import { Button } from "antd";

const LivePreviewCard = () => (
  <div className='sticky top-28'>
    <div className='flex items-center gap-2 text-[#4850e5] font-bold text-xs uppercase tracking-widest mb-4'>
      <Eye size={16} /> Live Preview
    </div>

    <div className='bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-100'>
      <div className='h-2 bg-[#4850e5]' />
      <div className='p-8'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#4850e5] font-bold text-2xl'>
            S
          </div>
          <div>
            <h3 className='font-bold text-[#0e0f1b] text-lg'>
              Senior Product Designer
            </h3>
            <p className='text-xs text-gray-400 font-medium'>
              San Francisco, CA • Full-time
            </p>
          </div>
        </div>

        <div className='space-y-4 mb-8 text-sm'>
          <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
            <span className='text-lg'>🏢</span>
            <div>
              <p className='text-[10px] text-gray-400 uppercase font-bold'>
                Department
              </p>
              <p className='font-bold text-[#0e0f1b]'>Design & Creative</p>
            </div>
          </div>
          <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
            <span className='text-lg'>💰</span>
            <div>
              <p className='text-[10px] text-gray-400 uppercase font-bold'>
                Salary Range
              </p>
              <p className='font-bold text-[#0e0f1b]'>$140k - $180k • Equity</p>
            </div>
          </div>
        </div>

        <Button
          block
          className='h-14 rounded-2xl font-bold bg-[#4850e5] text-white hover:!bg-[#3b43cc] border-none shadow-lg shadow-blue-100'>
          Apply for this position
        </Button>
      </div>
    </div>
  </div>
);

export default LivePreviewCard;
