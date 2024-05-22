export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
}
export interface InputBook {
  title: string;
  author: string;
  description: string;
  cover: FileList | string | undefined;
  publicationDate: string;
}

export interface BookFormProps {
  book: InputBook | null;
  onSave: (data: InputBook) => void;
}
