import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import { nanoid } from "nanoid";

import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { tranArrToObj, tranObjToArr, store } from "./utils";

export interface IToDoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface IToDOList {
  [key: string]: IToDoItem;
}

function App() {
  const [todoList, setTodoList] = useState<IToDOList>(store("todoList"));
  const todoListArr: IToDoItem[] = tranObjToArr(todoList);

  const saveToDoList = (data: IToDOList) => {
    store("todoList", data);
  };

  const createNewToDo = (value: string) => {
    const id: string = nanoid();
    const newItem: IToDoItem = {
      id,
      title: value.trim(),
      completed: false,
    };
    const modifiedList = { ...todoList, [id]: newItem };
    setTodoList(modifiedList);
    saveToDoList(modifiedList);
  };

  const completedToDoItem = (itemID: string) => {
    const completeIf: boolean = todoList[itemID].completed;
    const modifiedItem: IToDoItem = {
      ...todoList[itemID],
      completed: !completeIf,
    };
    const modifiedList = { ...todoList, [itemID]: modifiedItem };

    setTodoList(modifiedList);
    saveToDoList(modifiedList);
  };

  const deleteToDoItem = (itemID: string) => {
    const { [itemID]: value, ...afterDelete } = todoList;
    setTodoList(afterDelete);
    saveToDoList(afterDelete);
  };

  const changeToDoItem = (itemID: string, value: string) => {
    const modifiedItem: IToDoItem = {
      ...todoList[itemID],
      title: value,
    };
    const modifiedList = { ...todoList, [itemID]: modifiedItem };

    setTodoList(modifiedList);
    saveToDoList(modifiedList);
  };

  const clearCompleted = () => {
    const activeToDoListArr = todoListArr.filter((item) => !item.completed);
    setTodoList(tranArrToObj(activeToDoListArr));
    saveToDoList(tranArrToObj(activeToDoListArr));
  };

  const completedAllToDo = () => {
    const activeToDoListArr = todoListArr.filter((item) => !item.completed);
    let afterChange;
    if (activeToDoListArr.length === 0) {
      afterChange = todoListArr.map((item) => {
        return { ...item, completed: false };
      });
    } else {
      afterChange = todoListArr.map((item) => {
        return { ...item, completed: true };
      });
    }
    setTodoList(tranArrToObj(afterChange));
    saveToDoList(tranArrToObj(afterChange));
  };

  const { hash } = useLocation();

  return (
    <>
      <section className="todoapp">
        <Header createNewToDo={createNewToDo} />
        <Main
          ToDoList={todoListArr}
          hash={hash}
          completedToDoItem={completedToDoItem}
          deleteToDoItem={deleteToDoItem}
          changeToDoItem={changeToDoItem}
          clearCompletedToDo={clearCompleted}
          toggleAll={completedAllToDo}
        />
      </section>
      <Footer />
    </>
  );
}

export default App;
