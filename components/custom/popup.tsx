import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          <p className="text-base text-gray-500 whitespace-pre-wrap">
            {content}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
