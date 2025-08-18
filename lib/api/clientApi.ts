import { Note, NotesApiResponse, Tag } from "@/types/note";
import nextServer from "./api";

export interface ParamsType  {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
  sortBy?: string;
    }

export type NewNoteData = {
    title: string;
    content: string;
    tag: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
};

export interface User {
  username: string;
  email: string;
  avatar?: string;
}

export type LoginRequest = {
    email: string;
    password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export async function getNotes(
  search = '',
  page = 1,
  perPage = 12,
  tag?: Tag,
): Promise<NotesApiResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();
  if (tag && tag.trim()) params.tag = tag;

  const response = await nextServer.get<NotesApiResponse>('/notes', { params });
  return response.data; 
}

export async function getNoteById (id: number): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export async function deleteNote(id: number): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export const createNote = async (data: NewNoteData) => {
  const res = await nextServer.post<Note>('/notes', data);
  return res.data;
};


export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};


export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};


export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};