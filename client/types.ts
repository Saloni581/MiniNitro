export interface User {
    userName: string;
    email: string;
}

export interface SetUserProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface NavbarProps {
    user: User | null;
}

export interface ProfileProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface ProfileDetailsProps {
    displayName: string;
    pronouns: string;
    bio: string;
}