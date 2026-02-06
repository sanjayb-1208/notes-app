import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext'; // Import Context

const Login = () => {
    const { backendUrl, setIsLoggedIn, getUserNotes } = useContext(AppContent); // Use Context
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            
            if (data.success) {
                setIsLoggedIn(true);     // Update Auth State
                await getUserNotes();    // Fetch Notes Immediately
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Login to access your notes</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            type="email" placeholder="name@company.com" required 
                            onChange={e => setEmail(e.target.value)} value={email} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" required 
                                onChange={e => setPassword(e.target.value)} value={password} 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-blue-600 font-medium"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;