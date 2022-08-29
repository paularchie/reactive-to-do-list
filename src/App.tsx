import { Subscribe } from "@react-rxjs/core";
import * as React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <Subscribe>
      <React.Suspense fallback={<p>wait</p>}>
        <TodoList />
      </React.Suspense>
    </Subscribe>
  );
}
