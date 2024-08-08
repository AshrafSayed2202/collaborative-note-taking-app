
import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const NoteList = () => {
    const { notes } = useContext(NoteContext);
    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }
    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th"; // Covers 4th-20th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <div>
            {notes.map((note) => {
                const noteDate = note.updatedAt ? toDateTime(note.updatedAt.seconds) : toDateTime(note.createdAt.seconds);
                return (<div key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <p>{note.updatedAt ? 'Updated' : 'Created'} at:  {`${noteDate.getDate()}`}<sub>{getDaySuffix(noteDate.getDate())}</sub> {`of ${months[noteDate.getMonth()]}, ${noteDate.getFullYear()}`}</p>
                </div>)
            })}
        </div>
    );
};

export default NoteList;
