//User

export type User = {
  id: string;
  userName: string;
} | null;

export type TodoItem = {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  userId: string;
};

export type TodoState = TodoItem[];

export type TodoFilter = 'all' | 'active' | 'completed';

type AddAction = {
  type: 'add';
  payload: TodoItem;
};

type RemoveAction = {
  type: 'remove';
  payload: { id: TodoItem['_id'] };
};
type ToggleAction = {
  type: 'toggle';
  payload: { id: TodoItem['_id']; isDone: boolean };
};

export type TodosActions = AddAction | RemoveAction | ToggleAction;
