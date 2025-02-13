import React, { useState } from 'react';
import Button from '../Misc/Button';

import Image from 'next/image';
import Logo from '../Misc/Logo';

function Signup() {
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                    type="text"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="block text-sm font-medium mb-1">Username</label> */}
                <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4 m-auto w-6/12">
                {/* <label className="blocktext-sm font-medium mb-1">Password</label> */}
                <input
                    type="password"
                    className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="text-center w-6/12 m-auto">
                <Button className="bg-white text-slate-800 w-full hover:opacity-80">Sign up</Button>
            </div>
        </form>
    )
}

export default Signup
