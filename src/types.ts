export type Todo = { id: number; text: string; done: boolean };

export enum FilterType {
  All = "all",
  Done = "done",
  Pending = "pending",
}
