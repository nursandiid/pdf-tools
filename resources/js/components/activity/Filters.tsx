import TextInput from "@/components/TextInput";

type FiltersProps = {
  rows: number | string;
  handleChangeRows: (rows: number | string) => void;
  search: string;
  handleSearch: (search: string) => void;
};

export default function Filters({
  rows,
  search,
  handleChangeRows,
  handleSearch,
}: FiltersProps) {
  return (
    <div className="flex w-full justify-between gap-4">
      <div className="mt-auto">
        <select
          id="rows"
          className="form-control"
          value={rows}
          onChange={(e) => handleChangeRows(e.target.value)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="all">All</option>
        </select>
        <label
          htmlFor="rows"
          className="hidden text-foreground lg:ml-2 lg:inline-flex"
        >
          entries per page
        </label>
      </div>

      <div>
        <label htmlFor="search" className="mr-2 text-foreground">
          Search:
        </label>
        <TextInput
          id="search"
          className="w-full"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
