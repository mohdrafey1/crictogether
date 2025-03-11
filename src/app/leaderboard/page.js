'use client';

import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            setLeaderboard(data.leaderboard);
        }
        fetchLeaderboard();
    }, []);

    // Filter leaderboard data by contest type
    const elevenPlayerLeaderboard = leaderboard
        .filter((user) => user.contestType === '11-player')
        .sort((a, b) => b.totalRuns - a.totalRuns); // Sort by highest runs

    const fab4Leaderboard = leaderboard
        .filter((user) => user.contestType === 'fab-4')
        .sort((a, b) => b.totalRuns - a.totalRuns); // Sort by highest runs

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="mt-16 text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    🏆 Leaderboard
                </h1>

                {/* 11 Player Contest Table */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mb-8">
                    <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 py-4">
                        11 Player Contest Leaderboard
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-sky-600 dark:bg-sky-700 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left">
                                        Rank
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Username
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Match ID
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Total Runs
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Total Wickets
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {elevenPlayerLeaderboard.length > 0 ? (
                                    elevenPlayerLeaderboard.map(
                                        (user, index) => (
                                            <tr
                                                key={index}
                                                className={`${
                                                    index % 2 === 0
                                                        ? 'bg-gray-50 dark:bg-gray-700'
                                                        : 'bg-white dark:bg-gray-800'
                                                } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`}
                                            >
                                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                    {index + 1}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                    {user.username}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                    {user.matchId}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                    {user.totalRuns}
                                                </td>
                                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                    {user.totalWickets}
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-4 px-6 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No data available for 11 Player
                                            Contest.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fab 4 Contest Table */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                    <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 py-4">
                        Fab 4 Contest Leaderboard
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-sky-600 dark:bg-sky-700 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left">
                                        Rank
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Username
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Match ID
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Total Runs
                                    </th>
                                    <th className="py-4 px-6 text-left">
                                        Total Wickets
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {fab4Leaderboard.length > 0 ? (
                                    fab4Leaderboard.map((user, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? 'bg-gray-50 dark:bg-gray-700'
                                                    : 'bg-white dark:bg-gray-800'
                                            } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`}
                                        >
                                            <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                {user.username}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                {user.matchId}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                {user.totalRuns}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                                {user.totalWickets}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-4 px-6 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No data available for Fab 4 Contest.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
