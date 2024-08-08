import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore, collection, onSnapshot } from '../firebase/config';

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const notesRef = collection(firestore, 'notes');
            const unsubscribe = onSnapshot(notesRef, (snapshot) => {
                const notesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setNotes(notesList);
            });

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <NoteContext.Provider value={{ user, notes }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
