import { NextResponse } from 'next/server';

export function middleware(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const city = request.headers.get('x-vercel-ip-city') || 'unknown';
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';

  console.log(`VISITOR_DATA | IP: ${ip} | Location: ${city}, ${country} | Path: ${request.nextUrl.pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};