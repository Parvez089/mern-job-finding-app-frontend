// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

 
  console.log("Current Path:", pathname);
  console.log("User Role from Cookie:", userRole);

  
  if (!token && pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/job-seeker/login', request.url));
  }

 

  if (pathname.startsWith('/auth/employer/dashboard') && userRole !== 'employer') {
    return NextResponse.redirect(new URL('/auth/job-seeker/dashboard', request.url));
  }


  if (pathname.startsWith('/auth/admin/dashboard') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/auth/job-seeker/dashboard', request.url));
  }


  if (pathname.startsWith('/auth/job-seeker/dashboard') && userRole !== 'job-seeker') {
    return NextResponse.redirect(new URL('/auth/employer/dashboard', request.url));
  }

  return NextResponse.next();
}


  export const config = {
  matcher: [
    
    '/auth/admin/dashboard/:path*',
    '/auth/employer/dashboard/:path*',
    '/auth/job-seeker/dashboard/:path*',
  ],
};
