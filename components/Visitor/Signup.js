import React, { useEffect, useRef } from "react";
import Logo from "../Misc/Logo";

function Signup({ handleInputUserChange, signup, userInfo, focusSignup }) {
    useEffect(() => {
        if (focusSignup?.current) {
            focusSignup.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ firstname, username, password });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="text-center">
                <Logo />
                <h2 className="text-2xl font-bold mb-4">Create your Hackatweet account</h2>
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="block text-gray-600 text-sm font-medium mb-1">Firstname</label> */}
                <input
                    ref={focusSignup}
                    type="text"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your firstname"
                    value={userInfo.firstname}
                    name="firstname"
                    onChange={(e) => handleInputUserChange(e)}
                />
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="block text-sm font-medium mb-1">Username</label> */}
                <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Choose a username"
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
                <button onClick={(e) => signup(e, 'signup')} className="rounded-full text-slate-800 bg-white h-10 w-52 bg-transparent hover:opacity-80 mb-4">Sign up</button>
            </div>
        </form>
    )
}

export default Signup
