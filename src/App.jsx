import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Inquiry from './pages/Inquiry.jsx'
import signIn from './accountcreation/signIn.js'
import signUp from './accountcreation/signUp.js'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            {/* Navigation Links */}
            <div className="w-full">
                <nav className="w-full bg-gray-950 text-black flex items-center justify-between p-3">

                    {/* Left side */}
                    <div className="flex items-center gap-6 text-white">
                        <h1 className="text-xl font-semibold">Name</h1>

                        <div className="flex gap-4">
                            <Link to="/">Home</Link>
                            <Link to="/submission">Submission</Link>
                            <Link to="/search">Search</Link>
                            <Link to="/inquiry">Inquiry</Link>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                        <Link to="/inquiry">Inquiry</Link>
                    </div>

                </nav>
            </div>


            

            {/* Route Configuration */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submission" element={<Submission />} />
                <Route path="/search" element={<Search />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/signin" element={<signIn />} />
                <Route path="/signup" element={<signUp />} />
            </Routes>   
        </BrowserRouter>
    );
}

export default App;