import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { fonts } from "../../../constants/font.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { updateDisplayName } from "../../../api/visuals.ts";
import { toast } from "sonner";

const DisplayNameStyle = ({ user, setUser }: ProfileProps) => {
    const currentColor = user?.visuals?.displayNameStyle?.color ?? "";
    const currentFont = user?.visuals?.displayNameStyle?.font ?? "";
    const currentEffect = user?.visuals?.displayNameStyle?.effect ?? "";

    const [color, setColor] = useState(currentColor);
    const [fontId, setFontId] = useState(currentFont);
    const [effect, setEffect] = useState(currentEffect);

    const handleClick = async () => {
        const res = await updateDisplayName({ color, fontId, effect });
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-lg text-text-primary">Display name style</p>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <p>Color</p>
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
            <div>
                <p>Font style</p>
                <div className="grid md:grid-cols-5 grid-cols-3">
                    {
                        fonts.map(font => (
                            <Button key={font.id} onClick={() => setFontId(font.id)}>
                                <span className={cn(font.font)}>{user?.identity.displayName}</span>
                            </Button>
                        ))
                    }
                </div>
            </div>
            <div>
                <p>Effects</p>
            </div>
            <div>
                <Button onClick={handleClick}>save</Button>
            </div>
        </div>
    );
};

export default DisplayNameStyle;