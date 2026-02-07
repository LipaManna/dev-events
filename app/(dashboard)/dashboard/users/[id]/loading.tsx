const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-lg font-medium text-gray-600">Loading user details...</span>
        </div>
    );
};

export default Loading;
