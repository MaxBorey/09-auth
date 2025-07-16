import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist on NoteHub.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist on NoteHub.',
    url: 'https://notehub.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found | NoteHub',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
