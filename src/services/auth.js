import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, setDoc, doc, getDoc, firestore } from '../firebase/config';

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {

        // Create a reference to the user's document
        const userDocRef = doc(firestore, `users`, result.user.uid);

        // Check if the user document already exists
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            // User doesn't exist, create a new document
            await setDoc(userDocRef, {
                name: result.user.displayName,
                image: result.user.photoURL,
                email: result.user.email
            });
            console.log("User document created and Logged in");
        } else {
            console.log("Logged in");
        }

    })
        .catch((error) => {
            console.error("Error signing in with Google: ", error);
        });
};

const signOut = () => {
    return firebaseSignOut(auth);
};

export { signInWithGoogle, signOut };
