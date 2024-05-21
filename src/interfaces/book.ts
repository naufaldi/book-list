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
  cover: FileList | undefined;
  publicationDate: string;
}
