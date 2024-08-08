import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import Note from './Note';

const NoteList = () => {
    const { notes, user } = useContext(NoteContext);

    function toDateTime(secs) {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

    if (!user) {
        return ''
    }

    return (
        <div className='note-list'>
            {notes.map((note) => {
                const noteDate = note.updatedAt ? toDateTime(note.updatedAt.seconds) : toDateTime(note.createdAt.seconds);
                return <Note key={note.id} note={note} noteDate={noteDate} />
            })}
        </div>
    );
};

export default NoteList;
