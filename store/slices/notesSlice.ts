// notesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveDataToStorage } from '@/utils/storage';

interface CreatedItem {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    isArchived: boolean;
}

export interface Note extends CreatedItem {
    content: string;
    collection: string;
    limit: number;
    isPosted: boolean;
    url: string;
}

export interface Collection extends CreatedItem {
    notes: string[];
}

export interface NotesState {
    collections: Collection[];
    notes: Note[];
}

const initialState: NotesState = {
    collections: [],
    notes: [],
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addCollection: (state, action: PayloadAction<Collection>) => {
            state.collections.push(action.payload);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            state.notes[index] = action.payload;
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        addNoteToCollection: (state, action: PayloadAction<{ noteId: string; collectionId: string }>) => {
            const collectionIndex = state.collections.findIndex((collection) => collection.id === action.payload.collectionId);
            state.collections[collectionIndex].notes.push(action.payload.noteId);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        removeNoteFromCollection: (state, action: PayloadAction<{ noteId: string; collectionId: string }>) => {
            const collectionIndex = state.collections.findIndex((collection) => collection.id === action.payload.collectionId);
            state.collections[collectionIndex].notes = state.collections[collectionIndex].notes.filter((note) => note !== action.payload.noteId);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        deleteCollection: (state, action: PayloadAction<string>) => {
            state.collections = state.collections.filter((collection) => collection.id !== action.payload);
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        archiveCollection: (state, action: PayloadAction<string>) => {
            const index = state.collections.findIndex((collection) => collection.id === action.payload);
            state.collections[index].isArchived = true;
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        archiveNote: (state, action: PayloadAction<string>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload);
            state.notes[index].isArchived = true;
            saveDataToStorage(state.notes, state.collections); // Save data after updating
        },
        setNotes: (state, action: PayloadAction<NotesState>) => {
            return action.payload;
        }
    },
});

export const { addCollection, addNote, updateNote, deleteNote, addNoteToCollection, removeNoteFromCollection, deleteCollection, archiveCollection, archiveNote, setNotes } = notesSlice.actions;

export default notesSlice.reducer;