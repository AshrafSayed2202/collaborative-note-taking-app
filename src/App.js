import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NoteProvider } from './context/NoteContext';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { signInWithGoogle, signOut } from './services/auth';
import { auth, setDoc, doc, getDoc, firestore } from './firebase/config';

import './index.css';

const App = () => {
  return (
    <NoteProvider>
      <Router>
        <div className="App">
          <header>
            <h1>Collaborative Note-Taking</h1>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={signOut}>Sign Out</button>
          </header>
          <NoteForm />
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/edit/:id" element={<NoteEditor />} />
            <Route path="*" element={<NoteList />} />
          </Routes>
        </div>
      </Router>
    </NoteProvider>
  );
};

export default App;
