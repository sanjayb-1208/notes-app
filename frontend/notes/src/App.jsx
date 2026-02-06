import { Routes, Route, Outlet} from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from "./pages/Signup"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import { AppContent } from './context/AppContext';
const App = () => {
    const {loading} = useContext(AppContent)
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                {/* Modern Spinning Ring */}
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                
                {/* Optional subtle text */}
                <p className="mt-4 text-gray-500 font-medium animate-pulse">
                    Wait a sec...
                </p>
            </div>
        );
    }
    return (
        <div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        <Routes>
            {/* Group with Navbar */}
            <Route element={<><Navbar /><Outlet /></>}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<div>Dashboard</div>} />
                <Route path="/note/:id" element={<NoteDetail />} />
            </Route>

            {/* Group without Navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
    );
};

export default App;