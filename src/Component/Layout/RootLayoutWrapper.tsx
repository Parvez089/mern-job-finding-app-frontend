/** @format */

"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ConditionalHero from "../Hero/ConditionalHero";
import Banner from "../banner/Banner";
import { useState } from "react";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const isHomePage = pathname === "/";
  const isAuthPage = pathname.startsWith("/auth");

  const isDashboardPage =
    pathname.startsWith("/auth/employer/dashboard") ||
    pathname.startsWith("/auth/job-seeker/dashboard") ||
    pathname.startsWith("/auth/admin/dashboard");

  const isJobDetailsPage =
    pathname.startsWith("/job/") && pathname !== "/job/apply-job";

  // ✅ Dashboard page হলে wrapper বাদ
  if (isDashboardPage) {
    return <>{children}</>;
  }

  const shouldHideNavbar = isHomePage || isJobDetailsPage || isAuthPage;
  const shouldHideBanner = isAuthPage;

  return (
    <div className='flex flex-col min-h-screen'>
      {!shouldHideNavbar && <Navbar />}

      <ConditionalHero onUpdateJobs={(data: any) => setSearchResults(data)} />

      <main className='flex-grow'>{children}</main>

      {!shouldHideBanner && <Banner />}
      {!isDashboardPage && <Footer />}
    </div>
  );
}
