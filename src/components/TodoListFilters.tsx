import React from "react";
import { onSelectFilter, useCurrentFilter } from "../state";
import { FilterType } from "../types";

const TodoListFilters = () => {
  const filter = useCurrentFilter();

  const updateFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectFilter(target.value as FilterType);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value={FilterType.All}>All</option>
        <option value={FilterType.Done}>Completed</option>
        <option value={FilterType.Pending}>Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
