'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [email, setEmail] = useState('')
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false)

  const handleEnterpriseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enterprise interest:', email)
    setEmail('')
    setShowEnterpriseForm(false)
  }

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        '5 file uploads per month',
        'Basic visualizations',
        '24-hour data retention',
        'Community support'
      ],
      cta: 'Start Free',
      href: '/auth/signin?plan=basic',
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      originalPrice: '$30',
      description: 'Unlimited analysis for professionals',
      features: [
        'Unlimited file uploads',
        'Advanced AI insights',
        'Custom dashboards',
        'Priority support',
        'Data export & sharing',
        'Coming Soon: API access'
      ],
      cta: 'Start Pro Trial',
      href: '/auth/signin?plan=pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored for large teams',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security',
        'Team training'
      ],
      cta: 'Contact Sales',
      href: '#enterprise-form',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 border rounded-2xl p-8 ${
                plan.popular ? 'border-blue-500 scale-105 glow' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>✨</span>
                    <span>50% OFF - Limited Time</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">{plan.originalPrice}</span>
                  )}
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === 'Enterprise' ? (
                <button
                  onClick={() => setShowEnterpriseForm(true)}
                  className="w-full py-3 px-6 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition border border-gray-700"
                >
                  {plan.cta}
                </button>
              ) : (
                <Link
                  href={plan.href}
                  className={`block w-full py-3 px-6 text-center rounded-full font-semibold transition ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 glow'
                      : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {showEnterpriseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get Enterprise Pricing
              </h3>
              <p className="text-gray-400 mb-6">
                Tell us about your needs and we'll create a custom plan for your team.
              </p>
              <form onSubmit={handleEnterpriseSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@company.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEnterpriseForm(false)}
                    className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition border border-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}