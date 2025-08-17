import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const noteId = Number(id);

  const note = await fetchNoteById(noteId);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${noteId}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note: ${note.title}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  const noteId = Number(id);

  return <NoteDetailsClient noteId={noteId} />;
}
