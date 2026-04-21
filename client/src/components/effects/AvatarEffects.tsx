import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { avatarEffects } from "../../../constants/effectsConfig.ts";
import { updateAvatarEffect } from "../../../api/effects.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { toast } from "sonner";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import { useState } from "react";
import { cn } from "@/lib/utils.ts";

const AvatarEffects = ({ user, setUser }: ProfileProps) => {
    const prevEffect = user?.visuals?.avatar?.decorations?.activeEffect;
    const [activeEffect, setActiveEffect] = useState(prevEffect);

    const handleApplyEffect = async (id : string) => {
        setActiveEffect(id);
        if(!user) {
            toast("Login to apply effect");
            return;
        }
        try {
            const res = await updateAvatarEffect(id);
            setUser(res.user);
            toast("Avatar effect applied successfully!");
        } catch (error) {
            console.error(error);
            toast("Effect could not be applied");
        }
    }

    return (
        <>
            <div className="effects-container">
                <div className="effects-header">
                    <h1 className="font-medium text-xl md:text-2xl">Avatar Effects</h1>
                    <EffectsDropdown />
                </div>
                <div className="effects-card-container">
                    {
                        avatarEffects.map(effect => (
                            <div
                                key={effect.id}
                                className={cn("effect-card", { active: activeEffect === effect.id })}
                            >
                                <UserAvatar user={user} previewEffectId={effect.id} size="md" avatarEffect={true} />
                                <Button onClick={() => handleApplyEffect(effect.id)}>
                                    <span className="text-wrap">{effect.name}</span>
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default AvatarEffects;