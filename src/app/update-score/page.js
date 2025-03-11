'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateScoresPage() {
    const [matchId, setMatchId] = useState('');
    const [contestType, setContestType] = useState('11-player');
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeams = async () => {
        if (!matchId) {
            toast.error('Enter Match ID');
            return;
        }

        setLoading(true);
        const res = await fetch(
            `/api/scores?matchId=${matchId}&contestType=${contestType}`
        );
        const data = await res.json();
        setTeams(data.teams || []);
        setLoading(false);
    };

    const updateScores = async (username) => {
        const team = teams.find((t) => t.username === username);
        const res = await fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                matchId,
                username,
                contestType,
                players: team.players,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success('Scores updated!');
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏏 Update Player Scores
                </h1>

                {/* Match ID Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Match ID:</label>
                    <input
                        type="text"
                        value={matchId}
                        onChange={(e) => setMatchId(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="Enter Match ID"
                    />
                </div>

                {/* Contest Type Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700">Contest Type:</label>
                    <select
                        value={contestType}
                        onChange={(e) => setContestType(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    >
                        <option value="11-player">11 Player</option>
                        <option value="fab-4">Fab 4</option>
                    </select>
                </div>

                {/* Fetch Teams Button */}
                <button
                    onClick={fetchTeams}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-6"
                >
                    {loading ? 'Fetching...' : 'Fetch Teams'}
                </button>

                {/* Display Teams */}
                {teams.length > 0 && (
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            🏆 Teams
                        </h2>
                        {teams.map((team) => (
                            <div
                                key={team.username}
                                className="mb-6 border p-4 rounded"
                            >
                                <h3 className="text-lg font-bold">
                                    {team.username}
                                </h3>
                                <p className="text-gray-500">
                                    Match ID: {team.matchId}
                                </p>
                                <p className="text-gray-500">
                                    Contest Type: {team.contestType}
                                </p>

                                {/* Update Scores */}
                                <table className="w-full mt-4 border">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="p-2">Player</th>
                                            <th className="p-2">Runs</th>
                                            <th className="p-2">Wickets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.players.map((player, index) => (
                                            <tr
                                                key={index}
                                                className="border-t"
                                            >
                                                <td className="p-2">
                                                    {player.name} ({player.role}
                                                    )
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={player.runs}
                                                        onChange={(e) => {
                                                            const newTeams = [
                                                                ...teams,
                                                            ];
                                                            newTeams.find(
                                                                (t) =>
                                                                    t.username ===
                                                                    team.username
                                                            ).players[
                                                                index
                                                            ].runs =
                                                                e.target.value;
                                                            setTeams(newTeams);
                                                        }}
                                                        className="border p-1 w-16 text-center"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={player.wickets}
                                                        onChange={(e) => {
                                                            const newTeams = [
                                                                ...teams,
                                                            ];
                                                            newTeams.find(
                                                                (t) =>
                                                                    t.username ===
                                                                    team.username
                                                            ).players[
                                                                index
                                                            ].wickets =
                                                                e.target.value;
                                                            setTeams(newTeams);
                                                        }}
                                                        className="border p-1 w-16 text-center"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Update Scores Button */}
                                <button
                                    onClick={() => updateScores(team.username)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                                >
                                    Update Scores
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
