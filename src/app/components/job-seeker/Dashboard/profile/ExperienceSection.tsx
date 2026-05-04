import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const experienceData = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Linear Design Systems",
    duration: "2021 — Present",
    description: "Leading the core design system team, reducing front-end development time by 30% through modular component libraries and strict documentation.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    id: 2,
    title: "Product Designer",
    company: "CryptoFlow",
    duration: "2018 — 2021",
    description: "Designed the mobile trading interface for 1M+ active users. Improved conversion rates by 15% through iterative user testing and UX refinement.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  }
];

export default function ExperienceSection() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
        <Button 
          type="text" 
          icon={<PlusOutlined />} 
          className="text-indigo-600 font-medium hover:text-indigo-700"
        >
          Add New
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-8">
        {experienceData.map((item) => (
          <div key={item.id} className="flex gap-4">
            {/* Icon Box */}
            <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
              <div className={`w-6 h-6 border-2 border-current rounded-full flex items-center justify-center ${item.iconColor}`}>
                
                 <span className="text-[10px] font-bold">●</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="text-indigo-600 font-medium">{item.company}</p>
                </div>
                <span className="text-gray-400 text-sm bg-gray-50 px-3 py-1 rounded-full">
                  {item.duration}
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed mt-2 text-sm md:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}