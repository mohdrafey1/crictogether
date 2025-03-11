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
            <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
                Match not found! ⚠️
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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏏 {contestType === 'fab-4' ? 'Fab 4' : '11 Player'} Contest
                    - Select Your Team
                </h1>

                {/* Display available players */}
                <div className="grid gap-6">
                    {availableTeams.map((team) => (
                        <div
                            key={team.team_name}
                            className="bg-white shadow-md p-6 rounded-lg"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">
                                {team.team_name}
                            </h2>
                            <ul>
                                {team.players.map((player) => (
                                    <li key={player.name}>
                                        <input
                                            type="checkbox"
                                            checked={selectedPlayers.some(
                                                (p) => p.name === player.name
                                            )}
                                            onChange={() =>
                                                handlePlayerSelect(player)
                                            }
                                        />{' '}
                                        {player.name} ({player.role})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
                >
                    ✅ Save Team
                </button>
            </div>
        </div>
    );
}
