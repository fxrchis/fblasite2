import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Claim from './pages/Claim.jsx'
import signIn from './accountcreation/signIn.jsx'
import signUp from './accountcreation/signUp.jsx'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

function App() {
    return (
        <BrowserRouter>
            {/* Navigation */}
            <header className="bg-gray-900 shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo and main nav */}
                        <div className="flex items-center">
                            <Link to="/">
                                <span className="text-xl font-bold text-white">Name</span>
                            </Link>

                            <div className="hidden md:ml-10 md:flex md:space-x-8">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/submission">Submit Item</NavLink>
                                <NavLink to="/search">Search</NavLink>
                                <NavLink to="/claim">Claim</NavLink>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="hidden md:ml-6 md:flex md:items-center">
                            <Link
                                to="/signin"
                                className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>

                    </div>
                </nav>

                {/* Mobile menu */}
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className="block px-3 py-2 text-base font-medium">Home</NavLink>
                        <NavLink to="/submission" className="block px-3 py-2 text-base font-medium">Submit Item</NavLink>
                        <NavLink to="/search" className="block px-3 py-2 text-base font-medium">Search</NavLink>
                        <NavLink to="/claim" className="block px-3 py-2 text-base font-medium">Claim</NavLink>
                        <Link
                            to="/signin"
                            className="block w-full text-left px-3 py-2 text-base font-medium text-blue-400 hover:text-blue-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            {/* Route Configuration */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submission" element={<Submission />} />
                <Route path="/search" element={<Search />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/signin" element={<signIn />} />
                <Route path="/signup" element={<signUp />} />
            </Routes>   
        </BrowserRouter>
    );
}

export default App;