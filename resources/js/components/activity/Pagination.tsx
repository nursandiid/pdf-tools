import clsx from "clsx";
import { Link } from "@inertiajs/react";
import { Log } from "@/types/log";
import { Paginate } from "@/types/paginate";
import { DoPaginateType } from "./Content";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type PaginationProps = {
  data: Paginate<Log[]>;
  rows: number | string;
  search: string;
  doPaginate: ({ page, rows, search }: DoPaginateType) => void;
};

export default function Pagination({
  data,
  rows,
  search,
  doPaginate,
}: PaginationProps) {
  return data.current_page ? (
    <div className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between">
      <div className="text-foreground">
        Showing {data.from} to {data.to} of {data.total} entries
      </div>
      <nav className="inline-flex gap-1">
        <Link
          href={data.prev_page_url!}
          className={clsx(
            "form-control inline-flex h-10 w-10 items-center justify-center border-transparent hover:bg-secondary/75 dark:border-transparent",
            data.current_page === 1 && "pointer-events-none",
          )}
        >
          <span className="sr-only">Previous</span>
          <BsChevronLeft />
        </Link>
        {Array.from({ length: data.last_page }).map((_, index) => (
          <button
            key={`page-${index}`}
            onClick={() =>
              doPaginate({
                page: index + 1,
                rows,
                search,
              })
            }
            className={clsx(
              "form-control inline-flex h-10 w-10 items-center justify-center border-transparent text-sm font-semibold dark:border-transparent",
              index + 1 === data.current_page
                ? "pointer-events-none border-none bg-red text-white hover:bg-red-dark"
                : "hover:bg-secondary/75",
            )}
          >
            {index + 1}
          </button>
        ))}
        <Link
          href={data.next_page_url!}
          className={clsx(
            "form-control inline-flex h-10 w-10 items-center justify-center border-transparent hover:bg-secondary/75 dark:border-transparent",
            (data.last_page === Number(route().params.page!) ||
              data.last_page === 1) &&
              "pointer-events-none",
          )}
        >
          <span className="sr-only">Next</span>
          <BsChevronRight />
        </Link>
      </nav>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between">
      <div className="text-foreground">
        Showing {1} to {data.data.length} of {data.data.length} entries
      </div>

      <nav className="inline-flex gap-1">
        <Link
          href=""
          className="form-control pointer-events-none inline-flex h-10 w-10 items-center justify-center border-transparent hover:bg-secondary/75 dark:border-transparent"
        >
          <span className="sr-only">Previous</span>
          <BsChevronLeft />
        </Link>
        <button className="form-control pointer-events-none inline-flex h-10 w-10 items-center justify-center border-none border-transparent bg-red text-sm font-semibold text-white hover:bg-red-dark dark:border-transparent">
          {1}
        </button>
        <Link
          href=""
          className="form-control pointer-events-none inline-flex h-10 w-10 items-center justify-center border-transparent hover:bg-secondary/75 dark:border-transparent"
        >
          <span className="sr-only">Next</span>
          <BsChevronRight />
        </Link>
      </nav>
    </div>
  );
}
