import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, Collection } from '../store/slices/notesSlice';

const NOTES_KEY = 'notes';
const COLLECTIONS_KEY = 'collections';

export const saveNotesToStorage = async (notes: Note[]) => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to storage', error);
  }
};

export const loadNotesFromStorage = async (): Promise<Note[]> => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error loading notes from storage', error);
    return [];
  }
};

export const saveCollectionsToStorage = async (collections: Collection[]) => {
    try {
        await AsyncStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
        console.error('Error saving collections to storage', error);
    }
};

export const loadCollectionsFromStorage = async (): Promise<Collection[]> => {
    try {
        const collections = await AsyncStorage.getItem(COLLECTIONS_KEY);
        return collections ? JSON.parse(collections) : [];
    } catch (error) {
        console.error('Error loading collections from storage', error);
        return [];
    }
};

export const loadDataFromStorage = async () => {
    const [notes, collections] = await Promise.all([loadNotesFromStorage(), loadCollectionsFromStorage()]);
    return { notes, collections };
}

export const saveDataToStorage = async (notes: Note[], collections: Collection[]) => {
    await Promise.all([saveNotesToStorage(notes), saveCollectionsToStorage(collections)]);
}

