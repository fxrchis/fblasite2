import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Claim from './pages/Claim.jsx'
import SignIn from './accountcreation/SignIn.jsx'
import SignUp from './accountcreation/SignUp.jsx'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'


function App() {
    return (
        <BrowserRouter>
            {/* Navigation */}
            <header className="bg-gray-900 shadow-sm font-outfit ">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        {/* Logo and main nav */}
                        <div className="flex items-center">
                            <Link to="/">
                                <span className="text-xl font-bold text-white">Name</span>
                            </Link>

                            <div className="hidden md:ml-10 md:flex md:space-x-8">
                                <Link to="/" className="text-white">Home</Link>
                                <Link to="/submission" className="text-white">Submission</Link>
                                <Link to="/search" className="text-white">Search</Link>
                                <Link to="/claim" className="text-white">Claim</Link>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="hidden md:ml-6 md:flex md:items-center">
                            <Link
                                to="/signin"
                                className="ml-8 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700  transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </nav>

            </header>

            {/* Route Configuration */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submission" element={<Submission />} />
                <Route path="/search" element={<Search />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>   
        </BrowserRouter>
    );
}

export default App;