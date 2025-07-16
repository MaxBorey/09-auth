import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub — Simple and Efficient Note Management',
  description: 'NoteHub is a simple and efficient application designed for managing personal notes. It keeps your thoughts organized and accessible in one place, whether you&#8217;re at home or on the go.',
  openGraph: {
    title: 'NoteHub — Simple and Efficient Note Management',
    description: 'NoteHub helps you keep your thoughts organized and accessible anywhere with a clean interface and keyword search.',
    url: 'https://08-zustand-khaki.vercel.app/notes/action/create',
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

export default function CreateNote() {
  const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
}
