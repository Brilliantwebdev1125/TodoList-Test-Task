import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "components/Menu";
import TodoList from "components/TodoList";
import Dialog from "components/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { readTodoList } from "redux/slices/todoList";
import "./styles/global.scss";
import styles from "./styles/app.module.scss";

const dropdownItems = [
  { value: 0, text: "All" },
  { value: 1, text: "In Progress" },
  { value: 2, text: "Completed" },
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const cards = useSelector((state: RootState) => state.todoList.todoList);
  // console.log(cards);
  useEffect(() => {
    getTodoList();
  }, []); //eslint-disable-line

  const getTodoList = async () => {
    try {
      dispatch(readTodoList());
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.App}>
      <div className="container">
        <h1 className="page-title">Todo List</h1>
        <Menu onAddTodoClick={handleOpen} dropdownItems={dropdownItems} />
        <TodoList cards={cards} />
      </div>
      <Dialog open={open} onClose={handleClose} type="create" />
    </div>
  );
}

export default App;
