import { bind } from "@react-rxjs/core";
import { getTodoById, onDeleteTodo, onEditTodo, onToggleTodo } from "../state";

export const [useTodo] = bind((id: number) => getTodoById(id));

const TodoItem: React.FC<{ id: number }> = ({ id }) => {
  const item = useTodo(id);

  return (
    <div>
      <input
        type="text"
        value={item.text}
        onChange={({ target }) => {
          onEditTodo({ id: item.id, text: target.value });
        }}
      />
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => {
          onToggleTodo(item.id);
        }}
      />
      <button
        onClick={() => {
          onDeleteTodo(item.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
