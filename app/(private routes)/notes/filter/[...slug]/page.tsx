import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import type { Metadata } from 'next'
import { getNotesServer } from '@/lib/api/serverApi';

type NotesByTagProps = {
  params: Promise<{ slug: string[] }>;
};

const validTags: Tag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

function isNoteTag(tag: string): tag is Tag {
  return validTags.includes(tag as Tag);
}

export async function generateMetadata({ params }: NotesByTagProps): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = !slug || slug.length === 0 || slug[0] === 'all' ? undefined : slug[0];
  const tag = rawTag && isNoteTag(rawTag) ? rawTag : undefined;

  return {
    title: tag ? `Notes tagged: ${tag}` : 'All Notes',
    description: tag ? `Notes filtered by tag ${tag}` : 'All notes without filter',
    openGraph: {
      title: tag ? `Notes tagged: ${tag}` : 'All Notes',
      description: tag ? `Notes filtered by tag ${tag}` : 'All notes without filter',
      url: 'https://notehub.com',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub main page preview',
        },
      ],
      type: 'website',
    },
  };
}

const NotesByTag = async({ params }: NotesByTagProps) => {
  const { slug } = await params;
  const rawTag = !slug || slug.length === 0 || slug[0] === 'all' ? undefined : slug[0];
  const tag = rawTag && isNoteTag(rawTag) ? rawTag : undefined;

  const data = await getNotesServer('', 1, tag);

  return (
    <NotesClient
      initialNotes={data.notes}
      initialTotalPages={data.totalPages}
      initialPage={1}
      initialSearch=""
      initialTotal={data.total ?? 0} 
      tag={tag}
    />
  );
}

export default NotesByTag;
