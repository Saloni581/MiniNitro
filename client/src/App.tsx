import SignUp from "../components/SignUp.tsx";
import SignIn from "../components/SignIn.tsx";
import { Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import Home from "../components/Home.tsx";
import Profile from "../components/Profile.tsx";
import Effects from "../components/Effects.tsx";
import { useEffect, useState } from "react";
import type { User } from '../types.ts';
import ProfileForm from "../components/ProfileForm.tsx";
import { fetchUserDetails } from "../api/user.ts";

const App = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fetchUserDetails();
                setUser(user);
            } catch(error) {
                console.log(error);
                setUser(null);
            }
        }

        fetchUser();
    }, [user]);

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
               <Route
                   path="/profile"
                   element={
                       <Profile user={user} setUser={setUser} />
                   }
               >
               </Route>
               <Route
                   path="/effects"
                   element={
                       <Effects />
                   }
               >
               </Route>
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
               <Route
                   path="/profile-form"
                   element={
                       <ProfileForm setUser={setUser}/>
                   }
               >
               </Route>
           </Routes>
        </>
    );
};

export default App;