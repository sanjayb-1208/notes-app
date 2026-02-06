import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, backendUrl } = useContext(AppContent);

    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
            if (data.success) {
                setIsLoggedIn(false);
                navigate('/login');
                toast.success("Logged Out");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <h1 onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600 cursor-pointer">
                Notes
            </h1>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <button 
                        onClick={logout}
                        className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                        >
                            Get Started
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;