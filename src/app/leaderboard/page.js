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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏆 Leaderboard
                </h1>

                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4">Rank</th>
                            <th className="py-3 px-4">Username</th>
                            <th className="py-3 px-4">Match ID</th>
                            <th className="py-3 px-4">Contest Type</th>
                            <th className="py-3 px-4">Total Runs</th>
                            <th className="py-3 px-4">Total Wickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard
                                .sort((a, b) => b.totalRuns - a.totalRuns) // Sort by highest runs
                                .map((user, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3 px-4">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.username}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.matchId}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.contestType === '11-player'
                                                ? '11 Player'
                                                : 'Fab 4'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.totalRuns}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.totalWickets}
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-3 px-4 text-center text-gray-500"
                                >
                                    No leaderboard data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
