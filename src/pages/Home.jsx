// Home page component - Main landing page with user instructions
function Home() {
  // Feature cards for main actions
  const features = [
    {
      title: "Submit Lost Item",
      description: "Report a lost item with details to help others identify it.",
      icon: "📝",
      link: "/submission",
      buttonText: "Submit Item"
    },
    {
      title: "Search Items",
      description: "Browse through found items to locate your lost belongings.",
      icon: "🔍",
      link: "/search",
      buttonText: "Search Now"
    },
    {
      title: "Claim Item",
      description: "Found your item? Claim it by verifying the details.",
      icon: "✅",
      link: "/claim",
      buttonText: "Claim Now"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-outfit">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Lost & Found Hub
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Reuniting lost items with their owners through a simple and efficient platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <a
              href="https://github.com/fxrchis/fblasite2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-outfit font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code
            </a>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">How to Use Our Platform</h2>
          
          {/* Account Setup Section */}
          <div className="bg-purple-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">👤</span>
              Create Your Account
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3 text-purple-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">1</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Sign Up</p>
                    <p className="text-xs sm:text-sm">Click "Sign Up" in the navigation bar to create your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">2</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Enter Your Details</p>
                    <p className="text-xs sm:text-sm">Provide your email and create a secure password</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">3</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Verify Email</p>
                    <p className="text-xs sm:text-sm">Check your inbox for verification email (if required)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 text-purple-800">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">4</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Sign In</p>
                    <p className="text-xs sm:text-sm">Use your email and password to log in to your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">5</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Stay Logged In</p>
                    <p className="text-xs sm:text-sm">Your session will remain active until you sign out</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-purple-900 font-bold text-xs sm:text-sm mt-0.5">6</div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Manage Account</p>
                    <p className="text-xs sm:text-sm">Click your avatar to access sign out option</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* For People Who Lost Items */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                If You Lost Something
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-bold text-sm mt-0.5">1</div>
                  <div>
                    <p className="font-semibold">Search First</p>
                    <p className="text-sm">Browse our database to see if someone already found your item</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-bold text-sm mt-0.5">2</div>
                  <div>
                    <p className="font-semibold">Submit Your Item</p>
                    <p className="text-sm">If not found, submit details about your lost item with photos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-bold text-sm mt-0.5">3</div>
                  <div>
                    <p className="font-semibold">Wait for Updates</p>
                    <p className="text-sm">We'll notify you when someone finds or claims your item</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For People Who Found Items */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                If You Found Something
              </h3>
              <div className="space-y-3 text-green-800">
                <div className="flex items-start gap-3">
                  <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-900 font-bold text-sm mt-0.5">1</div>
                  <div>
                    <p className="font-semibold">Submit Found Item</p>
                    <p className="text-sm">Report the item you found with detailed description and photos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-900 font-bold text-sm mt-0.5">2</div>
                  <div>
                    <p className="font-semibold">Keep It Safe</p>
                    <p className="text-sm">Store the item securely until the owner claims it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-green-900 font-bold text-sm mt-0.5">3</div>
                  <div>
                    <p className="font-semibold">Verify Claims</p>
                    <p className="text-sm">Review claim requests and verify ownership before returning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-yellow-900 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-lg sm:text-xl">💡</span>
              Important Tips
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-yellow-800 text-xs sm:text-sm">
              <div className="space-y-1 sm:space-y-2">
                <p>• <strong>Account Required:</strong> You need an account to submit and claim items</p>
                <p>• <strong>Be Specific:</strong> Include brand, color, size, and unique features</p>
                <p>• <strong>Good Photos:</strong> Clear, well-lit images help identify items faster</p>
                <p>• <strong>Contact Info:</strong> Provide accurate contact details for claims</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p>• <strong>Check Often:</strong> New items are submitted daily</p>
                <p>• <strong>Be Patient:</strong> Some items take time to be found/claimed</p>
                <p>• <strong>Stay Safe:</strong> Meet in public places for item exchanges</p>
                <p>• <strong>Secure Password:</strong> Use a strong password for your account</p>
              </div>
            </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Lost & Found Hub</h3>
            <p className="text-gray-400 text-sm mb-4">Helping reunite people with their lost belongings through technology and community.</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/fxrchis/fblasite2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/submission" className="text-gray-400 hover:text-white transition-colors">Submit Item</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Search</Link></li>
              <li><Link to="/claim" className="text-gray-400 hover:text-white transition-colors">Claim</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-xs sm:text-sm">
          <p>Built with React, Supabase, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
