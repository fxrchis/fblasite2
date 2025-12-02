import Home from './pages/Home.jsx'
import Submission from './pages/Submission.jsx'
import Search from './pages/Search.jsx'
import Inquiry from './pages/Inquiry.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            {/* Navigation Links */}
            <nav>
                <Link to="/">Home</Link> |{' '}
                <Link to="/submission">Submission</Link> |{' '}
                <Link to="/search">Search</Link> |{' '} 
                <Link to="/inquiry">Inquiry</Link>
            </nav>

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