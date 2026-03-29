import { cn } from "@/lib/utils.ts";
import ProfileCard from "@/components/ProfileCard.tsx";
import type { ProfileFrameProps } from "../../types/types.ts";

const ProfileFrame = ({ user, children }: ProfileFrameProps) => {
    const colorPrimary = user?.visuals?.theme?.colors?.primary ?? "";
    const colorAccent = user?.visuals?.theme?.colors?.accent ?? "";

    return (
        <div className="profile-card-container">
            <div className="relative user-profile"
                 style={{
                     "--color-primary": colorPrimary,
                     "--color-accent": colorAccent,
                     background: "color-mix(in srgb, var(--color-primary) 15%, var(--color-brand-black)",
                 } as React.CSSProperties}
            >
                {/* glow layer */}
                <div className={
                    cn("absolute z-0 inset-0 pointer-events-none",
                    )}
                ></div>
                {/* border layer */}
                <div className={
                    cn("absolute z-10 inset-0 pointer-events-none",
                    )}
                ></div>
                {/* content layer */}
                <div className="profile-card absolute inset-0 z-20"
                     style ={{ color: "color-mix(in srgb, var(--color-accent) 20%, var(--color-brand-white)" }}
                >
                    <ProfileCard user={user} />
                    { children }
                </div>
                {/* overlay layer */}
                <div
                    className={
                        cn("absolute z-30 inset-0 pointer-events-none",)
                    }
                ></div>
            </div>
        </div>
    );
};

export default ProfileFrame;