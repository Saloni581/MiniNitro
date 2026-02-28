// effectsConfig.ts

import {
    FishFrameOverlay,
    GoldenFrameOverlay,
    GoldenWaveFrameOverlay,
    GraphicsParticlesFrameOverlay,
    GreenFrameOverlay,
    WaveFrameOverlay
} from "@/components/ProfileOverlay.tsx";


export const avatarEffects = [
    {
        id: "glow",
        name: "White Glow",
        cssClass: "avatar-glow",
        preview: "/effects/gold-preview.png",
        price: 200
    },
    {
        id: "overlay",
        name: "Wave",
        component: WaveFrameOverlay,
        preview: "/effects/gold-preview.png",
        price: 200
    },
    {
        id: "overlay2",
        name: "Fish",
        component: FishFrameOverlay,
        preview: "/effects/gold-preview.png",
    price
:
200
},
    {
        id: "overlay3",
        name: "Graphics Particles",
        component: GraphicsParticlesFrameOverlay,
        preview: "/effects/gold-preview.png",
        price: 200
    },
    {
        id: "overlay4",
        name: "Golden Ring",
        component: GoldenWaveFrameOverlay,
        preview: "/effects/gold-preview.png",
        price: 200
    },
    {
        id: "overlay5",
        name: "Golden Frame",
        component: GoldenFrameOverlay,
        preview: "/effects/fire-preview.png",
        price: 100
    },
    {
        id: "overlay6",
        name: "Green Frame",
        component: GreenFrameOverlay,
        preview: "/effects/fire-preview.png",
        price: 100
    },
];