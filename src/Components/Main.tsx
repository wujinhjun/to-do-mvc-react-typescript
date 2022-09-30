import { useState } from "react";
import { IToDoItem } from "../App";
import { useLocation } from "react-router-dom";
import ToDo from "./ToDo";
import { nanoid } from "nanoid";

interface Props {
  ToDoList: IToDoItem[];
  completedToDoItem: (id: string) => void;
  deleteToDoItem: (id: string) => void;
  changeToDoItem: (id: string, value: string) => void;
  clearCompletedToDo: () => void;
  toggleAll: () => void;
  ToDoNumber?: number;
}

interface ILink {
  route: string;
  title: string;
  id: string;
}

const linkObj: ILink[] = [
  { route: "/", title: "All", id: nanoid() },
  { route: "/active", title: "Active", id: nanoid() },
  { route: "/completed", title: "Completed", id: nanoid() },
];

const Main = (props: Props) => {
  const {
    ToDoList,
    completedToDoItem,
    deleteToDoItem,
    changeToDoItem,
    clearCompletedToDo,
    toggleAll,
    ToDoNumber,
  } = props;

  const [editStatus, setEditStatus] = useState<string>("");

  const url: string = useLocation().pathname;

  const activeItemList = ToDoList.filter((item) => !item.completed);
  const completedItemList = ToDoList.filter((item) => item.completed);

  const handleEdit = (itemID: string): void => {
    setEditStatus(itemID);
  };

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          checked={completedItemList.length === ToDoList.length}
          id="toggle-all"
          className="toggle-all"
          readOnly
        />
        {ToDoList.length > 0 && (
          <label htmlFor="toggle-all" onClick={toggleAll}></label>
        )}
        <ul className="todo-list">
          {ToDoList.map((item) => (
            <ToDo
              key={item.id}
              todo={item}
              editing={editStatus === item.id}
              completeToDo={completedToDoItem}
              deleteToDo={deleteToDoItem}
              editToDo={handleEdit}
              changeToDo={changeToDoItem}
            />
          ))}
        </ul>
      </section>
      {Boolean(ToDoNumber || ToDoList.length) && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeItemList.length}</strong>
            <span> </span>
            <span>{activeItemList.length <= 1 ? "item" : "items"}</span>
            <span> left</span>
          </span>
          <ul className="filters">
            {linkObj.map((link) => (
              <li key={link.id}>
                <a
                  href={link.route}
                  className={url === link.route ? "selected" : ""}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          {completedItemList.length > 0 && (
            <button onClick={clearCompletedToDo} className="clear-completed">
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};

export default Main;
