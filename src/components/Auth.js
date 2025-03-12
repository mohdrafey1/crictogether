'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Auth() {
    const [username, setUsername] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleAuth = async () => {
        if (!inputValue.trim()) {
            toast.error('Username cannot be empty!');
            return;
        }

        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: inputValue }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('username', inputValue);
            setUsername(inputValue);
        }
        toast.success(data.message);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername('');
        setInputValue('');
        toast.success('Logged out successfully!');
    };

    return (
        <div>
            {username ? (
                <div className="flex gap-2 justify-center items-center">
                    <div>Hii, {username}</div>
                    <button
                        onClick={handleLogout}
                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : ( 
                <>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAuth}
                        className="ml-2 mt-4 lg:mt-0 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Join
                    </button>
                </>
            )}
        </div>
    );
}
