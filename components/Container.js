import React from 'react'

function Container({children}) {
    return (
        <main className="h-dvh w-dvw overflow-hidden md: md:flex bg-slate-800 relative">
            {children}
        </main>
    )
}

export default Container
