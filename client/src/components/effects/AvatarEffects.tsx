import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { avatarEffects } from "../../../constants/effectsConfig.ts";
import { patchAvatarEffect } from "../../../api/effects.ts";
import type { SetUserProps } from "../../../types/types.ts";
import { toast } from "sonner";

const AvatarEffects = ({ setUser }: SetUserProps) => {

    const handleApplyEffect = async (id : string) => {
        try {
            const res = await patchAvatarEffect(id);
            setUser(res.user);
            toast("Avatar effect applied successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <EffectsDropdown />
            <div className="avatar-effects-container">
                <h1>Avatar Effects</h1>
                <div className="avatar-effect-card-container">
                    <div className="avatar-effect-button">
                        {
                            avatarEffects.map(effect => (
                                <div className="avatar-effect-card">
                                    <img
                                        src={effect.preview}
                                        key={effect.id}
                                        alt="Effect Preview"
                                        className="rounded-4xl"
                                    />
                                    <Button
                                        key={effect.id}
                                        onClick={() => handleApplyEffect(effect.id)}
                                    >
                                        <span className="text-wrap">{effect.name}</span>
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvatarEffects;