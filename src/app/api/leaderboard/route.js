import { connectToDatabase } from '@/lib/db';
import Team from '@/Model/Team';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch all teams
        const teams = await Team.find();

        // Calculate total runs & wickets per user
        const leaderboard = teams.map((team) => ({
            username: team.username,
            matchId: team.matchId,
            contestType: team.contestType,
            totalRuns: team.players.reduce(
                (sum, player) => sum + (parseInt(player.runs) || 0),
                0
            ),
            totalWickets: team.players.reduce(
                (sum, player) => sum + (parseInt(player.wickets) || 0),
                0
            ),
        }));

        return NextResponse.json({ leaderboard }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error },
            { status: 500 }
        );
    }
}
