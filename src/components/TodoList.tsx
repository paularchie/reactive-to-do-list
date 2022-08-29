import { bind } from "@react-rxjs/core";
import { filteredTodoList$ } from "../state";
import TodoItem from "./TodoItem";
import TodoItemCreator from "./TodoItemCreator";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";

export const [useTodoItemIds, todoItemIds$] = bind(filteredTodoList$, []);

const TodoList = () => {
  const todoItemIds = useTodoItemIds();

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoItemIds.map(({ id }) => (
        <TodoItem key={id} id={id} />
      ))}
    </>
  );
};

export default TodoList;
