import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const UserProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        premium: {
            isActive: { type: Boolean, default: false },
            enabledAt: { type: Date },
            expiresAt: { type: Date }
        },

        identity: {
            displayName: { type: String, required: true },
            pronouns: { type: String },
            bio: { type: String }
        },

        visuals: {
            displayNameStyle: {
                font: { type: String },
                color: { type: String },
                effects: [{ type: String }],
                isEnabled: { type: Boolean, default: false }
            },

            avatar: {
                activeAssetId: {
                    url: { type: String },
                    public_id: { type: String },
                },
                recentAssets: [{ type: String }],
                decorations: {
                    activeEffect: { type: String, default: null },
                    ownedEffects: [{ type: String, default: [] }]
                }
            },

            nameplate: {
                isEnabled: { type: Boolean, default: false },
                activeEffects: [{ type: String }],
                ownedEffects: [{ type: String }]
            },

            profileDecoration: {
                isEnabled: { type: Boolean, default: false },
                activeEffects: [{ type: String }],
                ownedEffects: [{ type: String }]
            },

            profileBanner: {
                isEnabled: { type: Boolean, default: false },
                assetId: { type: String }
            },

            theme: {
                isEnabled: { type: Boolean, default: false },
                colors: {
                    primary: { type: String },
                    accent: { type: String }
                }
            }
        }
    },
    { timestamps: true }
);

export default mongoose.model("UserProfile", UserProfileSchema);
