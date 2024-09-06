import { Method } from "./method";

export type Preview = File & { preview: string };

export type SortType = "asc" | "desc";

export type Upload = {
  method?: Method;
  files: null | File[];
  token: string;
};
