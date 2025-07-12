'use client'

export default function Features() {
  const features = [
    {
      icon: '📤',
      title: 'Upload Excel/CSV',
      description: 'Drag and drop your files. Support for Excel, CSV, and Google Sheets.'
    },
    {
      icon: '💬',
      title: 'Natural Language Queries',
      description: 'Ask questions in plain English. No SQL or coding knowledge needed.'
    },
    {
      icon: '📊',
      title: 'Instant Charts & Dashboards',
      description: 'AI generates the perfect visualization for your data automatically.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Enterprise-grade security. Your data never leaves our encrypted servers.'
    },
    {
      icon: '⚡',
      title: 'Real-time Analysis',
      description: 'Get insights in seconds, not hours. Powered by advanced AI models.'
    },
    {
      icon: '🌐',
      title: 'Share & Collaborate',
      description: 'Export reports, share dashboards, and collaborate with your team.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Analyze Data
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make data analysis accessible to everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}