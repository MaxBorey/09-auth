import { Note, NoteTag, NotesApiResponse } from "../../types/note";
import { nextServer } from "../api/api";

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
  sortBy?: string;
}

export async function getNotes(
  query: string = '',
  page: number = 1,
  perPage: number,
  tag?: NoteTag
): Promise<NotesApiResponse> {
  const params: FetchNotesParams = {
    ...(query.trim() !== '' && { search: query.trim() }),
    page,
    perPage: 12,
    ...(tag && { tag }),
  };

  const response = await nextServer.get<NotesApiResponse>('/notes', { params });
  return response.data;
}


// export async function createNote(
//   newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<Note> {
//   const response = await axios.post<Note>('/notes', newNote);
//   return response.data;
// }

export async function deleteNote(id: number): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById (id: number): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

// export async function getTags(): Promise<string[]> {
//   const response = await axios.get<{ notes: Note[] }>('/notes');
//   const notes = response.data.notes;

//   const tagsSet = new Set<string>();
//   notes.forEach(note => {
//     if (note.tag) tagsSet.add(note.tag);
//   });

//   return Array.from(tagsSet);
// }

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

export const createNote = async (data: NewNoteData) => {
  const res = await nextServer.post<Note>('/notes', data);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};