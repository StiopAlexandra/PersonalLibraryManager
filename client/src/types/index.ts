export interface BaseBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  briefDescription: string;
}

export type AudioBook = BaseBook & {
  minutes: number;
};

export type PaperBook = BaseBook & {
  pages: number;
};

export type Book = AudioBook | PaperBook;
