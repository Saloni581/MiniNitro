import React from 'react';
import {cn} from "@/lib/utils.ts";


type NamePlateFrameProps = {
    children?: React.ReactNode;
}

const NameplateFrame = ({ children } : NamePlateFrameProps) => {
    return (
        <div>
            {/* glow layer */}
            <div className={
                cn("absolute z-0 -inset-4 pointer-events-none bg-white ",
                )}
            ></div>
            {/* border layer */}
            <div className={
                cn("absolute z-10 inset-0 pointer-events-none bg-accent-secondary",
                )}
            ></div>
            { children }
            {/* overlay layer */}
            <div
                className={
                    cn("absolute z-30 inset-0 pointer-events-none")
                }
            ></div>
        </div>
    );
};

export default NameplateFrame;