// src/components/AdminPanel/sections/Users/index.jsx
import React, { useState } from 'react';
import UserList from './UserList.jsx';
import UserProfile from './UserProfile.jsx';

const Users = () => {
    // 'list' | 'profile'
    const [view, setView] = useState('list');
    const [currentUser, setCurrentUser] = useState(null);

    const handleViewProfile = (user) => {
        setCurrentUser(user);
        setView('profile');
    };

    const handleBackToList = () => {
        setView('list');
    };

    return (
        <section>
            {view === 'list' && (
                <UserList onViewProfile={handleViewProfile} />
            )}
            {view === 'profile' && (
                <UserProfile user={currentUser} onBackToList={handleBackToList} />
            )}
        </section>
    );
};

export default Users;