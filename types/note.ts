export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: Tag;
}

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

export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';