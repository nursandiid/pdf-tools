import { useEffect, useState } from "react";
import { PageProps } from "@/types";

import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import DownloadSection from "@/components/download/DownloadSection";
import Services from "@/components/download/Services";

export default function Download({
  service,
  download_path,
}: PageProps<{ service: string; download_path: string }>) {
  const [title, setTitle] = useState<string>();
  const [btnTitle, setBtnTitle] = useState<string>();

  useEffect(() => {
    switch (service) {
      case "merge_pdf":
        setTitle("PDFs have been merged!");
        setBtnTitle("Download merged PDF");
        break;
      case "split_pdf":
        setTitle("PDF has been split!");
        setBtnTitle("Download split PDFs");
        break;
      case "pdf_to_jpg":
        setTitle("PDF has been converted to JPG!");
        setBtnTitle("Download JPG images");
        break;
      case "jpg_to_pdf":
        setTitle("JPGs have been converted to PDF!");
        setBtnTitle("Download PDF");
        break;
      case "rotate_pdf":
        setTitle("PDF has been rotated!");
        setBtnTitle("Download rotated PDF");
        break;
      case "compress_pdf":
        setTitle("PDF has been compressed!");
        setBtnTitle("Download compressed PDF");
        break;
      case "word_to_pdf":
        setTitle("Word document has been converted to PDF!");
        setBtnTitle("Download PDF");
        break;
      case "powerpoint_to_pdf":
        setTitle("PowerPoint presentation has been converted to PDF!");
        setBtnTitle("Download PDF");
        break;
    }
  }, [service]);

  return (
    <AppLayout title="Download file" footer={true}>
      <Wrapper>
        <div className="mx-auto w-full max-w-4xl space-y-4 text-center lg:w-1/2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <DownloadSection btnTitle={btnTitle!} downloadPath={download_path} />
        </div>

        <div className="mx-auto w-full space-y-4 rounded-lg bg-background p-4 shadow dark:bg-secondary dark:shadow-black/25 lg:max-w-4xl">
          <Services />
        </div>
      </Wrapper>
    </AppLayout>
  );
}
