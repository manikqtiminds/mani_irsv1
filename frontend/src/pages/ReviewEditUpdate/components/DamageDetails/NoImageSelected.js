function NoImageSelected() {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Select an image to view damage details</p>
          <p className="text-gray-400 text-sm mt-2">Choose an image from the left panel</p>
        </div>
      </div>
    );
  }
  
  export default NoImageSelected;