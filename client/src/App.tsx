import Navbar from "../components/Navbar.tsx";
import SignUp from "../components/SignUp.tsx";
import SignIn from "../components/SignIn.tsx";
import SignOut from "../components/SignOut.tsx";

const App = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div>
                <SignUp />
            </div>
            <div>
                <SignIn />
            </div>
            <div>
                <SignOut />
            </div>
        </div>
    );
};

export default App;