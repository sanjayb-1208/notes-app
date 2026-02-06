import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const Signup = () => {
    const {backendUrl} = useContext(AppContext;)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('${backendUrl}/api/auth/register', { name, email, password });
            
            if (data.success) {
                toast.success(data.message);
                navigate('/login');
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
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join us to start taking notes</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                            type="text" 
                            placeholder="John Doe" 
                            required 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                            type="email" 
                            placeholder="name@company.com" 
                            required 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md mt-2"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                    <Link to="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Signup;


