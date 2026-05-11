import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value; 
  const { pathname } = request.nextUrl;


  if (!token) {
    if (pathname.includes('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/job-seeker/login', request.url));
    }
    return NextResponse.next();
  }

 
  
  // Employer Dashboard Check
  if (pathname.startsWith('/auth/employer/dashboard') && userRole !== 'employer') {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  // Admin Dashboard Check
  if (pathname.startsWith('/auth/admin/dashboard') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }


  const isJobSeeker = userRole === 'job-seeker' || userRole === 'jobseeker';
  if (pathname.startsWith('/auth/job-seeker/dashboard') && !isJobSeeker) {
    return NextResponse.redirect(new URL('/', request.url));
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