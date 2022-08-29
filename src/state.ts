import {
  map,
  takeWhile,
  scan,
  startWith,
  combineLatestWith,
} from "rxjs/operators";
import {
  createSignal,
  partitionByKey,
  mergeWithKey,
  combineKeys,
} from "@react-rxjs/utils";
import { FilterType, Todo } from "./types";
import { bind, shareLatest } from "@react-rxjs/core";

// entry points for user actions
export const [newTodo$, onNewTodo] = createSignal<string>();
export const [editTodo$, onEditTodo] = createSignal<{
  id: number;
  text: string;
}>();
export const [toggleTodo$, onToggleTodo] = createSignal<number>();
export const [deleteTodo$, onDeleteTodo] = createSignal<number>();

const todoActions$ = mergeWithKey({
  add: newTodo$.pipe(map((text, id) => ({ id: id, text }))),
  edit: editTodo$,
  toggle: toggleTodo$.pipe(map((id) => ({ id }))),
  delete: deleteTodo$.pipe(map((id) => ({ id }))),
});

export const [getTodoById, todoIds$] = partitionByKey(
  todoActions$,
  (event) => event.payload.id,
  (event$, id) =>
    event$.pipe(
      takeWhile((action) => action.type !== "delete"),
      scan(
        (state, action) => {
          switch (action.type) {
            case "add":
            case "edit":
              return { ...state, text: action.payload.text };
            case "toggle":
              return { ...state, done: !state.done };
            default:
              return state;
          }
        },
        { id, text: "", done: false } as Todo
      )
    )
);

const todosMap$ = combineKeys(todoIds$, getTodoById);

export const todoList$ = todosMap$.pipe(
  map((itemMap) => Array.from(itemMap.values())),
  shareLatest()
);

export const [selectedFilter$, onSelectFilter] = createSignal<FilterType>();

export const [useCurrentFilter, currentFilter$] = bind(
  selectedFilter$.pipe(startWith(FilterType.All))
);

export const filteredTodoList$ = todoList$.pipe(
  combineLatestWith(currentFilter$),
  map(([todoList, filter]) =>
    todoList.filter((item) => {
      if (filter === "done") {
        return item.done;
      }
      if (filter === "pending") {
        return !item.done;
      }

      if (filter === "all") {
        return true;
      }

      return false;
    })
  )
);
