import EffectsDropdown from "@/components/effects/EffectsDropdown.tsx";

const ProfileEffects = () => {
    return (
        <>
            <div className="effects-container">
                <div className="effects-header">
                    <h1 className="font-medium text-xl md:text-2xl">Profile Effects</h1>
                    <EffectsDropdown />
                </div>
                <div className="effects-card-container">
                </div>
            </div>
        </>
    );
};

export default ProfileEffects;