import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import { IToDoItem } from "../App";
import useKeyboardPress from "../hooks/useKeyboardPress";

interface Props {
  todo: IToDoItem;
  editing: boolean;
  completeToDo: (id: string) => void;
  deleteToDo: (id: string) => void;
  editToDo: (id: string) => void;
  changeToDo: (id: string, value: string) => void;
}

const ToDo = (props: Props) => {
  const { todo, editing, completeToDo, deleteToDo, editToDo, changeToDo } =
    props;
  const oldTitle = todo.title;
  const [value, setValue] = useState(todo.title);
  const node = useRef<HTMLInputElement>(null);
  const enterKey: boolean = useKeyboardPress("Enter");
  const escKey: boolean = useKeyboardPress("Escape");

  const handlerSaveTitle = () => {
    editToDo("");
    changeToDo(todo.id, value);
  };

  useEffect(() => {
    if (editing && node.current) {
      node.current.focus();
    }
  }, []);

  useEffect(() => {
    if (enterKey && editing) {
      handlerSaveTitle();
    }

    if (escKey && editing) {
      editToDo("");
      setValue(oldTitle);
    }
  });

  return (
    <li className={classNames({ editing, completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => completeToDo(todo.id)}
          readOnly
        />
        <label onDoubleClick={() => editToDo(todo.id)}>{todo.title}</label>
        <button className="destroy" onClick={() => deleteToDo(todo.id)} />
      </div>
      <input
        type="text"
        ref={node}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handlerSaveTitle}
        className="edit"
      />
    </li>
  );
};

export default ToDo;
