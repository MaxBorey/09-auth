export interface Note {
  id: string;         
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
  userId?: string;   
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
};

export interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';


