import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const NoteDetails = () => {
    const { id } = useParams();
    const { backendUrl, loading, isLoggedIn } = useContext(AppContent);
    const [note, setNote] = useState(null);

    const fetchNote = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`${backendUrl}/api/notes/note/${id}`);
            if (data.success) setNote(data.note);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Only fetch if NOT loading and user IS logged in
        fetchNote()
    }, []);

    if (loading) return <div className="p-10 text-center">Verifying session...</div>;
    if (!isLoggedIn) return <div className="p-10 text-center">Please login.</div>;
    if (!note) return <div className="p-10 text-center">Loading note...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
            <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
        </div>
    );
};

export default NoteDetails;