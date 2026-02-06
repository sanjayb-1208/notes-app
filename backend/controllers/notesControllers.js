import {Note} from '../models/note_model.js';

export const addNote = async (req, res) => {
    const {title, content } = req.body;
    const userId = req.userId

    if (!title || !content) {
        return res.json({ success: false, message: 'Title and content are required' });
    }

    try {
        const newNote = new Note({ userId, title, content });
        await newNote.save();

        return res.json({ success: true, message: "Note added successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const getNotes = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await Note.find({ userId });
        return res.json({ success: true, notes });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    const { noteId } = req.body;

    try {
        await Note.findByIdAndDelete(noteId);
        return res.json({ success: true, message: "Note deleted" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const updateNote = async (req, res) => {
    const { noteId, title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            noteId, 
            { $set: { title, content } }, 
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.json({ success: false, message: "Note not found" });
        }

        return res.json({ success: true, message: "Note updated", updatedNote });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const note = await Note.findOne({ _id: id, userId });

        if (!note) {
            return res.json({ success: false, message: 'Note not found' });
        }

        res.json({ success: true, note });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};