import axios from "axios";
import { Note, NoteTag } from "../types/note";



interface NotesApiResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_SWAGGER_TOKEN}`;

export async function getNotes(
  search: string = '',
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag,
): Promise<NotesApiResponse> {
  type ParamsType = {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  };
  
  const params: ParamsType = {
    page,
    perPage,
  };
  
  if (search) params.search = search;
  if (tag && tag.trim() !== '') params.tag = tag;

  const response = await axios.get<NotesApiResponse>('/notes', { params });
  return response.data;
}


// export async function createNote(
//   newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<Note> {
//   const response = await axios.post<Note>('/notes', newNote);
//   return response.data;
// }

export async function deleteNote(id: number): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById (id: number): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
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
  const res = await axios.post<Note>('/notes', data);
  return res.data;
};