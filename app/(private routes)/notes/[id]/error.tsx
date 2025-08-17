'use client';
import { ErrorProps } from '@/types/note';

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again...</button>
    </div>
  );
}
