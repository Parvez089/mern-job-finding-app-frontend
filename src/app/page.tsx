/** @format */

<<<<<<< Updated upstream
import Hero from "@/Component/Hero/Hero";

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 mt-24 md:mt-12'>
      <Hero />
    </div>
  );
=======
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/job");
  }, [router]);

  return null;
>>>>>>> Stashed changes
}
