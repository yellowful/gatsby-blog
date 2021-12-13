import React from 'react'

const Modal = ({ message, popUp }) => {
  if (popUp) {
    return (
      <div className="top-0 left-0 buttom-0 right-0 w-100 h-100 flex justify-center items-center fixed z-999">
        <div className="top-0 left-0 buttom-0 right-0 w-100 h-100 bg-black o-70 fixed absolute" />
        <div className="rrelative center orange f3 ph3 pv4 mv0 w-60 tc bg-near-white br2 z-999">
          {message}
        </div>
      </div>
    )
  }
  return null;
}

export default Modal
