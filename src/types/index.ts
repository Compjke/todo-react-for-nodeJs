export type TodoItem = {
  id: number;
  title: string;
  isDone: boolean;
};

export type TodoState = TodoItem[];

type AddAction = {
  type: 'add';
  payload: TodoItem;
};

type RemoveAction = {
  type: 'remove';
  payload: { id: TodoItem['id'] };
};
type ToggleAction = {
  type: 'toggle';
  payload: { id: TodoItem['id']; isDone: boolean };
};

export type TodosActions = AddAction | RemoveAction | ToggleAction;
