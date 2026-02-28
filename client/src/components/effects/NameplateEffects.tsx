import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";
import {Button} from "@/components/ui/button.tsx";

const NameplateEffects = () => {
    return (
        <>
            <EffectsDropdown />
            <div>
                Nameplate Effects
                <Button>
                    glow effect - apply it rn!!!!
                </Button>
            </div>
        </>
    );
};

export default NameplateEffects;