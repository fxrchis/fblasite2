// Main App component - Handles routing and authentication
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

function App() {
  // User authentication state
  const [user, setUser] = useState(null)
  // User dropdown menu visibility
  const [showDropdown, setShowDropdown] = useState(false)

  // Check for existing user session on app load
  useEffect(() => {
    // Get initial session from Supabase
    supabase.auth.getSession().then(function(response) {
      var session = response.data.session
      if (session && session.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    // Listen for authentication state changes
    var authListener = supabase.auth.onAuthStateChange(function(event, session) {
      if (session && session.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    // Cleanup auth listener on component unmount
    return function() {
      if (authListener && authListener.data && authListener.data.subscription) {
        authListener.data.subscription.unsubscribe()
      }
    }
  }, [])

  // Handle user sign out
  function handleSignOut() {
    supabase.auth.signOut().then(function(response) {
      if (response.error) {
        console.error('Error signing out:', response.error.message)
      }
      setShowDropdown(false)
      // Redirect to home after sign out
      window.location.href = '/'
    }).catch(function(error) {
      console.error('Error signing out:', error)
      setShowDropdown(false)
      window.location.href = '/'
    })
  }

  // Toggle user dropdown menu
  function toggleDropdown() {
    setShowDropdown(!showDropdown)
  }

  // Get user's first initial for avatar
  function getUserInitial() {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  // Check if current user is admin
  function isUserAdmin() {
    return user && user.email === 'fernandobriceno9988@gmail.com'
  }

  // Get CSS classes for navigation links based on current route
  function getNavLinkClass(path) {
    const location = window.location.pathname
    if (location === path) {
      return 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-outfit text-indigo-600 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm'
    }
    return 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-outfit text-gray-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-sm'
  }

  return (
    <BrowserRouter>
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center group">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-outfit group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                  Lost & Found
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/" className={getNavLinkClass('/')}>
                Home
              </Link>
              <Link to="/submission" className={getNavLinkClass('/submission')}>
                Submit Item
              </Link>
              <Link to="/search" className={getNavLinkClass('/search')}>
                Search
              </Link>
              <Link to="/claim" className={getNavLinkClass('/claim')}>
                Claim
              </Link>
              {isUserAdmin() && (
                <Link to="/admin" className={getNavLinkClass('/admin')}>
                  Admin
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 focus:outline-none group"
                    id="user-menu"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700">
                      {getUserInitial()}
                    </div>
                    <span className="hidden md:inline text-gray-700 group-hover:text-indigo-600 transition-colors font-outfit font-medium">
                      {user.email}
                    </span>
                    <svg className={'w-4 h-4 text-gray-500 transition-transform ' + (showDropdown ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-gray-100">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 transition-all duration-200 font-outfit font-medium"
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-outfit rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 font-outfit transform hover:scale-105"
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
            element={isUserAdmin() ? <Admin /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App