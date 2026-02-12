import {signOut} from "../api/auth";

const SignOut = () => {

    const userSignOut = async () => {
        const  res = await signOut();
        console.log(res);
    }

    return (
        <div>
           <button onClick={userSignOut}>SignOut</button>
        </div>
    );
};

export default SignOut;