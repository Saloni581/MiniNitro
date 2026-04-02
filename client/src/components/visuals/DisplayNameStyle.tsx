import { HexColorPicker } from "react-colorful";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";

const DisplayNameStyle = () => {
    const [color, setColor] = useState("");

    return (
        <div>
            <p className="text-lg">Display name style</p>
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
        </div>
    );
};

export default DisplayNameStyle;