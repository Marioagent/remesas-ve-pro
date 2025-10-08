import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Define protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/alerts',
  '/profile',
  '/settings',
  '/favorites',
]

// Define auth routes that authenticated users shouldn't access
const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is protected or an auth route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

  // Skip middleware for public routes
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next()
  }

  // Get session token from cookies
  const token = request.cookies.get('sb-access-token')?.value
  const refreshToken = request.cookies.get('sb-refresh-token')?.value

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  let session = null

  // Verify session if tokens exist
  if (token && refreshToken) {
    const { data: { session: currentSession }, error } = await supabase.auth.getSession()

    if (!error && currentSession) {
      session = currentSession
    }
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!session) {
      // Not authenticated, redirect to login with return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Authenticated, allow access
    return NextResponse.next()
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (session) {
      // Already authenticated, redirect to dashboard
      const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard'
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    // Not authenticated, allow access to auth pages
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}
