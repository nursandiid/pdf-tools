import { create } from "zustand";
import { Preview, SortType } from "@/types/upload";

type State = {
  files: Preview[];
  sortType: SortType;
  onDrag: boolean;
  errors: string[];
  setFiles: (files: Preview[]) => void;
  sort: () => void;
  sortDesc: () => void;
  setOnDrag: (drag: boolean) => void;
  setErrors: (errors: string[]) => void;
  clearStore: () => void;
};

const initialState: Pick<State, "files" | "sortType" | "onDrag" | "errors"> = {
  files: [],
  sortType: "asc",
  onDrag: false,
  errors: [],
};

export const useFileStore = create<State>((set) => ({
  ...initialState,
  setFiles: (files) => set({ files }),
  sort: () => set({ sortType: "asc" }),
  sortDesc: () => set({ sortType: "desc" }),
  setOnDrag: (drag) => set({ onDrag: drag }),
  setErrors: (errors) => set({ errors }),
  clearStore: () => set(initialState),
}));
