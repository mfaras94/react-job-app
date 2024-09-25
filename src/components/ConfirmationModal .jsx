import Modal from 'react-modal';

// // Set the root element for accessibility reasons (important for screen readers)
// Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '2em 3rem',
          textAlign: 'center',
        },
      }}
    >
      <h2 className='text-2xl'>Confirmation</h2>
      <p className='mb-4'>{message}</p>
      <div>
        <button
          onClick={onConfirm}
          className="h-[36px] bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 mr-1 rounded-lg text-center text-sm"
        >
          Confirm
        </button>
        <button
          onClick={onRequestClose}
          className="h-[36px] bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 ml-1 rounded-lg text-center text-sm"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};



export default ConfirmationModal

