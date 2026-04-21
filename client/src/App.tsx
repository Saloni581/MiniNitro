import SignUp from "./components/auth/SignUp.tsx";
import SignIn from "./components/auth/SignIn.tsx";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home.tsx";
import {useContext, useEffect, useState} from "react";
import type { UserProfileProps } from '../types/types.ts';
import ProfileForm from "./components/ProfileForm.tsx";
import { fetchUserDetails } from "../api/user.ts";
import ProfileEffects from "./components/effects/ProfileEffects.tsx";
import AvatarEffects from "@/components/effects/AvatarEffects.tsx";
import NameplateEffects from "./components/effects/NameplateEffects.tsx";
import { SocketContext } from "@/components/SocketContext.tsx";
import ChatPage from "@/components/ChatPage.tsx";
import PublicProfile from "@/components/PublicProfile.tsx";
import UserSettings from "@/components/UserSettings.tsx";


const App = () => {

    const [user, setUser] = useState<UserProfileProps | null>(null);
    const connectToSocketContext = useContext(SocketContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fetchUserDetails();
                setUser(user.data);
                connectToSocketContext?.connectToSocket();
            } catch(error) {
                console.log(error);
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    const userProfileDetails = {
        displayName: user?.identity?.displayName,
        pronouns: user?.identity?.pronouns,
        bio: user?.identity?.bio,
    };

    return (
        <>
           <Navbar user={user} />
           <Routes>
               <Route
                   path="/"
                   element={
                       <Home loggedInUser={user} />
                   }
               >
               </Route>

               {/* Profile Routes */}
               <Route
                   path="/profile/:userId"
                   element={
                       <PublicProfile />
                   }
               >
               </Route>
               <Route
                   path="/profile-form"
                   element={
                       <ProfileForm setUser={setUser}/>
                   }
               >
               </Route>
               <Route
                   path="/edit-profile"
                   element={
                       <ProfileForm details={userProfileDetails} setUser={setUser} isEdit={true} />
                   }
               >
               </Route>

               {/* Effects Routes */}
               <Route
                   path="/effects"
                   element={
                       <Navigate to="/profile-effects" replace />
                   }
               >
               </Route>
               <Route
                   path="/profile-effects"
                   element={
                        <ProfileEffects user={user} setUser={setUser} />
                   }
               >
               </Route>
               <Route
                   path="/avatar-effects"
                   element={
                       <AvatarEffects user={user} setUser={setUser}/>
                   }
               >
               </Route>
               <Route
                   path="nameplate-effects"
                   element={
                       <NameplateEffects />
                   }
               >
               </Route>

               {/* Authentication Routes */}
               <Route
                   path="/signup"
                   element={
                        <SignUp setUser={setUser} />
                   }
               >
               </Route>
               <Route
                   path="/signin"
                   element={
                        <SignIn setUser={setUser} />
                   }
               >
               </Route>
               <Route
                    path="/chat/:userId"
                    element={
                        <ChatPage loggedInUser={user} />
                    }
               >
               </Route>
               {/* user settings panel */}
               <Route
                   path="/settings-panel"
                   element={
                        <UserSettings user={user} setUser={setUser} />
                   }
               >
               </Route>
           </Routes>
        </>
    );
};

export default App;