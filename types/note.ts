export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
};

export interface ErrorProps {
  error: Error;
  reset: () => void;
};

export interface NotesApiResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';