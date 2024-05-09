import { NextResponse } from 'next/server'
 
export function middleware(request) {
 
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}