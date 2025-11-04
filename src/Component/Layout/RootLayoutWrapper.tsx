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

  const hideNavbarRoutes = ["/"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <div className='flex flex-col min-h-screen'>
      {!shouldHideNavbar && <Navbar />}
      <ConditionalHero/>
      <main className='flex-grow'>{children}</main>

      <Footer />
    </div>
  );
}