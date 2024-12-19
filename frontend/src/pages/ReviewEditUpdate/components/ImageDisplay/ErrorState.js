function ErrorState({ message }) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">{message || 'An error occurred'}</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }
  
  export default ErrorState;