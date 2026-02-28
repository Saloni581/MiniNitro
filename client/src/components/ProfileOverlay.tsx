import Lottie from "lottie-react";
import profileFrame from "@/assets/frame.json";

export const WaveFrameOverlay = () => {
    return (
        <Lottie animationData={profileFrame} loop={true} autoplay={true} className="avatar-wave-overlay"/>
    );
}