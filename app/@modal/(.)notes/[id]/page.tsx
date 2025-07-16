import {fetchNoteById} from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteModalProps) {
  const { id } = await params;
  const noteId = Number(id);
  console.log("generateMetadata called for noteId:", noteId);

  const note = await fetchNoteById(noteId);

  return {
    title: note ? `Note: ${note.title}` : "Note not found",
    description: note ? note.content.slice(0, 30) : "No content available",
    openGraph: {
      title: note ? `Note: ${note.title}` : "NoteHub - Your Notes App",
      description: note
        ? note.content.slice(0, 100)
        : "Manage your notes efficiently with NoteHub",
      url: `https://notehub.com/notes/${noteId}`,
      siteName: "NoteHub",
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note ? `Note: ${note.title}` : "NoteHub - Your Notes App",
        },
      ],
      type: "article",
    },
  };
}


export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = await params;
  const noteId = +id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}