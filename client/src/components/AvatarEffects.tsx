import EffectsDropdown from "@/components/EffectsDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";

// axios calls

const AvatarEffects = () => {
    return (
        <>
            <EffectsDropdown />
            <div>
                Avatar Effects
                <Button>
                    glow effect - apply it rn!!!!
                </Button>
            </div>
        </>
    );
};

export default AvatarEffects;