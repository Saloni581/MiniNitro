import Lottie from "lottie-react";
import profileFrame from "@/assets/frame.json";
import fishFrame from "@/assets/frameFish.json";
import graphicsParticlesFrame from "@/assets/particleGraphicsFrame.json";
import goldenWaveFrame from "@/assets/goldenWaveFrame.json";
import goldenFrame from "@/assets/goldenframe.json";
import greenFrame from "@/assets/greenFrame.json";

export const WaveFrameOverlay = () => {
    return (
        <Lottie animationData={profileFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}

export const FishFrameOverlay = () => {
    return (
        <Lottie animationData={fishFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}

export const GraphicsParticlesFrameOverlay = () => {
    return (
        <Lottie animationData={graphicsParticlesFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}

export const GoldenWaveFrameOverlay = () => {
    return (
        <Lottie animationData={goldenWaveFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}

export const GoldenFrameOverlay = () => {
    return (
        <Lottie animationData={goldenFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}

export const GreenFrameOverlay = () => {
    return (
        <Lottie animationData={greenFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}


