import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { avatarEffects } from "../../../constants/effectsConfig.ts";
import { updateAvatarEffect } from "../../../api/effects.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { toast } from "sonner";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";

const AvatarEffects = ({ user, setUser }: ProfileProps) => {

    const handleApplyEffect = async (id : string) => {
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
            <EffectsDropdown />
            <div className="avatar-effects-container">
                <h1>Avatar Effects</h1>
                    <div className="avatar-effects-card-container">
                        {
                            avatarEffects.map(effect => (
                                <div className="avatar-effect-card">
                                    <UserAvatar user={user} previewEffectId={effect.id} size="md" isChatWindow={false} />
                                    <Button
                                        key={effect.id}
                                        onClick={() => handleApplyEffect(effect.id)}
                                        className="mt-6"
                                    >
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