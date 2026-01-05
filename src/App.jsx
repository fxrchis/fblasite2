import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Claim from './pages/Claim.jsx'
import SignIn from './accountcreation/SignIn.jsx'
import SignUp from './accountcreation/SignUp.jsx'
import supabase from './config/supabaseClient.js'
import Admin from './pages/Admin';

// Custom NavLink component for active state styling
const NavLink = ({ to, children, className = '', ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors font-outfit ${
        isActive 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

function App() {
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  // Check for user session on mount
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    }
    setShowDropdown(false)
    // Redirect to home after sign out
    window.location.href = '/'
  }

  return (
    <BrowserRouter>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-outfit">
                  Lost & Found
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/submission" className="nav-link">
                Submit Item
              </NavLink>
              <NavLink to="/search" className="nav-link">
                Search
              </NavLink>
              <NavLink to="/claim" className="nav-link">
                Claim
              </NavLink>
              {user?.email === 'admin@example.com' && (
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 focus:outline-none group"
                    id="user-menu"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-gray-700 group-hover:text-indigo-600 transition-colors font-outfit font-medium">
                      {user.email}
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-outfit font-medium"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors font-outfit"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity font-outfit"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/search" element={<Search />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/admin" 
            element={user?.email === 'admin@example.com' ? <Admin /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App