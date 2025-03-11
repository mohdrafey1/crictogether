import { connectToDatabase } from '@/lib/db';
import Team from '@/Model/Team';
import { teamSchedule } from '@/utils/teamSchedule';
import { NextResponse } from 'next/server';

// Save or Update Team API (POST)
export async function POST(req) {
    try {
        await connectToDatabase();
        const { matchId, username, contestType, players } = await req.json();

        if (!matchId || !username || !contestType || !players.length) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        if (!['11-player', 'fab-4'].includes(contestType)) {
            return NextResponse.json(
                { message: 'Invalid contest type!' },
                { status: 400 }
            );
        }

        // Get match details
        const match = teamSchedule.find(
            (m) => m.MatchNumber.toString() === matchId
        );
        if (!match) {
            return NextResponse.json(
                { message: 'Match not found!' },
                { status: 404 }
            );
        }

        // Check if the match has started
        const matchStartTime = new Date(match.DateUtc);
        const currentTime = new Date();

        if (currentTime >= matchStartTime) {
            return NextResponse.json(
                { message: 'Match has started! Editing is locked.' },
                { status: 403 }
            );
        }

        // Check if user already has a team in this contest type
        const existingTeam = await Team.findOne({
            matchId,
            username,
            contestType,
        });

        if (existingTeam) {
            // Update existing team
            existingTeam.players = players;
            await existingTeam.save();
            return NextResponse.json(
                { message: 'Team updated successfully!' },
                { status: 200 }
            );
        }

        // Save new team
        await Team.create({
            matchId,
            username,
            contestType,
            players,
        });

        return NextResponse.json(
            { message: 'Team saved successfully!' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error },
            { status: 500 }
        );
    }
}

// Get Teams for a Match & Contest Type (GET)
export async function GET(req) {
    await connectToDatabase();
    const url = new URL(req.url);
    const matchId = url.searchParams.get('matchId');
    const contestType = url.searchParams.get('contest');

    if (!matchId || !contestType) {
        return NextResponse.json(
            { message: 'Match ID and contest type are required' },
            { status: 400 }
        );
    }

    const teams = await Team.find({ matchId, contestType });
    return NextResponse.json({ teams }, { status: 200 });
}
