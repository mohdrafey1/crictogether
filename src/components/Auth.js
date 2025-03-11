'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Auth() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) setUsername(savedUsername);
    }, []);

    const handleAuth = async () => {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('username', username);
        }
        toast.success(data.message);
    };

    return (
        <div>
            {username ? (
                <>Hii, {username}</>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAuth}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Join
                    </button>
                </>
            )}
        </div>
    );
}
