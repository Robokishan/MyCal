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
    borderRadius: '4px',
    // border: '1px red solid',
    boxShadow:
      '0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
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
        <form className="px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="py-2 px-3 w-full leading-tight text-gray-700 rounded border shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="py-2 px-3 mb-3 w-full leading-tight text-gray-700 rounded border border-red-500 shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-xs italic text-red-500">
              Please choose a password.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-gray-500">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </ReactModal>
  )
}
