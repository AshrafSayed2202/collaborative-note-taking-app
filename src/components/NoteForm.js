import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { collection, addDoc } from '../firebase/config';
import { firestore } from '../firebase/config';

const NoteForm = () => {
    const { user } = useContext(NoteContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    if (!user) {
        return <p>You must be logged in to add notes.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            await addDoc(collection(firestore, 'notes'), {
                title,
                content,
                user: user.uid,
                createdAt: new Date()
            });
            setTitle('');
            setContent('');
        }
    };

    return (
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
            ></input>
            <button type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;