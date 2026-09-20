export type TaskObject = {
  id: number;
} & TaskPayload;

export type TaskPayload = {
  title: string;
  completed: boolean;
};
