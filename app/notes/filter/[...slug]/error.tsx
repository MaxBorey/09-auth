'use client';
import { ErrorProps } from '@/types/note';


const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

export default Error;
