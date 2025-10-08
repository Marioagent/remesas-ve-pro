// Authentication utilities for REME LAT-USA
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  country_code?: string
  is_premium: boolean
  created_at: string
}

export interface AuthError {
  message: string
  status?: number
}

// Sign Up
export async function signUp(email: string, password: string, fullName?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error

    // Create user profile in public.users
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
        })

      if (profileError) {
        console.error('Error creating user profile:', profileError)
      }
    }

    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Update last login
    if (data.user) {
      await supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id)
    }

    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

// Sign Out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: { message: error.message } }
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw error
    if (!user) return { user: null, profile: null, error: null }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }

    return { user, profile, error: null }
  } catch (error: any) {
    return { user: null, profile: null, error: { message: error.message } }
  }
}

// Reset Password - Send Email
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: { message: error.message } }
  }
}

// Update Password
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: { message: error.message } }
  }
}

// Sign In with Google
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

// Update User Profile
export async function updateProfile(userId: string, updates: Partial<User>) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

// Check if user is premium
export async function isPremium(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('is_premium, premium_expires')
      .eq('id', userId)
      .single()

    if (error || !data) return false

    // Check if premium and not expired
    if (data.is_premium) {
      if (!data.premium_expires) return true
      return new Date(data.premium_expires) > new Date()
    }

    return false
  } catch (error) {
    return false
  }
}

// Subscribe to auth changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback)
}

// Check session
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session, error: null }
  } catch (error: any) {
    return { session: null, error: { message: error.message } }
  }
}
