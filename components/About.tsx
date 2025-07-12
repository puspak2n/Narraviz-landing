'use client'

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose NarraViz?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              We're building the future of data analysis. NarraViz makes professional data analysis accessible to everyone, regardless of technical background.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">👥</span>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Built for Business Users
                  </h3>
                  <p className="text-gray-400">
                    No SQL, no Python, no complex tools. Just upload and ask.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    AI That Understands Context
                  </h3>
                  <p className="text-gray-400">
                    Our AI understands business terminology and provides relevant insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Security First
                  </h3>
                  <p className="text-gray-400">
                    Your data is encrypted and never shared. We take privacy seriously.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">
              Our Mission
            </h3>
            <p className="text-gray-300 mb-4">
              We believe everyone should be able to understand their data without needing a technical degree. NarraViz is built to make data analysis as simple as having a conversation.
            </p>
            <p className="text-gray-300 mb-6">
              Join us in transforming how businesses work with data.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">Fast</div>
                <div className="text-sm text-gray-400">Analysis in seconds</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">Easy</div>
                <div className="text-sm text-gray-400">No coding required</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">Secure</div>
                <div className="text-sm text-gray-400">Your data is safe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}