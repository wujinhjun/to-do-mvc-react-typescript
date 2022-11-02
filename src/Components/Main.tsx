import { useState, useEffect } from "react";
import { IToDoItem } from "../App";
import ToDo from "./ToDo";
import { nanoid } from "nanoid";

interface Props {
  ToDoList: IToDoItem[];
  hash: string;
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

type showStatus = "all" | "active" | "completed";

const linkObj: ILink[] = [
  { route: "", title: "All", id: nanoid() },
  { route: "#/active", title: "Active", id: nanoid() },
  { route: "#/completed", title: "Completed", id: nanoid() },
];

const Main = (props: Props) => {
  const {
    ToDoList,
    hash,
    completedToDoItem,
    deleteToDoItem,
    changeToDoItem,
    clearCompletedToDo,
    toggleAll,
    ToDoNumber,
  } = props;

  const [editStatus, setEditStatus] = useState<string>("");

  const activeItemList = ToDoList.filter((item) => !item.completed);
  const completedItemList = ToDoList.filter((item) => item.completed);
  const [showStatus, setShowStatus] = useState<showStatus>("all");
  let todoListDisplay = ToDoList;

  const handleEdit = (itemID: string): void => {
    setEditStatus(itemID);
  };

  if (showStatus === "active") {
    todoListDisplay = activeItemList;
  }
  if (showStatus === "completed") {
    todoListDisplay = completedItemList;
  }

  useEffect(() => {
    if (hash.includes("active")) {
      setShowStatus("active");
    } else if (hash.includes("completed")) {
      setShowStatus("completed");
    } else {
      setShowStatus("all");
    }
  }, [hash]);

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
          {todoListDisplay.map((item) => (
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
            {linkObj.map((item) => (
              <li key={item.id}>
                <a
                  href={item.route}
                  className={hash === item.route ? "selected" : ""}
                >
                  {item.title}
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
