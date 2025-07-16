"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const noteId = Number(id);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  function handleClose() {
    router.back();
  }

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div style={{ padding: 20 }}>Loading note details...</div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div style={{ padding: 20, color: "red" }}>
          Error loading note: {(error as Error).message}
        </div>
      </Modal>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={data} />
    </Modal>
  );
}
