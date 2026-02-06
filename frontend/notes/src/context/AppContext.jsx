import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = "https://notes-app-backend-z130.onrender.com";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                setIsLoggedIn(true);
                await getUserNotes();
            }
        } catch (error) {
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const getUserNotes = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/notes/get`);
            if (data.success) {
                setNotes(data.notes);
            }
        } catch (error) {
            toast.error("Failed to load notes");
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        notes, setNotes,
        getUserNotes,
        loading
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );

};
