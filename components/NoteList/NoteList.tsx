'use client';

import css from './NoteList.module.css';
import { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api/clientApi';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteMutation = useMutation<unknown, Error, string>({
    mutationFn: (id) => deleteNote(id),          
    onMutate: (id) => {
      setDeletingId(id);                         
      setDeleteError(null);
    },
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.refresh();
    },
    onError: (error) => {
      setDeleteError(error?.message || 'Could not delete the note. Try again!');
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>

              <button
                className={css.button}
                disabled={deletingId === note.id}
                onClick={() => deleteMutation.mutate(note.id)} 
                type="button"
              >
                {deletingId === note.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteError && <div className={css.errorMsg}>{deleteError}</div>}
    </>
  );
}
