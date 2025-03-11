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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏆{' '}
                    {contest === '11-player'
                        ? '11 Player Contest'
                        : 'Fab 4 Contest'}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Participated Users */}
                    <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            📋 Participated Users
                        </h2>
                        {participatedUsers.length > 0 ? (
                            <ul className="list-disc ml-5">
                                {participatedUsers.map((team, index) => (
                                    <li key={index} className="text-gray-700">
                                        {team.username}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                No participants yet.
                            </p> // ✅ Handle empty state
                        )}
                    </div>

                    {/* Your Team */}
                    <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            👤 Your Team
                        </h2>
                        {myTeam ? (
                            <>
                                <ul>
                                    {myTeam.players.map((player, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700"
                                        >
                                            {player.name} ({player.role})
                                        </li>
                                    ))}
                                </ul>
                                {!isMatchStarted && (
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/match/${matchId}/contest/${contest}/create`)
                                        }
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
                                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
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
