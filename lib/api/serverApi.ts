import { cookies } from "next/headers";
import { ParamsType, User } from "./clientApi";
import { Note, NotesApiResponse } from "../../types/note";
import nextServer from "./api";


export async function getNotesServer(
  query: string,
  page: number,
  tag: string | undefined = undefined
): Promise<NotesApiResponse> {
  const params: ParamsType = {
    ...(query.trim() !== "" && { search: query.trim() }),
    page: page,
    perPage: 12,
    tag,
  };
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesApiResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getNoteByIdServer(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responce.data;
};