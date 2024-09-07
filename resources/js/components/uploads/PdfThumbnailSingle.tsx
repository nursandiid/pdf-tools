import { Preview } from "@/types/upload";
import { formatFileSize } from "@/utils";

import ThumbnailWrapper from "@/components/uploads/ThumbnailWrapper";
import PdfThumbnail from "@/components/uploads/PdfThumbnail";

type PdfThumbnailSingleProps = {
  file: Preview;
};

export default function PdfThumbnailSingle({ file }: PdfThumbnailSingleProps) {
  return (
    file && (
      <div className="relative grid w-full grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        <ThumbnailWrapper>
          <div className="my-auto flex">
            <PdfThumbnail file={file} pageIndex={() => 0} />
          </div>

          <div className="mt-auto w-full overflow-hidden">
            <h5 className="truncate text-sm">{file.name}</h5>
            <p className="text-xs text-secondary-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
        </ThumbnailWrapper>
      </div>
    )
  );
}
