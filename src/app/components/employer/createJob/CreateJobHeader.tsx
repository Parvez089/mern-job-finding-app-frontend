
"use client"
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateJobHeader = () => {
    const router = useRouter();
  return( 
  <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex gap-4 items-center">
            {/* className='p-2 hover:bg-gray-50 rounded-full transition-all' */}
             <Button 
             onClick={()=> router.back()}
             className="p-2 hover:bg-gray-50 rounded-full transition-all"
             >
                <ArrowLeft className="text-[#505495]"/>
             </Button>
             
             <h1 className="text-xl font-bold text-[#0e0f1b]">Create New Job</h1>
          </div>
          <Button>
            Cencel
          </Button>
  </header>
  );
};

export default CreateJobHeader;

