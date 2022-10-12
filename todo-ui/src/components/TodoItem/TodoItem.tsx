import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodoList, updateTodoList } from "redux/slices/todoList";
import { getFormattedDateTime } from "utils";
import Dialog from "components/Dialog";

import { ReactComponent as DeleteIcon } from "@material-icons/svg/svg/delete/round.svg";
import { ReactComponent as EditIcon } from "@material-icons/svg/svg/edit/round.svg";

import styles from "./todoItem.module.scss";
import { AppDispatch } from "app/store";

interface Props {
  card: Record<string, any>;
}

const TodoItem = ({ card }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const updateStatus = async (id: number, status: string) => {
    dispatch(updateTodoList({ id, status, title: "" }));
  };

  const handleDeleteCard = async (id: number) => {
    dispatch(deleteTodoList(id));
  };

  return (
    <div className={styles.todoItem}>
      <input
        type="checkbox"
        className="checkbox"
        checked={Boolean(card.status === "completed")}
        onChange={() => updateStatus(card.id, card.status)}
      />
      <div className="todo-info">
        <span>
          {card.status === "completed" ? <del>{card.title}</del> : card.title}
        </span>
        <span className="date-field">
          {getFormattedDateTime(card.started_at)}
          {card.status === "completed" &&
            ` ~ ${getFormattedDateTime(card.completed_at)}`}
        </span>
      </div>
      <div className="icon-group">
        <DeleteIcon onClick={() => handleDeleteCard(card.id)} />
        <EditIcon onClick={() => setOpen(true)} />
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        type="update"
        id={card.id}
        _title={card.title}
        key={card.id}
      />
    </div>
  );
};

export default TodoItem;
