import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { profileEffects } from "../../../constants/profileEffectConfig.ts";
import { useState } from "react";
import { toast } from "sonner";
import { updateProfileEffect } from "../../../api/effects.ts";
import type { ProfileProps } from "../../../types/types.ts";
import ProfileFrame from "@/components/ProfileFrame.tsx";

const ProfileEffects = ({ user, setUser } : ProfileProps) => {
    const prevEffect = user?.visuals?.profileDecoration?.activeEffect;
    const [activeProfileEffect, setActiveProfileEffect] = useState(prevEffect);

    const handleApplyEffect = async (id : string) => {
        setActiveProfileEffect(id);
        if(!user) {
            toast("Login to apply effect");
            return;
        }
        try {
            const res = await updateProfileEffect(id);
            setUser(res.user);
            toast("Profile effect applied successfully!");
        } catch (error) {
            console.error(error);
            toast("Effect could not be applied");
        }
    }

    return (
        <>
            <div className="effects-container">
                <div className="effects-header">
                    <h1 className="font-medium text-xl md:text-2xl">Profile Effects</h1>
                    <EffectsDropdown />
                </div>
                <div className="effects-card-container">
                    {
                        profileEffects.map(effect => (
                            <div
                                key={effect.id}
                                className={cn("effect-card", { active: activeProfileEffect === effect.id })}
                            >
                                <ProfileFrame user={user} previewEffectId={effect.id} />
                                <Button onClick={() => handleApplyEffect(effect.id)} className="btn-primary" >
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

export default ProfileEffects;