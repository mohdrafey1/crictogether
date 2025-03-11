import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
    {
        matchId: { type: String, required: true },
        username: { type: String, required: true },
        contestType: {
            type: String,
            required: true,
            enum: ['11-player', 'fab-4'],
            default: '11-player',
        },
        players: [
            {
                name: String,
                role: String,
                runs: String,
                wickets: String,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
