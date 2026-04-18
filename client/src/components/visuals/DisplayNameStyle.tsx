import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { fonts } from "../../../constants/font.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { updateDisplayNameStyle, removeDisplayNameStyle } from "../../../api/visuals.ts";
import { toast } from "sonner";

const DisplayNameStyle = ({ user, setUser }: ProfileProps) => {
    const currentColor = user?.visuals?.displayNameStyle?.color ?? "";
    const currentFont = user?.visuals?.displayNameStyle?.font ?? "";
    const currentEffect = user?.visuals?.displayNameStyle?.effect ?? "";

    const [color, setColor] = useState(currentColor);
    const [fontId, setFontId] = useState(currentFont);
    // @ts-ignore
    const [effect, setEffect] = useState(currentEffect);

    const handleUpdateDisplayNameStyle = async () => {
        const res = await updateDisplayNameStyle({ color, fontId, effect });
        setUser(res.user);
        toast(res.message);
    }

    const handleRemoveDisplayNameStyle = async () => {
        const res = await removeDisplayNameStyle();
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div className="flex flex-col gap-2">
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <p className="options-heading">Color</p>
                            <Button
                                variant="outline"
                                style={{ backgroundColor: color }}
                                className="w-12 flex justify-end">
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <HexColorPicker color={color} onChange={setColor} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-2">
                <p className="options-heading">Font style</p>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                    {
                        fonts.map(font => (
                            <Button
                                key={font.id}
                                onClick={() => setFontId(font.id)}
                                className={cn("btn-ghost", { active: fontId === font.id })}
                            >
                                <span className={cn(font.font)}>{user?.identity.displayName}</span>
                            </Button>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="options-heading">Effects</p>
                <p>Coming soon...</p>
            </div>
            <div className="flex flex-col gap-2">
                <Button
                    onClick={handleUpdateDisplayNameStyle}
                    className="btn-primary"
                >Save styles</Button>
                <Button
                    onClick={handleRemoveDisplayNameStyle}
                    className="btn-ghost"
                >Remove styles</Button>
            </div>
        </div>
    );
};

export default DisplayNameStyle;