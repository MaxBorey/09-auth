export type TagName = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: TagName;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: TagName;
}