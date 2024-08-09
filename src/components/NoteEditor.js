import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../firebase/config';

const NoteEditor = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setError('User not authenticated.');
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchNote = async () => {
                try {
                    const noteRef = doc(firestore, 'notes', id);
                    const docSnap = await getDoc(noteRef);

                    if (docSnap.exists()) {
                        const noteData = docSnap.data();
                        if (noteData.user !== user.uid) {
                            setError('You are not allowed to edit this note.');
                            setIsLoading(false);
                            return;
                        }
                        setNote(noteData);
                        setTitle(noteData.title);
                        setContent(noteData.content);
                    } else {
                        setError('Note not found.');
                    }
                } catch (error) {
                    console.error('Error fetching the note:', error);
                    setError('Failed to fetch the note.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchNote();
        }
    }, [user, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            try {
                const noteRef = doc(firestore, 'notes', id);
                await updateDoc(noteRef, {
                    title,
                    content,
                    updatedAt: new Date()
                });
                navigate('/');
            } catch (error) {
                setError('Failed to update the note.');
            }
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return note ? (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Update Note</button>
        </form>
    ) : (
        <p>Note not found.</p>
    );
};

export default NoteEditor;
