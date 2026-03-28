import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import colorPickerIcon from "@/assets/color-picker.png";
import {HexColorPicker} from "react-colorful";
import { useState } from "react";

const ThemePicker = () => {
    const [primaryColor, setPrimaryColor] = useState("");
    const [accentColor, setAccentColor] = useState("");

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
        </div>
    );
};

export default ThemePicker;