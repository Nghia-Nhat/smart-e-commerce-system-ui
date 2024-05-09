import React from 'react';

const MasterLoading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative flex justify-center items-center text-3xl font-bold gap-2">
                <div className="animate-bounce">T</div>
                <div className="animate-bounce delay-50">R</div>
                <div className="animate-bounce delay-100">I</div>
                <div className="animate-bounce delay-150">P</div>
                <div className="animate-bounce delay-200">L</div>
                <div className="animate-bounce delay-250">E</div>
                <div className="animate-bounce delay-300">E</div>
            </div>
        </div>
    );
};

export default MasterLoading;
