import { connectToDatabase } from '@/lib/db';
import User from '@/Model/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDatabase();
        const { username } = await req.json();

        if (!username) {
            return NextResponse.json(
                { message: 'Username is required' },
                { status: 400 }
            );
        }

        let user = await User.findOne({ username });

        if (!user) {
            user = await User.create({ username });
        }

        return NextResponse.json(
            { message: 'User created or already exists', user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error },
            { status: 500 }
        );
    }
}
