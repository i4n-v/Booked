import { ICategory } from "../../../commons/ICategory";

export type BooksActionsProps = {
  filter?: boolean;
  publish?: boolean;
  handleOpenPublish?: (v: true) => void;
  handleFilter?: (v: any) => void;
  dateLabels?: {
    minDate?: string;
    maxDate?: string;
  };
};

export type BooksFilters = {
  min_date: string;
  max_date: string;
  categories: string[];
};
