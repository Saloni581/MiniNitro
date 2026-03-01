// effectsConfig.ts

import {
    FishFrameOverlay,
    GoldenFrameOverlay,
    GoldenWaveFrameOverlay,
    GraphicsParticlesFrameOverlay,
    GreenFrameOverlay,
    WaveFrameOverlay
} from "@/components/effects/ProfileOverlays.tsx";

export const avatarEffects = [
    {
        id: "glow",
        name: "White Glow",
        cssClass: "avatar-glow",
        preview: "./src/assets/avatar-preview/whiteGlow.png",
        price: 200
    },
    {
        id: "overlay",
        name: "Dark Wave",
        component: WaveFrameOverlay,
        preview: "./src/assets/avatar-preview/frame_.gif",
        price: 200
    },
    {
        id: "overlay2",
        name: "Fish",
        component: FishFrameOverlay,
        preview: "./src/assets/avatar-preview/frameFish_.gif",
        price: 200
    },
    {
        id: "overlay3",
        name: "Graphics Particles",
        component: GraphicsParticlesFrameOverlay,
        preview: "./src/assets/avatar-preview/particleGraphicsFrame_.gif",
        price: 200
    },
    {
        id: "overlay4",
        name: "Golden Ring",
        component: GoldenWaveFrameOverlay,
        preview: "./src/assets/avatar-preview/goldenWaveFrame_.gif",
        price: 200
    },
    {
        id: "overlay5",
        name: "Golden Frame",
        component: GoldenFrameOverlay,
        preview: "./src/assets/avatar-preview/goldenFrame_.gif",
        price: 100
    },
    {
        id: "overlay6",
        name: "Green Frame",
        component: GreenFrameOverlay,
        preview: "./src/assets/avatar-preview/greenFrame_.gif",
        price: 100
    },
];