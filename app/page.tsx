'use client'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Features from '../components/Features'
import UseCases from '../components/UseCases'
import Pricing from '../components/Pricing'
import About from '../components/About'
import VideoUpload from '../components/VideoUpload'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  const [showStickyBar, setShowStickyBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-24 pb-20">
        <div className="absolute inset-0 bg-grid-slate-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full px-4 py-2 mb-8">
              <span className="text-sm font-medium">✨ AI-Powered Data Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Turn Data Into
              <span className="gradient-text"> Insights</span>
              <br />In Seconds
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Upload your Excel or CSV files, ask questions in plain English, and get instant AI-generated visualizations and insights. No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg glow"
              >
                Start Free Trial →
              </Link>
              
              <Link
                href="#demo"
                className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all shadow-lg border border-gray-700"
              >
                Watch Demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⚡</span>
                <span className="text-sm">Instant Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🔒</span>
                <span className="text-sm">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">100%</span>
                <span className="text-sm">Privacy Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="relative py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">See NarraViz in Action</h2>
            <p className="text-gray-400">Watch how easy it is to transform your data into insights</p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-2xl">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <img src="/demo-preview.png" alt="NarraViz Demo" className="w-full" />
            </video>
            
            {/* Optional: Add a gradient overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
      
      <UseCases />
      <Features />
      <VideoUpload />
      <About />
      <Pricing />
      <Footer />
      
      {/* Sticky CTA Bar */}
      {showStickyBar && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 z-50 shadow-lg backdrop-blur-lg bg-opacity-90">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm md:text-base font-medium">
              Transform your data into insights in seconds
            </p>
            
            <Link
              href="/auth/signin"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Try Free Now
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}