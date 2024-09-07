import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { useFileStore } from "@/store/use-file-store";
import { useFilePreview } from "@/hooks/use-file-preview";
import { ImageQuality, Upload } from "@/types/upload";

import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/merge-pdf/Hero";
import FileInput from "@/components/uploads/FileInput";
import PdfThumbnailSingle from "@/components/uploads/PdfThumbnailSingle";
import DragFileOverlay from "@/components/uploads/DragFileOverlay";
import Sidebar from "@/components/Sidebar";
import Uploading from "@/components/uploads/Uploading";
import Processing from "@/components/uploads/Processing";
import ImageOptions from "@/components/pdf-to-jpg/ImageOptions";

export default function PdfToJpg() {
  const { data, setData, post, processing } = useForm<
    Upload & { quality: ImageQuality }
  >({
    files: null,
    token: uuid(),
    quality: "normal",
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

    post(route("pdf_to_jpg.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="PDF to JPG">
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
            title="PDF to JPG"
            description="Convert each page of PDF into a JPG image."
            btn={{ title: "Select PDF file", className: "btn btn-yellow" }}
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
            title="Converting PDF to JPG..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Wrapper>

      <Sidebar
        title="PDF to Image options"
        btn={{
          title: "Convert to JPG",
          className: "btn btn-yellow",
          onSubmit: submit,
        }}
      >
        <ImageOptions data={data} setData={setData} />
      </Sidebar>
    </AppLayout>
  );
}
