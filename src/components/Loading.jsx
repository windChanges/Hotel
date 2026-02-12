import React from "react";

const Loading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
    );
};

export default Loading;
