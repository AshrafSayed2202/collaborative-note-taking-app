import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NoteProvider } from './context/NoteContext';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { signInWithGoogle, signOut } from './services/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
library.add(fas)
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NoteProvider>
      <Router>
        <div className="App">
          <header>
            <h1>Share your NOTES with Strangers</h1>
            {user ? (
              <div className='user-head'>
                <img src={user.photoURL} alt='user' />
                <div>
                  <p>{user.displayName}</p>
                  <span>{user.email}</span>
                </div>
                <button onClick={signOut} title='logout'><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>
              </div>
            ) : (
              <button onClick={signInWithGoogle}>Sign In with Google</button>
            )}
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
