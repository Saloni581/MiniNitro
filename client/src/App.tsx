import SignUp from "../components/SignUp.tsx";
import SignIn from "../components/SignIn.tsx";
import { Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";
import Home from "../components/Home.tsx";
import Profile from "../components/Profile.tsx";
import Effects from "../components/Effects.tsx";
import { useState } from "react";
import type { User } from './types.ts';

const App = () => {

    const [user, setUser] = useState<User | null>(null);

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
           </Routes>
        </>
    );
};

export default App;