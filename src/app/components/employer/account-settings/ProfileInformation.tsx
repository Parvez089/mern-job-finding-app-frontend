import React from "react";

const ProfileInformation = () => {
  return <div className="max-w-2xl">  <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
          <div className="flex flex-col w-full  gap-4">
            <input placeholder="First Name" className="border p-2 rounded-lg  w-full " />
            <input placeholder="Last Name" className="border p-2 rounded-lg" />
            <input placeholder="Email" className="border p-2 rounded-lg" />
            <input placeholder="Phone Number" className="border p-2 rounded-lg" />
            <input placeholder="email" className="border p-2 rounded-lg" />
            <input placeholder="position" className="border p-2 rounded-lg" />
            
          </div>
          <button className="!mt-4  bg-blue-500 !text-white px-4 py-2 rounded-lg w-full ">Save</button></div>;
};

export default ProfileInformation;
