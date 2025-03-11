'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { teamSchedule } from '@/utils/teamSchedule';

export default function ContestPage() {
    const params = useParams();
    const { matchId, contest } = params;
    const username =
        typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    const [participatedUsers, setParticipatedUsers] = useState([]);
    const [myTeam, setMyTeam] = useState(null);
    const [isMatchStarted, setIsMatchStarted] = useState(false);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch(
                    `/api/team?matchId=${matchId}&contest=${contest}`
                );
                const data = await res.json();

                if (res.ok && data.teams) {
                    setParticipatedUsers(data.teams);
                    setMyTeam(
                        data.teams.find((team) => team.username === username) ||
                            null
                    );
                } else {
                    setParticipatedUsers([]);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
                setParticipatedUsers([]);
            }
        }

        fetchTeams();

        // Check if the match has started
        const match = teamSchedule.find(
            (m) => m.MatchNumber.toString() === matchId
        );
        if (match) {
            const matchStartTime = new Date(match.DateUtc);
            setIsMatchStarted(new Date() >= matchStartTime);
        }
    }, [matchId, contest, username]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    🏆{' '}
                    {contest === '11-player'
                        ? '11 Player Contest'
                        : 'Fab 4 Contest'}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Participated Users Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            📋 Participated Users
                        </h2>
                        {participatedUsers.length > 0 ? (
                            <ul className="space-y-2">
                                {participatedUsers.map((team, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        <span className="font-medium">
                                            {team.username}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                No participants yet.
                            </p>
                        )}
                    </div>

                    {/* Your Team Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            👤 Your Team
                        </h2>
                        {myTeam ? (
                            <>
                                <ul className="space-y-2">
                                    {myTeam.players.map((player, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            <span className="font-medium">
                                                {player.name}
                                            </span>{' '}
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ({player.role})
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                {!isMatchStarted && (
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/match/${matchId}/contest/${contest}/create`)
                                        }
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 transition-colors duration-300"
                                    >
                                        ✏️ Edit Team
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() =>
                                    (window.location.href = `/match/${matchId}/contest/${contest}/create`)
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4 transition-colors duration-300"
                            >
                                ➕ Create Team
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
