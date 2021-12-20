import React, { ReactElement } from 'react'
import ReactModal from 'react-modal'
import Text from '../../components/Text'

interface ModalProps {
  modalIsOpen: boolean
  closeModal?: (event: React.MouseEvent | React.KeyboardEvent) => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: 'none',
    border: 'none',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    // border: '1px red solid',
    boxShadow:
      '0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  },
  overlay: {
    background: '#00000050'
  }
}
export default function Modal({
  modalIsOpen,
  closeModal
}: ModalProps): ReactElement {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal && closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full max-w-xs">
        <form className="px-6 pt-6 pb-1 mb-4 ">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="link"
            >
              Link
            </label>
            <input
              className="py-2 px-3 w-full leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
              id="link"
              type="text"
              placeholder="Link"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add
            </button>
            <button
              className="py-2 px-4 font-bold text-white hover:bg-yellow-700 rounded focus:outline-none bg-orange-500 focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  )
}
