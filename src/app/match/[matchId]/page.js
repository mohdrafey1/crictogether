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

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    🏆 Select Your Contest
                </h1>

                {/* Match Details Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {match.HomeTeam} 🆚 {match.AwayTeam}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        📅 {new Date(match.DateUtc).toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        📍 {match.Location}
                    </p>
                </div>

                {/* Contest Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* 11 Player Contest */}
                    <Link
                        href={`/match/${matchId}/contest/11-player`}
                        className="block"
                    >
                        <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer text-center transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                🏏 11 Player Contest
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Pick 11 players from both teams and compete!
                            </p>
                        </div>
                    </Link>

                    {/* Fab 4 Contest */}
                    <Link
                        href={`/match/${matchId}/contest/fab-4`}
                        className="block"
                    >
                        <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer text-center transform hover:scale-105 transition-transform duration-300">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                🌟 Fab 4 Contest
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Pick 4 key players and challenge your friends!
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
