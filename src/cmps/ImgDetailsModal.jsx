import React from "react";
import Modal from "react-modal";

import ImageDetails from "../pages/ImageDetails.jsx";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    width: "100vw",
    marginTop: "50px",
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function ImgDetailsModal({ modalIsOpen, onCloseModal }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Image details modal"
      >
        <ImageDetails onCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
}
