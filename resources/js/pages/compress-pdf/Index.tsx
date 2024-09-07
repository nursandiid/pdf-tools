import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { useFileStore } from "@/store/use-file-store";
import { useFilePreview } from "@/hooks/use-file-preview";
import { CompressionLevel, Upload } from "@/types/upload";

import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/merge-pdf/Hero";
import FileInput from "@/components/uploads/FileInput";
import PdfThumbnailSingle from "@/components/uploads/PdfThumbnailSingle";
import DragFileOverlay from "@/components/uploads/DragFileOverlay";
import Sidebar from "@/components/Sidebar";
import Uploading from "@/components/uploads/Uploading";
import Processing from "@/components/uploads/Processing";
import CompressionOptions from "@/components/compress-pdf/CompressionOptions";

export default function CompressPdf() {
  const { data, setData, post, processing } = useForm<
    Upload & { level: CompressionLevel }
  >({
    files: null,
    token: uuid(),
    level: "recommended",
  });
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const { files, onDrag, setOnDrag } = useFileStore(
    useShallow((state) => ({
      files: state.files,
      onDrag: state.onDrag,
      setOnDrag: state.setOnDrag,
    })),
  );

  const { onSelectFile, handleOnDrop } = useFilePreview({
    multiple: false,
    type: "pdf",
  });

  useEffect(() => {
    setData("files", files);
  }, [files]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("compress_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="Compress PDF file">
      <Wrapper
        tabIndex={0}
        onDragEnter={() => setOnDrag(true)}
        onDragExit={() => setOnDrag(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleOnDrop}
        className="!h-[calc(100vh_-_128px)]"
      >
        {files.length === 0 && (
          <Hero
            title="Compress PDF file"
            description="Reduce file size while optimizing for maximal PDF quality."
            btn={{ title: "Select PDF file", className: "btn btn-green" }}
            dropLabel="or drop PDF here"
          />
        )}

        <FileInput
          onSelectFile={onSelectFile}
          multiple={false}
          accept="application/pdf"
        />

        <PdfThumbnailSingle file={files[0]} />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        {recentlySuccessful && (
          <Processing
            title="Compressing PDF..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Wrapper>

      <Sidebar
        title="Compression level"
        btn={{
          title: "Compress PDF",
          className: "btn btn-green",
          onSubmit: submit,
        }}
      >
        <CompressionOptions data={data} setData={setData} />
      </Sidebar>
    </AppLayout>
  );
}
