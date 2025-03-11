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
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="mt-16 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    🏏 Update Player Scores
                </h1>

                {/* Match ID Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Match ID:
                    </label>
                    <input
                        type="text"
                        value={matchId}
                        onChange={(e) => setMatchId(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        placeholder="Enter Match ID"
                    />
                </div>

                {/* Contest Type Dropdown */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Contest Type:
                    </label>
                    <select
                        value={contestType}
                        onChange={(e) => setContestType(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option value="11-player">11 Player</option>
                        <option value="fab-4">Fab 4</option>
                    </select>
                </div>

                {/* Fetch Teams Button */}
                <button
                    onClick={fetchTeams}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-full mb-8 transition-colors duration-300"
                >
                    {loading ? 'Fetching...' : 'Fetch Teams'}
                </button>

                {/* Display Teams */}
                {teams.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                            🏆 Teams
                        </h2>
                        {teams.map((team) => (
                            <div
                                key={team.username}
                                className="mb-6 border border-gray-200 dark:border-gray-700 p-6 rounded-lg"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {team.username}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Match ID: {team.matchId}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Contest Type: {team.contestType}
                                </p>

                                {/* Update Scores Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px] mt-4">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">
                                                    Player
                                                </th>
                                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">
                                                    Runs
                                                </th>
                                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">
                                                    Wickets
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {team.players.map(
                                                (player, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-t border-gray-200 dark:border-gray-700"
                                                    >
                                                        <td className="p-3 text-gray-700 dark:text-gray-300">
                                                            {player.name} (
                                                            {player.role})
                                                        </td>
                                                        <td className="p-3">
                                                            <input
                                                                type="number"
                                                                value={
                                                                    player.runs
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newTeams =
                                                                        [
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
                                                                    setTeams(
                                                                        newTeams
                                                                    );
                                                                }}
                                                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-20 text-center dark:bg-gray-700 dark:text-gray-100"
                                                            />
                                                        </td>
                                                        <td className="p-3">
                                                            <input
                                                                type="number"
                                                                value={
                                                                    player.wickets
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newTeams =
                                                                        [
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
                                                                    setTeams(
                                                                        newTeams
                                                                    );
                                                                }}
                                                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-20 text-center dark:bg-gray-700 dark:text-gray-100"
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Update Scores Button */}
                                <button
                                    onClick={() => updateScores(team.username)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-4 transition-colors duration-300"
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
