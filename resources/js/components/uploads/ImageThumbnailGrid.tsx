import clsx from "clsx";
import { Preview } from "@/types/upload";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import { formatFileSize } from "@/utils";

import ThumbnailWrapper from "@/components/uploads/ThumbnailWrapper";

type ImageThumbnailGridProps = {
  files: Preview[];
  deleteFile: (file: Preview) => void;
  className?: string;
};

export default function ImageThumbnailGrid({
  files,
  deleteFile,
  className,
}: ImageThumbnailGridProps) {
  return (
    files.length > 0 && (
      <div className="relative grid w-full grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        {files.map((file) => (
          <ThumbnailWrapper key={file.preview}>
            <div className="my-auto flex">
              <img src={file.preview} alt={file.name} />
            </div>

            <div className="mt-auto w-full overflow-hidden">
              <h5 className="truncate text-sm">{file.name}</h5>
              <p className="text-xs text-secondary-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>

            <button
              className="btn btn-red absolute right-2 top-2 rounded-full px-2 opacity-0 transition-all group-hover:opacity-100"
              onClick={() => deleteFile(file)}
            >
              <BsXLg />
            </button>
          </ThumbnailWrapper>
        ))}

        <ThumbnailWrapper className="hover:!scale-100">
          <label
            htmlFor="files"
            tabIndex={1}
            className={clsx(
              "btn cursor-pointer rounded-full px-2 text-white shadow",
              className,
            )}
          >
            <BsPlusLg className="text-4xl" />
          </label>
        </ThumbnailWrapper>
      </div>
    )
  );
}
