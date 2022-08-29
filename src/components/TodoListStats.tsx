import { bind } from "@react-rxjs/core";
import { map } from "rxjs";
import { todoList$ } from "../state";
import { Todo } from "../types";

export const [useTodosStats] = bind(
  todoList$.pipe(map((todoList) => getStats(todoList))),
  { nTotal: 0, nCompleted: 0, nUncompleted: 0, percentCompleted: 0 }
);

function getStats(todoList: Todo[]) {
  const nTotal = todoList.length;
  const nCompleted = todoList.filter((item) => item.done).length;
  const nUncompleted = nTotal - nCompleted;
  const percentCompleted =
    nTotal === 0 ? 0 : Math.round((nCompleted / nTotal) * 100);

  return {
    nTotal,
    nCompleted,
    nUncompleted,
    percentCompleted,
  };
}

function TodoListStats() {
  const { nTotal, nCompleted, nUncompleted, percentCompleted } =
    useTodosStats();

  return (
    <ul>
      <li>Total items: {nTotal}</li>
      <li>Items completed: {nCompleted}</li>
      <li>Items not completed: {nUncompleted}</li>
      <li>Percent completed: {percentCompleted}</li>
    </ul>
  );
}

export default TodoListStats;
