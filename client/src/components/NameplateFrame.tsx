import { cn } from "@/lib/utils.ts";
import type { NamePlateFrameProps } from "../../types/types.ts";
import { nameplateEffects } from "../../constants/nameplateEffectsConfig.ts";

const NameplateFrame = ({ user, children, previewEffectId } : NamePlateFrameProps) => {
    const effectId = previewEffectId || user?.visuals?.nameplate?.activeEffect;
    const activeEffect = nameplateEffects.find((effect) => effect.id === effectId);

    return (
        <div className={cn(previewEffectId && "relative w-60 h-16")}>
            {/* glow layer */}
            <div className={
                cn("absolute z-0 inset-0 pointer-events-none rounded-xl",
                    (activeEffect && activeEffect.cssGlowClass)
                )}
            ></div>
            {/* border layer */}
            <div className={
                cn("absolute z-10 inset-0 pointer-events-none rounded-xl",
                    (activeEffect && activeEffect.cssBorderClass)
                )}
            ></div>
            <div className="relative z-20">
                { children }
            </div>
            {/* overlay layer */}
            <div
                className={
                    cn("absolute z-30 inset-0 pointer-events-none rounded-xl",
                        (activeEffect && activeEffect.overlay)
                    )
                }
            ></div>
        </div>
    );
};

export default NameplateFrame;