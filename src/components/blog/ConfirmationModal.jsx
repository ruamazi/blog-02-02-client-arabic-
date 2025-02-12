const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center z-50">
   <div
    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
    onClick={onClose}
   ></div>
   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50">
    <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
    <div className="flex justify-end gap-4">
     <button
      onClick={onClose}
      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 cursor-pointer"
     >
      الغاء
     </button>
     <button
      onClick={onConfirm}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
     >
      نعم, قم بالحذف
     </button>
    </div>
   </div>
  </div>
 );
};

export default ConfirmationModal;
