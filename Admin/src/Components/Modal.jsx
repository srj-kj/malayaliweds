/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, children }) => {
    return (
      <div
        className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}
        onClick={onClose}
      >
           {children}
          </div>
   
  
    );
  };
  
  export default Modal;