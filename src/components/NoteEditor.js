import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from '../firebase/config';
import { firestore } from '../firebase/config';

const NoteEditor = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNote = async () => {
            const noteRef = doc(firestore, 'notes', id);
            const docSnap = await getDoc(noteRef);
            console.log(docSnap);

            if (docSnap.exists()) {
                const noteData = docSnap.data();
                setNote(noteData);
                setTitle(noteData.title);
                setContent(noteData.content);
            }
        };
        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            const noteRef = doc(firestore, 'notes', id);
            await updateDoc(noteRef, {
                title,
                content,
                updatedAt: new Date()
            });
            navigate('/');
        }
    };

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
            ></input>
            <button type="submit">Update Note</button>
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default NoteEditor;
