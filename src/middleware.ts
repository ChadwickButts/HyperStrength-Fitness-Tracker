import { NextResponse, NextRequest } from 'next/server'
import { decryptSession } from './app/lib/session';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session');

  if (sessionToken?.name === 'session') {
    const payload: any = decryptSession(sessionToken.value);

    return NextResponse.next()
  }
    

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/account',
}