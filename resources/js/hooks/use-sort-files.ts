import { useFileStore } from "@/store/use-file-store";
import { useShallow } from "zustand/react/shallow";

export const useSortFiles = () => {
  const { files, setFiles, sort, sortDesc } = useFileStore(
    useShallow((state) => ({
      files: state.files,
      setFiles: state.setFiles,
      sort: state.sort,
      sortDesc: state.sortDesc,
    })),
  );

  const handleSort = () => {
    const sortedFiles = [...files].sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    );

    sortDesc();
    setFiles(sortedFiles);
  };

  const handleSortDesc = () => {
    const sortedFiles = [...files].sort((a, b) =>
      a.name > b.name ? -1 : a.name < b.name ? 1 : 0,
    );

    sort();
    setFiles(sortedFiles);
  };

  return { handleSort, handleSortDesc };
};
