import { cn } from "@/lib/utils.ts";
import ProfileCard from "@/components/ProfileCard.tsx";
import type { ProfileFrameProps } from "../../types/types.ts";

const ProfileFrame = ({ user, children }: ProfileFrameProps) => {
    return (
        <div className="profile-card-container">
            <div className="relative user-profile">
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
                <div className="profile-card absolute inset-0 z-20">
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