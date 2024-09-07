import { useEffect, useState } from "react";
import { Preview } from "@/types/upload";
import { BsCheckLg } from "react-icons/bs";
import { formatFileSize } from "@/utils";

import ThumbnailWrapper from "@/components/uploads/ThumbnailWrapper";
import PdfThumbnail from "@/components/uploads/PdfThumbnail";

type PdfThumbnailRangeProps = {
  file: Preview;
  data: any;
};

export default function PdfThumbnailRange({
  file,
  data,
}: PdfThumbnailRangeProps) {
  const [lastPage, setLastPage] = useState<number>(1);
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (lastPage) {
      switch (data.pages) {
        case "all":
          const allPages = Array.from({ length: lastPage + 1 }).map(
            (_, index) => String(index + 1),
          );
          setPages(allPages);
          break;
        case "empty":
          setPages([]);
        default:
          const selectedPages: string[] = [];
          String(data.pages)
            .split(",")
            .forEach((range) => {
              const ranges = range.split("-");
              const selectedRange: string[] = [];

              const start = Number(range[0]);
              const end = Number(ranges[1]);

              if (ranges.length === 1) {
                selectedRange.push(start.toString());
              } else {
                for (let i = start; i < end + 1; i++) {
                  selectedRange.push(i.toString());
                }
              }

              selectedPages.push(...selectedRange);
            });

          setPages(selectedPages);
          break;
      }
    }
  }, [data, lastPage]);

  return (
    file && (
      <div className="relative grid w-full grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        <ThumbnailWrapper>
          <div className="my-auto flex">
            {pages.includes("1") && (
              <button className="btn btn-green absolute left-2 top-2 flex !h-6 !w-6 items-center justify-center rounded-full p-0 transition-all">
                <BsCheckLg />
              </button>
            )}

            <PdfThumbnail
              file={file}
              pageIndex={() => 0}
              onLoad={(props) => setLastPage(props?.numPages!)!}
            />
          </div>

          <div className="mt-auto w-full overflow-hidden">
            <h5 className="truncate text-sm">{file.name}</h5>
            <p className="text-xs text-secondary-foreground">
              {formatFileSize(file.size)}
            </p>

            <p className="text-xs text-secondary-foreground">(1)</p>
          </div>
        </ThumbnailWrapper>

        {lastPage !== 1 &&
          Array.from({ length: lastPage - 1 }).map((_, index) => (
            <ThumbnailWrapper key={`wrapper-${index}`}>
              <div className="my-auto flex">
                {pages.includes(`${index + 2}`) && (
                  <button className="btn btn-green absolute left-2 top-2 flex !h-6 !w-6 items-center justify-center rounded-full p-0 transition-all">
                    <BsCheckLg />
                  </button>
                )}

                <PdfThumbnail file={file} pageIndex={() => index + 1} />
              </div>

              <div className="mt-auto w-full overflow-hidden">
                <h5 className="truncate text-sm">{file.name}</h5>
                <p className="text-xs text-secondary-foreground">
                  {formatFileSize(file.size)}
                </p>

                <p className="text-xs text-secondary-foreground">
                  ({index + 2})
                </p>
              </div>
            </ThumbnailWrapper>
          ))}
      </div>
    )
  );
}
