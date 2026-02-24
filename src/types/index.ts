export type TodoItem = {
  id: number | string;
  title: string;
  isDone: boolean;
  description?: string;
};

export type TodoState = TodoItem[];

export type TodoFilter = 'all' | 'active' | 'completed';

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
