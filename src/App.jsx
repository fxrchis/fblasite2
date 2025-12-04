import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Inquiry from './pages/Inquiry.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            {/* Navigation Links */}
            <div className="w-full">
                <nav className="bg-gray-950 text-white flex items-center gap-6 p-3">

                    <h1 className="text-xl font-semibold">Hello</h1>

                    <div className="flex gap-4">
                        <Link to="/">Home</Link>
                        <Link to="/submission">Submission</Link>
                        <Link to="/search">Search</Link>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;