import { Button } from "antd";

export default function ProfileHeader() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        <img src="/avatar.jpg" className="w-20 h-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">Alex Rivers</h1>
          <p className="text-gray-500">San Francisco, CA • Full-time / Remote</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button type="primary">Hire Now</Button>
          <Button>Send Message</Button>
        </div>
      </div>
    </div>
  );
}