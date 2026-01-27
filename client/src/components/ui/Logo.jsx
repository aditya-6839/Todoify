import React from 'react'

const Logo = ({ className }) => {
    return (
        <div className={`bg-[url("/Todoify.png")] w-60 h-50 py-4 px-4 bg-contain bg-no-repeat bg-center ${className}`}>
        </div>
    )
}

export default Logo