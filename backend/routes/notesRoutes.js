import express from 'express';
import userAuth from '../middlewares/userAuthMiddleware.js';
import { addNote, getNotes, deleteNote, updateNote, getNoteById } from '../controllers/notesControllers.js';

const noteRouter = express.Router();

noteRouter.post('/add', userAuth, addNote);
noteRouter.get('/get', userAuth, getNotes);
noteRouter.post('/delete', userAuth, deleteNote);
noteRouter.patch('/update', userAuth, updateNote);
noteRouter.get('/note/:id', userAuth, getNoteById);
export default noteRouter;