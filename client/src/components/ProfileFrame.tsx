import { cn } from "@/lib/utils.ts";
import type { ProfileFrameProps } from "../../types/types.ts";
import { profileEffects } from "../../constants/profileEffectConfig.ts";

const ProfileFrame = ({ user, previewEffectId, children }: ProfileFrameProps) => {
    const colorPrimary = user?.visuals?.theme?.colors?.primary ?? 'var(--color-accent-secondary)';
    const colorAccent = user?.visuals?.theme?.colors?.accent ?? 'var(--color-text-primary)';

    const effectId = previewEffectId || user?.visuals?.profileDecoration?.activeEffect;

    const activeEffect = profileEffects.find((effect) => effect.id === effectId);

    return (
        <div className="profile-card-container">
            <div className="relative user-profile"
                 style={{
                     "--color-primary": colorPrimary,
                     "--color-accent": colorAccent,
                     width: previewEffectId && "100px",
                     height: previewEffectId && "100px",
                 } as React.CSSProperties}
            >
                {/* glow layer */}
                <div className={
                    cn("absolute z-0 inset-0 pointer-events-none",
                        (activeEffect && activeEffect.cssGlowClass)
                    )}
                ></div>
                {/* border layer */}
                <div className={
                    cn("absolute z-10 inset-0 pointer-events-none rounded-xl",
                        (activeEffect && activeEffect.cssBorderClass)
                    )}
                ></div>
                {/* content layer */}
                <div className="profile-card absolute inset-0 z-20"
                     style ={{ color: "color-mix(in srgb, var(--color-accent) 30%, var(--color-text-primary)",
                         background: "color-mix(in srgb, var(--color-primary) 50%, var(--color-surface)"
                    }}
                >
                    { children }
                </div>
                {/* overlay layer */}
                <div
                    className={
                        cn("absolute z-30 inset-0 pointer-events-none",
                            (activeEffect && activeEffect.overlay)
                        )}
                ></div>
            </div>
        </div>
    );
};

export default ProfileFrame;