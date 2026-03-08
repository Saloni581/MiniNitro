export const whiteGlowEffect = () => {
    return <svg viewBox="0 0 200 200" width="200" height="200">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="10" result="blur">
                </feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <circle
            filter="url(#glow)"
            cx="100"
            cy="100"
            r="68"
            fill="white"
        ></circle>
    </svg>
}