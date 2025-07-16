import { Note } from "../../types/note";

type NoteItemProps = {
  item: Note;
};

const NoteItem = ({ item }: NoteItemProps) => {
  return (
    <li>
      <p>{item.title}</p>
    </li>
  );
}

export default NoteItem;