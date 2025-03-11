'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { playerList } from '@/utils/playerList';
import { teamSchedule } from '@/utils/teamSchedule';
import toast from 'react-hot-toast';

export default function CreateTeamPage() {
    const params = useParams();
    const matchId = params.matchId;
    const contestType = params.contest;
    const username =
        typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    const router = useRouter();

    // Get the current match details
    const match = teamSchedule.find(
        (m) => m.MatchNumber.toString() === matchId
    );

    if (!match) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
                        Match not found! ⚠️
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Please check the match ID and try again.
                    </p>
                </div>
            </div>
        );
    }

    const { HomeTeam, AwayTeam } = match;

    // Filter players from only the two playing teams
    const availableTeams = playerList.teams.filter(
        (team) => team.team_name === HomeTeam || team.team_name === AwayTeam
    );

    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // Set selection limits based on contest type
    const minPlayers = contestType === 'fab-4' ? 4 : 11;
    const maxPlayers = contestType === 'fab-4' ? 4 : 11;

    const handlePlayerSelect = (player) => {
        if (selectedPlayers.some((p) => p.name === player.name)) {
            setSelectedPlayers(
                selectedPlayers.filter((p) => p.name !== player.name)
            );
        } else {
            if (selectedPlayers.length < maxPlayers) {
                setSelectedPlayers([...selectedPlayers, player]);
            } else {
                toast.error(`You can only select ${maxPlayers} players!`);
            }
        }
    };

    const handleSubmit = async () => {
        if (
            selectedPlayers.length < minPlayers ||
            selectedPlayers.length > maxPlayers
        ) {
            toast.error(`You must select exactly ${minPlayers} players!`);
            return;
        }

        const res = await fetch('/api/team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                matchId,
                username,
                contestType,
                players: selectedPlayers,
            }),
        });

        if (res.ok) {
            toast.success('Team saved successfully!');
            router.push(`/match/${matchId}/contest/${contestType}`);
        } else {
            const data = await res.json();
            toast.error(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    🏏 {contestType === 'fab-4' ? 'Fab 4' : '11 Player'} Contest
                    - Select Your Team
                </h1>

                {/* Display available players */}
                <div className="grid gap-6">
                    {availableTeams.map((team) => (
                        <div
                            key={team.team_name}
                            className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                {team.team_name}
                            </h2>
                            <ul className="space-y-2">
                                {team.players.map((player) => (
                                    <li
                                        key={player.name}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPlayers.some(
                                                (p) => p.name === player.name
                                            )}
                                            onChange={() =>
                                                handlePlayerSelect(player)
                                            }
                                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {player.name}{' '}
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ({player.role})
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Save Team Button */}
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg mt-6 w-full text-lg font-semibold transition-colors duration-300"
                >
                    ✅ Save Team
                </button>
            </div>
        </div>
    );
}
