import { useEffect } from "react";
import "./ModalWrapper.scss";
import { createPortal } from "react-dom";
export function ModalWrapper({ closeModal, children }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return createPortal(
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      {children}
    </>,
    document.querySelector(".modal")
  );
}
