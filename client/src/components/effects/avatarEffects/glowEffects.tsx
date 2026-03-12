export const whiteGlowEffect = () => {
    return (
        <>
            <svg  width="0" height="0" color="white">
                <defs>
                    <filter id="glow" >
                        <feGaussianBlur stdDeviation="10" result="blur"></feGaussianBlur>
                        <feGaussianBlur stdDeviation="6" result="blur2"></feGaussianBlur>
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>
        </>
    )
}