import { connectToDatabase } from '@/lib/db';
import Team from '@/Model/Team';
import { NextResponse } from 'next/server';

// Fetch teams based on match ID & contest type
export async function GET(req) {
    await connectToDatabase();
    const url = new URL(req.url);
    const matchId = url.searchParams.get('matchId');
    const contestType = url.searchParams.get('contestType');

    if (!matchId || !contestType) {
        return NextResponse.json(
            { message: 'Match ID and contest type are required' },
            { status: 400 }
        );
    }

    const teams = await Team.find({ matchId, contestType });
    return NextResponse.json({ teams }, { status: 200 });
}

// Update player scores (runs & wickets)
export async function POST(req) {
    await connectToDatabase();
    const { matchId, username, contestType, players } = await req.json();

    if (!matchId || !username || !contestType || !players.length) {
        return NextResponse.json(
            { message: 'All fields are required' },
            { status: 400 }
        );
    }

    const team = await Team.findOne({ matchId, username, contestType });

    if (!team) {
        return NextResponse.json(
            { message: 'Team not found' },
            { status: 404 }
        );
    }

    // Update scores
    team.players = players;
    await team.save();

    return NextResponse.json(
        { message: 'Scores updated successfully!' },
        { status: 200 }
    );
}
