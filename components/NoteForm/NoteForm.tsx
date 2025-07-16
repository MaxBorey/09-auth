'use client';

import { createNote, NewNoteData } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

type Props = {
  tags: string[];
};

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.refetchQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => router.push('/notes/filter/all');

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          required
          placeholder="Enter the note title"
          onInvalid={e => e.currentTarget.setCustomValidity('Please enter the note title')}
          onInput={e => e.currentTarget.setCustomValidity('')}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          required
          placeholder="Enter the text of note"
          onInvalid={e => e.currentTarget.setCustomValidity('Please enter the text')}
          onInput={e => e.currentTarget.setCustomValidity('')}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
