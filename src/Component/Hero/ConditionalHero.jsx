"use client"

import { usePathname } from "next/navigation";
import React from "react";
import Hero from "./Hero";

const ConditionalHero = () => {
    const pathname = usePathname();
    const showHero = pathname === "/" || pathname.startsWith("/job/")

    if(!showHero)  return null;
  return <Hero/>;
};

export default ConditionalHero;
