import React from 'react';
import { Spinner } from './spinner';

const LoadingScreen = ({ fullScreen = true }) => {
    return (
        <div className={`${fullScreen ? 'fixed inset-0' : 'w-full h-full min-h-[400px]'} flex items-center justify-center bg-background z-[9999]`}>
            <div className="flex flex-col items-center gap-5">
                {/* Website Icon */}
                <img
                    src="/Icon.png"
                    alt="Todoify"
                    className="w-16 h-16 md:w-20 md:h-20 select-none pointer-events-none"
                />

                {/* Spinner */}
                <Spinner className="w-8 h-8 text-primary" />
            </div>
        </div>
    );
};

export default LoadingScreen;
