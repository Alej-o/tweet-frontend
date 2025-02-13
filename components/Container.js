import React from 'react'

function Container({children}) {
    return (
        <main className="h-dvh w-dvw overflow-hidden flex">
            {children}
        </main>
    )
}

export default Container
