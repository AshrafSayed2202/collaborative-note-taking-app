import React, { useState, useEffect } from 'react';
import { firestore, doc, getDoc } from '../firebase/config';

const Note = ({ note, noteDate }) => {
    const [user, setUser] = useState(null);

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
                    const userDocRef = doc(firestore, 'users', note.user); // Use note.user as the UID
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUser(userDocSnap.data());
                    } else {
                        console.log("No such user document!");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                }
            }
        };

        fetchUser();
    }, [note.user]); // Fetch user data when note.user changes

    return (
        <div className="note">
            {user && (
                <div className="note-user">
                    <img src={user.image} alt='user' />
                    <p>{user.name}</p>
                    <p>Written by: {user.displayName}</p>
                </div>
            )}
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>{note.updatedAt ? 'Updated' : 'Created'} at:  {`${noteDate.getDate()}`}<sub>{getDaySuffix(noteDate.getDate())}</sub> {`of ${months[noteDate.getMonth()]}, ${noteDate.getFullYear()}`}</p>
        </div>
    );
};

export default Note;
