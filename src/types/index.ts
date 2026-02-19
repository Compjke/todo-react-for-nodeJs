export type TodoItem = {
  id: string | number;
  title: string;
  isDone: boolean;
  children?: React.ReactNode;
};

export type TodoState = TodoItem[];

export type TodosActions<T> = {
  type: 'add' | 'remove' | 'toggle';
  payload: T;
};
