'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Auth from './Auth';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    🏏 Cricket App
                </h2>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        href="update-score"
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                        Update Score
                    </Link>
                    <Link
                        href="leaderboard"
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                        Leaderboard
                    </Link>
                    <Auth />
                </nav>

                {/* Dark Mode Toggle and Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? (
                            <FaSun className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <FaMoon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <FaTimes className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                            <FaBars className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 md:hidden flex flex-col items-start p-6 space-y-6 z-50`}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="self-end p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close Menu"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                    Home
                </Link>
                <Link
                    href="update-score"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                    Update Score
                </Link>
                <Link
                    href="leaderboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                    Leaderboard
                </Link>
                <Auth />
            </nav>
        </header>
    );
};

export default Header;
