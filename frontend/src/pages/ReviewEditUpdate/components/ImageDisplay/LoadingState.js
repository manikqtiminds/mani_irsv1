function LoadingState() {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-500">Loading images...</p>
        </div>
      </div>
    );
  }
  
  export default LoadingState;