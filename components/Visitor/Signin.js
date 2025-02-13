import React, { useEffect, useRef } from "react";
import Logo from "../Misc/Logo";

function Signin({ handleInputUserChange, signin, userInfo, focusSignin }) {
    useEffect(() => {
        if (focusSignin?.current) {
            focusSignin.current.focus();
        }
    }, []);
    // const { username, password } = userInfo;
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit({ email, password });
    // };

    return (
        <form className="w-full">
            <div className="text-center">
                <Logo />
                <h2 className="text-2xl font-bold mb-4">Connect to Hackatweet</h2>
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="block text-sm font-medium mb-1">Username</label> */}
                <input
                    ref={focusSignin}
                    type="text"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username"
                    name="username"
                    value={userInfo.username}
                    onChange={(e) => handleInputUserChange(e)}
                />
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="blocktext-sm font-medium mb-1">Password</label> */}
                <input
                    type="password"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    name="password"
                    value={userInfo.password}
                    onChange={(e) => handleInputUserChange(e)}
                />
            </div>
            <div className="text-center w-6/12 m-auto">
                <button onClick={(e) => signin(e, 'signin')} className="rounded-full text-slate-800 bg-white  h-10 w-52 hover:opacity-80 mb-4">Sign in</button>
            </div>
        </form>
    )
}

export default Signin
