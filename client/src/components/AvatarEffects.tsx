import EffectsDropdown from "@/components/EffectsDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { avatarEffects } from "../../effectsConfig.ts";
import { patchAvatarEffect } from "../../api/effects.ts";
import type { SetUserProps } from "../../types.ts";

const AvatarEffects = ({ setUser }: SetUserProps) => {

    const handleApplyEffect = async (id : string) => {
        try {
            const res = await patchAvatarEffect(id);
            console.log(res.user);
            setUser(res.user);
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
                    {/*{*/}
                    {/*    avatarEffects.map(effect => (*/}
                    {/*        <img src={effect.preview} key={effect.id} alt="Effect Preview" />*/}
                    {/*    ))*/}
                    {/*}*/}
                    <div className="avatar-effect-button">
                        {
                            avatarEffects.map(effect => (
                                <Button
                                    key={effect.id}
                                    onClick={() => handleApplyEffect(effect.id)}
                                >
                                    <span className="text-wrap">{effect.name}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvatarEffects;