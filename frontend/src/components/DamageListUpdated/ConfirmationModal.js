function ConfirmationModal({ show, action, onConfirm, onCancel }) {
    if (!show) return null;
  
    const getActionMessage = () => {
      switch (action) {
        case 'delete':
          return 'Are you sure you want to delete this row?';
        case 'save':
          return 'Do you want to save your changes?';
        case 'cancel':
          return 'Do you want to cancel your modifications?';
        default:
          return 'Are you sure you want to proceed?';
      }
    };
  
    return (
      <div className="fixed inset-0 z-30 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl">Confirm Action</h3>
          <p className="mb-4">{getActionMessage()}</p>
  
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {action === 'delete' ? 'Delete' : action === 'save' ? 'Save' : 'Ok'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmationModal;