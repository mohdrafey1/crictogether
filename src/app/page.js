'use client';

import { teamSchedule } from '@/utils/teamSchedule';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [formattedMatches, setFormattedMatches] = useState([]);

    useEffect(() => {
        const formattedData = teamSchedule.map((match) => ({
            ...match,
            formattedDate: new Date(match.DateUtc).toLocaleString(undefined, {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));
        setFormattedMatches(formattedData);
    }, []);

    return (
        <div className="min-h-screen bg-indigo-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="mt-14 p-6 sm:max-w-4/5 mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    🏏 Upcoming Matches
                </h1>

                <div className="grid gap-6 lg:grid-cols-2">
                    {formattedMatches.map((match) => (
                        <Link
                            key={match.MatchNumber}
                            href={`/match/${match.MatchNumber}`}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition p-6 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                                <h1 className="text-2xl text-center text-indigo-600 dark:text-indigo-400">
                                    Match {match.MatchNumber}
                                </h1>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                    {match.HomeTeam} 🆚 {match.AwayTeam}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                    📅 {match.formattedDate}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    📍 {match.Location}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
