import { useState } from "react";
import { onNewTodo } from "../state";

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    onNewTodo(inputValue);
    setInputValue("");
  };

  const onChange = ({ target }: any) => {
    setInputValue(target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
