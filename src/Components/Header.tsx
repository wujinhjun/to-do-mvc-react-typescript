import { useState, useEffect } from "react";

import useKeyboardPress from "../hooks/useKeyboardPress";

interface IProps {
  createNewToDo: (value: string) => void;
}

const Header = (props: IProps) => {
  const { createNewToDo } = props;
  const [value, setValue] = useState<string>("");

  const escKey = useKeyboardPress("Escape");
  const enterKey = useKeyboardPress("Enter");

  useEffect(() => {
    if (escKey) {
      setValue("");
    }

    if (enterKey && Boolean(value.trim())) {
      createNewToDo(value);
      setValue("");
    }
  });

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={true}
      />
    </header>
  );
};

export default Header;
