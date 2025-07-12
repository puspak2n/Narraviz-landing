'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, getUserRole } from '../../../lib/supabase'

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      // User is already logged in, redirect to Streamlit
      redirectToStreamlit(session)
    }
  }

  const redirectToStreamlit = async (session: any) => {
    try {
      const role = await getUserRole(session.user.id)
      
      // Build Streamlit URL with auth parameters
      const streamlitUrl = new URL(process.env.NEXT_PUBLIC_STREAMLIT_URL || 'https://narravizai-61762678324.us-central1.run.app')
      
      // Pass authentication data as URL parameters
      streamlitUrl.searchParams.append('access_token', session.access_token)
      streamlitUrl.searchParams.append('refresh_token', session.refresh_token)
      streamlitUrl.searchParams.append('user_id', session.user.id)
      streamlitUrl.searchParams.append('user_email', session.user.email)
      streamlitUrl.searchParams.append('user_role', role)
      
      // Redirect to Streamlit app
      window.location.href = streamlitUrl.toString()
    } catch (error) {
      console.error('Error redirecting:', error)
      setError('Error redirecting to application')
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github' | 'azure') => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === 'github' ? 'read:user user:email' : undefined,
          queryParams: provider === 'azure' ? {
            prompt: 'select_account',
          } : undefined,
        },
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in')
      setLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role: 'Viewer' }
          }
        })

        if (error) throw error

        if (data?.user?.identities?.length === 0) {
          throw new Error('This email is already registered')
        }

        setError(null)
        alert('✅ Account created! Check your email to confirm.')
        setIsSignUp(false)
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        // Redirect to Streamlit with session
        await redirectToStreamlit(data.session)
      }
    } catch (error: any) {
      setError(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-slate-100" />
      
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <span className="text-3xl">🚀</span>
            <span className="text-2xl font-bold text-white">NarraViz AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-blue-100">
            {isSignUp ? 'Sign up to start analyzing data' : 'Sign in to access your dashboards'}
          </p>
        </div>

        {/* Sign In/Up Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : (isSignUp ? '📝 Sign Up' : '🔓 Sign In')}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Google Sign In */}
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub Sign In */}
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 font-medium border border-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>

            {/* Microsoft Sign In */}
            <button
              onClick={() => handleSocialLogin('azure')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-[#2F2F2F] text-white rounded-lg hover:bg-[#3F3F3F] transition disabled:opacity-50 font-medium border border-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M11 11H0V0h11v11z"/>
                <path fill="#81bc06" d="M23 11H12V0h11v11z"/>
                <path fill="#05a6f0" d="M11 23H0V12h11v11z"/>
                <path fill="#ffba08" d="M23 23H12V12h11v11z"/>
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm">
              Forgot password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}