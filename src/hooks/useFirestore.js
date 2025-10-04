// src/hooks/useFirestore.js

import { useState } from 'react';
import { db } from '../firebaseConfig';
import { 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    serverTimestamp,
} from 'firebase/firestore';

const useFirestore = (collectionName) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addDocument = async (document) => {
        setLoading(true);
        setError(null);
        try {
            await addDoc(collection(db, collectionName), {
                ...document,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false;
        }
    };

    const updateDocument = async (id, document) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                ...document,
                updatedAt: serverTimestamp(),
            });
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false;
        }
    };

    const deleteDocument = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false;
        }
    };

    return { addDocument, updateDocument, deleteDocument, loading, error };
};

export default useFirestore;