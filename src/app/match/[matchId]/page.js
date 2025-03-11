'use client';

import { useParams } from 'next/navigation';
import { teamSchedule } from '@/utils/teamSchedule';
import Link from 'next/link';

export default function ContestPage() {
    const params = useParams();
    const matchId = params.matchId;

    // Find the match details using matchId
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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏆 Select Your Contest
                </h1>

                {/* Match Details */}
                <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 mb-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {match.HomeTeam} 🆚 {match.AwayTeam}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        📅 {new Date(match.DateUtc).toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">📍 {match.Location}</p>
                </div>

                {/* Contest Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* 11 Player Contest */}
                    <Link
                        href={`/match/${matchId}/contest/11-player`}
                        className="block"
                    >
                        <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg border border-gray-200 cursor-pointer text-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                🏏 11 Player Contest
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Pick 11 players from both teams and compete!
                            </p>
                        </div>
                    </Link>

                    {/* Fab 4 Contest */}
                    <Link
                        href={`/match/${matchId}/contest/fab-4`}
                        className="block"
                    >
                        <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg border border-gray-200 cursor-pointer text-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                🌟 Fab 4 Contest
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Pick 4 key players and challenge your friends!
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
