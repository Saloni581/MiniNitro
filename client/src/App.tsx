import SignUp from "./components/auth/SignUp.tsx";
import SignIn from "./components/auth/SignIn.tsx";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home.tsx";
import ProfileCard from "./components/ProfileCard.tsx";
import { useEffect, useState } from "react";
import type { UserProfileProps } from '../types/types.ts';
import ProfileForm from "./components/ProfileForm.tsx";
import { fetchUserDetails } from "../api/user.ts";
import ProfileEffects from "./components/effects/ProfileEffects.tsx";
import AvatarEffects from "@/components/effects/AvatarEffects.tsx";
import NameplateEffects from "./components/effects/NameplateEffects.tsx";


const App = () => {

    const [user, setUser] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fetchUserDetails();
                setUser(user.data);
            } catch(error) {
                console.log(error);
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    return (
        <>
           <Navbar user={user} />
           <Routes>
               <Route
                   path="/"
                   element={
                       <Home />
                   }
               >
               </Route>

               {/* User Profile Routes */}
               <Route
                   path="/profile"
                   element={
                       <ProfileCard user={user} setUser={setUser} />
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
                        <ProfileEffects />
                   }
               >
               </Route>
               <Route
                   path="/avatar-effects"
                   element={
                       <AvatarEffects setUser={setUser}/>
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
                   path="/login"
                   element={
                    <SignIn setUser={setUser} />
                   }
               >
               </Route>
           </Routes>
        </>
    );
};

export default App;