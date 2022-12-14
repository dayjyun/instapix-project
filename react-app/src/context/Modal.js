import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import "../components/PostsComponent/EditPost/EditPostForm.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function PostCardMenuModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="postcard-modal">
      <div id="postcard-modal-background" onClick={onClose} />
      <div id="postcard-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function PostModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="post-modal">
      <div id="post-modal-background" onClick={onClose} />
      <div id="post-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function EditModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="edit-modal-background" onClick={onClose} />
      <div id="edit-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function ModalSmall({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content-small">{children}</div>
    </div>,
    modalNode
  );
}

export function EditCommentModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="edit-comment-modal">
      <div id="edit-comment-modal-background" onClick={onClose} />
      <div id="edit-comment-modal-content">{children}</div>
    </div>,
    modalNode
  );
}

export function EditPostModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="edit-post-modal">
      <div id="edit-modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
