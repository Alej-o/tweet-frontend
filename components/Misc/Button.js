import React from 'react'

function Button({children, handleOpenModal, className}) {
    return (
        <button onClick={handleOpenModal} className={`rounded-full h-10 w-52 ${className}`}>{children}</button>
    )
}

export default Button
