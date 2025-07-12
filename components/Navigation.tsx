'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-white">NarraViz AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition">Features</Link>
            <Link href="#use-cases" className="text-gray-300 hover:text-white transition">Use Cases</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition">About</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={process.env.NEXT_PUBLIC_STREAMLIT_URL || '#'}
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium glow"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu code... */}
        </div>
      </div>
    </nav>
  )
}