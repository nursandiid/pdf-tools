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
      <div className="relative flex w-full justify-center gap-4 text-center">
        <ThumbnailWrapper className="!w-auto min-w-48 max-w-56">
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
