import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import colorPickerIcon from "@/assets/color-picker.png";
import {HexColorPicker} from "react-colorful";
import { useState} from "react";
import {updateProfileTheme} from "../../../api/visuals.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { toast } from "sonner";

const ThemePicker = ({ user, setUser }: ProfileProps) => {
    const currentPrimaryColor = user?.visuals?.theme?.colors?.primary ?? "";
    const currentAccentColor = user?.visuals?.theme?.colors?.accent ?? "";
    const [primaryColor, setPrimaryColor] = useState(currentPrimaryColor);
    const [accentColor, setAccentColor] = useState(currentAccentColor);

    const handleProfileTheme = async () => {
        const res = await updateProfileTheme({ primary: primaryColor, accent: accentColor });
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div>
            <p className="text-lg">Pick theme</p>
            <div className="flex gap-2">
                {/* primary color */}
                <div>
                    <p>Primary</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" style={{ backgroundColor: primaryColor }} className="w-24 flex justify-end">
                                <img src={colorPickerIcon} alt="color picker icon" width={20} height={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                        </PopoverContent>
                    </Popover>
                </div>
                {/* accent color */}
                <div>
                    <p>Accent</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" style={{ backgroundColor: accentColor }} className="w-24 flex justify-end">
                                <img src={colorPickerIcon} alt="color picker icon" width={20} height={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <HexColorPicker color={accentColor} onChange={setAccentColor} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="mt-2">
                <button onClick={handleProfileTheme}>Save</button>
            </div>
        </div>
    );
};

export default ThemePicker;