import TodoItem from "components/TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import styles from "./todoList.module.scss";

interface Props {
  cards: Array<Record<string, any>>;
}

const TodoList = ({ cards }: Props) => {
  const showType = useSelector((state: RootState) => state.todoList.showType);

  return (
    <div className={styles.todoList}>
      {cards.map(
        (card, index) =>
          Boolean(
            Number(showType) === 0 ||
              (Number(showType) === 1 && card.status === "progress") ||
              (Number(showType) === 2 && card.status === "completed")
          ) && <TodoItem card={card} key={`card-${index}`} />
      )}
    </div>
  );
};

export default TodoList;
