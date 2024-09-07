import { Method } from "./method";

export type Preview = File & { preview: string };

export type SortType = "asc" | "desc";

export type Upload = {
  method?: Method;
  files: null | File[];
  token: string;
};

export type ImageQuality = "normal" | "high";

export type Orientation = "P" | "L";

export type Margin = 0 | 14 | 28;
