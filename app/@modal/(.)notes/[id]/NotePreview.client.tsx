"use client";

import Modal from "@/components/Modal/Modal";
import { getNoteById } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.client.module.css";
import { useCallback } from "react";

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id] as const,
    queryFn: () => getNoteById(id),
    enabled: typeof id === "string" && id.length > 0, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <Modal onClose={onClose}>
        <div className={css.loading}>Завантаження нотатки…</div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={onClose}>
        <div className={css.error}>
          Помилка: {(error as Error)?.message ?? "Невідома помилка"}
        </div>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={onClose}>
        <div className={css.empty}>Note not found</div>
      </Modal>
    );
  }

  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <p>{note.tag}</p>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;