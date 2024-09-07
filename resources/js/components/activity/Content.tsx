import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useDebounce } from "@/hooks/use-debounce";
import { PageProps } from "@/types";
import { Log } from "@/types/log";
import { Paginate } from "@/types/paginate";

import Filters from "@/components/activity/Filters";
import Table from "@/components/activity/Table";
import Pagination from "@/components/activity/Pagination";

export type DoPaginateType = {
  page: number;
  rows: number | string;
  search: string;
};

export default function Content() {
  const { data, auth } = usePage<PageProps<{ data: Paginate<Log[]> }>>().props;
  const [rows, setRows] = useState<number | string>(route().params.rows || 10);
  const [search, setSearch] = useState(route().params.search || "");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    window.Echo.channel(`task-processing-${auth.user.id}`).listen(
      ".task-processing",
      () => router.reload(),
    );

    window.Echo.channel(`task-processing-failed-${auth.user.id}`).listen(
      ".task-processing-failed",
      () => router.reload(),
    );

    window.Echo.channel(`task-processed-successfully-${auth.user.id}`).listen(
      ".task-processed-successfully",
      () => router.reload(),
    );
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      doPaginate({
        page: 1,
        rows,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  const handleChangeRows = (value: number | string) => {
    setRows(value);

    doPaginate({
      page: 1,
      rows: value,
      search: debouncedSearch,
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const doPaginate = ({ page, rows, search }: DoPaginateType) => {
    router.get(
      route().current()!,
      {
        page,
        rows,
        search,
      },
      {
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <div className="w-full overflow-auto">
      <div className="w-full space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-6 overflow-auto rounded-lg bg-background p-4 shadow sm:p-8">
          <header>
            <h2 className="text-lg font-medium text-foreground">Last Tasks</h2>
            <p className="mt-1 text-sm text-secondary-foreground">
              All your files will be automatically deleted 1 day after being
              processed.
            </p>
          </header>

          <Filters
            rows={rows}
            search={search}
            handleChangeRows={handleChangeRows}
            handleSearch={handleSearch}
          />

          <Table data={data} />

          <Pagination
            data={data}
            rows={rows}
            search={search}
            doPaginate={doPaginate}
          />
        </div>
      </div>
    </div>
  );
}
