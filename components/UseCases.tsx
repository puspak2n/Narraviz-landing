'use client'

export default function UseCases() {
  const useCases = [
    {
      icon: '📈',
      title: 'Excel Automation for Finance Teams',
      description: 'Transform complex financial spreadsheets into interactive dashboards. Get instant insights on cash flow, budgets, and forecasts.',
      color: 'blue'
    },
    {
      icon: '🛒',
      title: 'Campaign Insights for Marketers',
      description: 'Upload campaign data and get AI-powered analysis on ROI, customer segments, and performance trends instantly.',
      color: 'purple'
    },
    {
      icon: '❤️',
      title: 'Healthcare Analytics Without Code',
      description: 'Analyze patient data, track outcomes, and generate compliance reports using natural language queries.',
      color: 'pink'
    },
    {
      icon: '👥',
      title: 'HR & People Analytics',
      description: 'Turn employee data into actionable insights. Track retention, performance, and workforce trends effortlessly.',
      color: 'green'
    }
  ]

  return (
    <section id="use-cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for Every Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From finance to marketing, healthcare to HR - NarraViz transforms how teams work with data
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group hover:shadow-xl transition-all duration-300 rounded-2xl p-8 bg-gray-50 hover:bg-white border border-gray-100"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}