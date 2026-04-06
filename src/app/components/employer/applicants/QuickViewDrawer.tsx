/** @format */
import React, { useEffect, useState } from "react";
import { Drawer, Avatar, Tag, Button, Divider, Spin, Space, Rate } from "antd";
import { Mail, Phone, Linkedin, X, Briefcase, GraduationCap, Download, MessageSquare } from "lucide-react";
import axios from "axios";

interface ApplicationDetail {
  _id: string;
  status: string;
  stage: string;
  applicantId: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    phoneNumber?: string;
    summary?: string;
    experience?: Array<{
      title: string;
      company: string;
      duration: string;
    }>;
    skills?: string[];
  };
  appId: {
    _id: string;
    title: string;
  };
}

interface QuickViewProps {
  visible: boolean;
  onClose: () => void;
  applicationId: string | null;
}
const QuickViewDrawer = ({ visible, onClose, applicationId }: QuickViewProps) => {
  const [data, setData] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && applicationId) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/details/${applicationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          setData(res.data.data);
        } catch (err) {
          console.error("Error fetching details", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [visible, applicationId]);

  return (
    <Drawer
      width={500}
      onClose={onClose}
      open={visible}
      closable={false}
      bodyStyle={{ padding: 0, backgroundColor: "#fcfcfd" }}
    >
      {loading ? (
        <div className="h-full flex items-center justify-center"><Spin size="large" /></div>
      ) : data && (
        <div className="flex flex-col h-full">
          {/* Header Actions */}
          <div className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-gray-800 m-0">Applicant Quick View</h3>
            <Button type="text" icon={<X size={20} />} onClick={onClose} />
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {/* Action Buttons Row */}
            <div className="flex gap-2 mb-8">
              <Button className="flex-1 rounded-lg font-medium! border-blue-100 text-blue-600! hover:bg-blue-50">Move to Interview</Button>
              <Button className="flex-1 rounded-lg font-medium! border-green-100 text-green-600! hover:bg-green-50">Make Offer</Button>
              <Button className="flex-1 rounded-lg font-medium! border-red-100 text-red-600! hover:bg-red-50">Reject</Button>
            </div>

            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Avatar src={data.applicantId?.avatar} size={100} className="border-4 border-white shadow-sm" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4 m-0">{data.applicantId?.name}</h2>
              <p className="text-indigo-600 font-medium text-base mb-2">{data.appId?.title}</p>
              <div className="flex justify-center items-center gap-2">
                <Rate disabled defaultValue={4} className="text-sm text-amber-400" />
                <span className="text-gray-400 text-sm">(4.0)</span>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <Button icon={<Mail size={16} />} className="bg-indigo-600 text-white border-none rounded-lg px-6 h-10 flex items-center gap-2">Email</Button>
                <Button icon={<MessageSquare size={16} />} className="rounded-lg px-6 h-10 flex items-center gap-2 border-gray-200">Message</Button>
              </div>
            </div>

            {/* Info Sections */}
            <div className="space-y-8">
              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Professional Summary</h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  {data.applicantId?.summary || "Dynamic professional with 8+ years of experience in building user-centric digital products. Specializes in SaaS platforms and design systems."}
                </p>
              </section>

              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Latest Experience</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg h-fit"><Briefcase size={20} className="text-blue-500" /></div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">Principal Designer</div>
                      <div className="text-xs text-gray-500">TechFlow Solutions • 2021 — Present</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["Product Design", "Design Systems", "Figma", "Prototyping"].map(skill => (
                    <Tag key={skill} className="m-0 px-3 py-1 rounded-lg border-gray-100 bg-white text-gray-600 text-xs font-medium">{skill}</Tag>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t flex gap-3 sticky bottom-0">
            <Button className="flex-1 h-11 rounded-xl font-bold border-gray-200">View Full Profile</Button>
            <Button type="primary" icon={<Download size={18} />} className="flex-1 h-11 rounded-xl font-bold bg-indigo-600 flex items-center justify-center gap-2">
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default QuickViewDrawer;