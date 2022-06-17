import { createPortal } from "react-dom";
import TaskInput from "./TaskInput";
import { actionContext } from "../App";
import { useContext } from "react";

function Modal() {
  const { onCloseModal } = useContext(actionContext);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) onCloseModal();
  };

  return createPortal(
    <div id="backdrop-modal" onClick={onBackdropClick}>
      <div className="modal-content">
        <TaskInput />
      </div>
    </div>,
    document.querySelector("#modal-root"),
  );
}

export default Modal;
