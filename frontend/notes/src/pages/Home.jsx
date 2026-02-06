import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router';

const Home = () => {
    const { isLoggedIn, notes, getUserNotes, backendUrl, loading } = useContext(AppContent);
    const navigate = useNavigate();

    // Modal & Form States
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({ id: '', title: '', content: '' });

    useEffect(() => {
        if (isLoggedIn) getUserNotes();
    }, [isLoggedIn]);

    const openAddModal = () => {
        setFormData({ id: '', title: '', content: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    // Open modal for Editing
    const openEditModal = (note) => {
        setFormData({ id: note._id, title: note.title, content: note.content });
        setIsEditing(true);
        setShowModal(true);
    };

    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            if (isEditing) {
                const { data } = await axios.patch(`${backendUrl}/api/notes/update`, {
                    noteId: formData.id,
                    title: formData.title,
                    content: formData.content
                });
                if (data.success) toast.success("Note updated!");
            } else {
                const { data } = await axios.post(`${backendUrl}/api/notes/add`, {
                    title: formData.title,
                    content: formData.content
                });
                if (data.success) toast.success("Note added!");
            }
            setShowModal(false);
            await getUserNotes();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const confirmDelete = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/notes/delete`, { noteId: deleteId });
            if (data.success) {
                toast.success("Note deleted");
                setDeleteId(null);
                await getUserNotes();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Note' : 'Add New Note'}</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Note Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Content"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gray-100 rounded-lg font-medium">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium">
                                    {isEditing ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Note?</h3>
                        <p className="text-gray-500 mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 py-2 bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
                    {isLoggedIn && (
                        <button onClick={openAddModal} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                            + New Note
                        </button>
                    )}
                </div>

                {!isLoggedIn ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200">
                        <p className="text-xl text-gray-500 mb-4">Please login to see your notes</p>
                        <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">Get Started &rarr;</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div
                                    key={note._id}
                                    onClick={() => navigate(`/note/${note._id}`)}
                                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{note.title}</h3>
                                        <p className="text-gray-600 line-clamp-3">{note.content}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                        <span className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</span>
                                        <div className="flex gap-3">
                                            <button onClick={(e) => { e.stopPropagation(); openEditModal(note); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); setDeleteId(note._id); }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-400 italic">No notes found. Create your first one!</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;