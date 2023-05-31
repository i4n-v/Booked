import { ICategory } from "./ICategory";
import IUser from "./IUser";

type Book = {
  id?: string;
  name: string;
  description: string;
  price: number;
  categories: ICategory[];
  free: boolean;
  file_url: string;
  photo_url: string;
  user: IUser;
};

interface BookCreate
  extends Omit<Book, "file_url" | "photo_url" | "id" | "user"> {
  photo: File;
  file: File;
  user_id: string;
}

interface BookUpdate extends BookCreate {
  id: string;
}

enum BookTypes {
  CREATE,
  UPDATE,
}

type IBook<T extends keyof typeof BookTypes | null = null> = T extends "CREATE"
  ? BookCreate
  : T extends "UPDATE"
  ? BookUpdate
  : Book;

export default IBook;