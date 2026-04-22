import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { nameplateEffects } from "../../../constants/nameplateEffectsConfig.ts";
import { useState } from "react";
import { toast } from "sonner";
import { updateNameplateEffect } from "../../../api/effects.ts";
import type { ProfileProps } from "../../../types/types.ts";
import NameplateFrame from "@/components/NameplateFrame.tsx";

const NameplateEffects = ({ user, setUser } : ProfileProps) => {
    const prevEffect = user?.visuals?.profileDecoration?.activeEffect;
    const [activeNameplateEffect, setActiveNameplateEffect] = useState(prevEffect);

    const handleApplyEffect = async (id : string) => {
        setActiveNameplateEffect(id);
        if(!user) {
            toast("Login to apply effect");
            return;
        }
        try {
            const res = await updateNameplateEffect(id);
            setUser(res.user);
            toast("Nameplate effect applied successfully!");
        } catch (error) {
            console.error(error);
            toast("Effect could not be applied");
        }
    }

    return (
        <>
            <div className="effects-container">
                <div className="effects-header">
                    <h1 className="font-medium text-xl md:text-2xl">Nameplate Effects</h1>
                    <EffectsDropdown />
                </div>
                <div className="effects-card-container">
                    {
                        nameplateEffects.map(effect => (
                            <div
                                key={effect.id}
                                className={cn("effect-card", { active: activeNameplateEffect === effect.id })}
                            >
                                <NameplateFrame user={user} previewEffectId={effect.id} />
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

export default NameplateEffects;