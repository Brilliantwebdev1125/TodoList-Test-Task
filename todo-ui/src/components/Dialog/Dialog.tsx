import { useState } from "react";
import { useDispatch } from "react-redux";
import { createToDoList, updateTodoList } from "redux/slices/todoList";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "@material-icons/svg/svg/close/outline.svg";
import styles from "./dialog.module.scss";
import { AppDispatch } from "app/store";

type Props = {
  id?: number;
  open: boolean;
  onClose: () => void;
  type: string;
  _title?: any;
};

const customStyles = {
  content: {
    border: "0px",
    padding: "16px",
    marginLeft: "50%",
    transform: "translate(-50%, 0%)",
    height: "fit-content",
    minWidth: "336px",
    maxWidth: "720px",
    outline: "0px",
  },
};

const Dialog = ({ id = 0, open, onClose, type, _title }: Props) => {
  const [title, setTitle] = useState<string>(_title);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (type === "create") {
      setTitle("");
      dispatch(createToDoList(title));
    } else if (type === "update") {
      dispatch(updateTodoList({ id, title, status: "" }));
    }
    onClose();
  };

  return (
    <Modal
      closeTimeoutMS={100}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Search"
      className={styles.dialog}
      style={customStyles}
      ariaHideApp={false}
    >
      <CloseIcon className="close-icon" onClick={onClose} />
      <h2 className="headline">
        {type === "create" ? "Create" : "Update"} Todo
      </h2>
      <label>Title</label>
      <input
        type="text"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus={true}
      />
      <div className="button-group">
        <button onClick={handleSubmit} className="filled">
          {type === "create" ? "Create" : "Update"} Todo
        </button>
        <button className="cancel outlined" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Dialog;
