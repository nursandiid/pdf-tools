import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { useFileStore } from "@/store/use-file-store";
import { useFilePreview } from "@/hooks/use-file-preview";
import { Rotation, Upload } from "@/types/upload";

import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/merge-pdf/Hero";
import FileInput from "@/components/uploads/FileInput";
import PdfThumbnailGrid from "@/components/uploads/PdfThumbnailGrid";
import DragFileOverlay from "@/components/uploads/DragFileOverlay";
import Sidebar from "@/components/Sidebar";
import Uploading from "@/components/uploads/Uploading";
import Processing from "@/components/uploads/Processing";
import RotationOptions from "@/components/rotate-pdf/RotationOptions";

export default function RotatePdf() {
  const { data, setData, post, processing } = useForm<
    Upload & { rotation: Rotation }
  >({
    files: null,
    token: uuid(),
    rotation: 0,
  });
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const { files, onDrag, setOnDrag } = useFileStore(
    useShallow((state) => ({
      files: state.files,
      onDrag: state.onDrag,
      setOnDrag: state.setOnDrag,
    })),
  );

  const { onSelectFile, handleOnDrop, deleteFile } = useFilePreview({
    multiple: true,
    type: "pdf",
  });

  useEffect(() => {
    setData("files", files);
  }, [files]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("rotate_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="Rotate PDF">
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
            title="Rotate PDF"
            description="Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once."
            btn={{ title: "Select PDF files", className: "btn btn-indigo" }}
            dropLabel="or drop PDFs here"
          />
        )}

        <FileInput
          onSelectFile={onSelectFile}
          multiple={true}
          accept="application/pdf"
        />

        <PdfThumbnailGrid
          files={files}
          deleteFile={deleteFile}
          className="btn btn-indigo"
          rotateStyle={
            data.rotation === -90
              ? { transform: `rotate(-90deg)` }
              : { transform: `rotate(${data.rotation}deg)` }
          }
        />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        {recentlySuccessful && (
          <Processing
            title="Rotating PDF..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Wrapper>

      <Sidebar
        title="Rotate PDF"
        btn={{
          title: "Rotate PDF",
          className: "btn btn-indigo",
          onSubmit: submit,
        }}
      >
        <RotationOptions data={data} setData={setData} />
      </Sidebar>
    </AppLayout>
  );
}
