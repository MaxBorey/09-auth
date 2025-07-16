import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css';
import Link from 'next/link';

  

const Header = async () => {
  const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        <span className={css.logoNote}>Notehub</span>
      </Link>
      <nav aria-label="Main Navigation" role="navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu tags={tags} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
