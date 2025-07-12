import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.session) {
      // Get user role
      const role = data.session.user.user_metadata?.role || 'Viewer'
      
      // Build Streamlit URL with auth parameters
      const streamlitUrl = new URL(process.env.NEXT_PUBLIC_STREAMLIT_URL || 'https://narravizai-61762678324.us-central1.run.app')
      
      streamlitUrl.searchParams.append('access_token', data.session.access_token)
      streamlitUrl.searchParams.append('refresh_token', data.session.refresh_token)
      streamlitUrl.searchParams.append('user_id', data.session.user.id)
      streamlitUrl.searchParams.append('user_email', data.session.user.email || '')
      streamlitUrl.searchParams.append('user_role', role)
      
      return NextResponse.redirect(streamlitUrl.toString())
    }
  }

  // If error, redirect back to sign-in
  return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=auth_failed`)
}