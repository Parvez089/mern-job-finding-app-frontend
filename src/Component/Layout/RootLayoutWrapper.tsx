"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ConditionalHero from "../Hero/ConditionalHero";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHomePage = pathname === "/" ;
  const isAuthPage = pathname.startsWith("/auth")
  const isJobDetailsPage =
    pathname.startsWith("/job/") &&
    pathname !== "/job/apply-job";

  const shouldHideNavbar = isHomePage || isJobDetailsPage || isAuthPage;

  return (
    <div className='flex flex-col min-h-screen'>
      {!shouldHideNavbar && <Navbar />}
      <ConditionalHero/>
      <main className='flex-grow'>{children}</main>

      <Footer />
    </div>
  );
}