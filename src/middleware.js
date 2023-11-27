export { default } from 'next-auth/middleware'

export const config = {
  // matcher: ['/dashboard'],
  matcher: ['/((?!register|api|login).*)'],
}

import { NextResponse } from 'next/server'

export function middleware(request) {
  console.log('middleware')
  NextResponse.next()
}
