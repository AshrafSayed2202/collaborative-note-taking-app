import React, { useState, useEffect, useContext } from 'react';
import { firestore, doc, getDoc, deleteDoc } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoteContext } from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Note = ({ note, noteDate }) => {
    const navigate = useNavigate();
    const { user, setNotes } = useContext(NoteContext);
    const [userData, setUserData] = useState(null);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (note.user) {
                try {
                    const userDocRef = doc(firestore, 'users', note.user);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    } else {
                        console.log("No such user document!");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                }
            }
        };
        fetchUser();
    }, [note.user]);

    const deleteNote = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const noteDocRef = doc(firestore, 'notes', note.id);
                await deleteDoc(noteDocRef);
                setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id));
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    return (
        <div className="note">
            {userData && (
                <div className="note-user">
                    <img src={userData.image} alt='user' />
                    <p>{userData.name}</p>
                </div>
            )}
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p className='note-date'>{note.updatedAt ? 'Updated' : 'Created'} at:  {`${noteDate.getDate()}`}<span style={{ fontSize: 'smaller' }}>{getDaySuffix(noteDate.getDate())}</span> {`of ${months[noteDate.getMonth()]}, ${noteDate.getFullYear()}`}</p>

            {note.user === user.uid && (
                <div className='note-btns'>
                    <button type='button' onClick={deleteNote}>
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                    </button>
                    <button type='button' onClick={() => { navigate(`/edit/${note.id}`) }}>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Note;
