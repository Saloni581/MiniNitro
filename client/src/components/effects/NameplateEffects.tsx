import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";

const NameplateEffects = () => {
    return (
        <>
            <div className="effects-container">
                <div className="effects-header">
                    <h1 className="font-medium text-xl md:text-2xl">Nameplate Effects</h1>
                    <EffectsDropdown />
                </div>
                <div className="effects-card-container">
                </div>
            </div>
        </>
    );
};

export default NameplateEffects;