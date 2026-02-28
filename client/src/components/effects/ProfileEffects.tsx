import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import {Button} from "@/components/ui/button.tsx";

const ProfileEffects = () => {
    return (
        <>
            <EffectsDropdown />
            <div>
                Profile Effects
                <Button>
                    glow effect - apply it rn!!!!
                </Button>
            </div>
        </>
    );
};

export default ProfileEffects;