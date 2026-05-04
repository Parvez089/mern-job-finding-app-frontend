import { GraduationCap, BookOpen } from "lucide-react"; // আপনি Lucide বা Antd Icons ব্যবহার করতে পারেন

// ডাটা অবজেক্ট (পরবর্তীতে API থেকে ডাটা আনতে এটি ব্যবহার করবেন)
const educationData = [
  {
    id: 1,
    degree: "Master of Interaction Design",
    institution: "Savannah College of Art and Design",
    period: "2016 — 2018",
    icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
  },
  {
    id: 2,
    degree: "BFA in Graphic Design",
    institution: "Rhode Island School of Design",
    period: "2012 — 2016",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
  },
];

export default function EducationSection() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {/* Section Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-8">Education</h2>

      {/* Education List */}
      <div className="space-y-8">
        {educationData.map((edu) => (
          <div key={edu.id} className="flex items-start gap-4">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              {edu.icon}
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {edu.degree}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 text-gray-500 mt-1">
                <span className="font-medium text-gray-600">
                  {edu.institution}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="text-sm">{edu.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}