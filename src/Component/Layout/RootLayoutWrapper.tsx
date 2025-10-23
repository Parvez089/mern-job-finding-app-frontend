"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";


export default function RootLayoutWrapper({
    children,
}:{
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideNavbarRoutes = [
        "/auth",
        "/auth/login",
        "/auth/register",
        "/auth/login/employer/dashboard",
        "/auth/login/admin/dashboard",
        "/auth/login/job-seeker/dashboard",
    ];

    const shouldHideNavbar = hideNavbarRoutes.some((route)=>
    pathname.startsWith(route));

    return(
        <div>
            {
                !shouldHideNavbar && <Navbar/>
            }
            {children}
        </div>
    )
}