// src/hooks/useAuthStatus.js

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
            setCheckingStatus(false);
        });

        // Limpia la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    return { loggedIn, checkingStatus };
};

export default useAuthStatus;