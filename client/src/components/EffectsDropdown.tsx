// import React from 'react';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"

const EffectsDropdown = () => {
    return (
        <div className="all-effects-container">
            <div className="effects-dropdown">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>Select Effects</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                <Link to='/profile-effects'>
                                    Profile Effects
                                </Link>
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link to='/avatar-effects'>
                                    Avatar Effects
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to='/nameplate-effects'>
                                    Nameplate Effects
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default EffectsDropdown;