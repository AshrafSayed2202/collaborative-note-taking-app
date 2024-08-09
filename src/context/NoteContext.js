import React, { createContext, Component } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore, collection, onSnapshot } from '../firebase/config';

const NoteContext = createContext();

class NoteProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            notes: [],
        };
    }

    componentDidMount() {
        this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
            this.setState({ user });

            if (user) {
                this.subscribeToNotes(user);
            }
        });
    }

    componentWillUnmount() {
        if (this.authUnsubscribe) {
            this.authUnsubscribe();
        }

        if (this.notesUnsubscribe) {
            this.notesUnsubscribe();
        }
    }

    subscribeToNotes = () => {
        const notesRef = collection(firestore, 'notes');
        this.notesUnsubscribe = onSnapshot(notesRef, (snapshot) => {
            const notesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            this.setState({ notes: notesList });
        });
    };

    render() {
        const { user, notes } = this.state;
        return (
            <NoteContext.Provider value={{ user, notes }}>
                {this.props.children}
            </NoteContext.Provider>
        );
    }
}

export { NoteContext, NoteProvider };
