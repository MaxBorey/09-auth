"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetails.client.module.css";
import { useParams } from "next/navigation";


const getInvalidIdMessage = () => (
  <p className={css.content}>Invalid note ID</p>
);

const getLoadingMessage = () => (
  <p className={css.content}>Loading, please wait...</p>
);

const getErrorMessage = () => (
  <p className={css.content}>Something went wrong.</p>
);

const NoteDetailsClient  = () => {
  const { id } = useParams<{ id: string }>();

  const validId = typeof id === "string" && id.trim().length > 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById (String(id)),
    enabled: validId,
    refetchOnMount: false,
  });

  if (!validId) return getInvalidIdMessage();
  if (isLoading) return getLoadingMessage();
  if (error || !data) return getErrorMessage();

  const note = data;
  const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
    : `Created at: ${new Date(note.createdAt).toLocaleString()}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {/* <button className={css.editBtn}>Edit note</button> */}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
