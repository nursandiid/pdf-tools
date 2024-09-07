import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { v4 as uuid } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { useFileStore } from "@/store/use-file-store";
import { useFilePreview } from "@/hooks/use-file-preview";
import { Upload } from "@/types/upload";

import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/merge-pdf/Hero";
import FileInput from "@/components/uploads/FileInput";
import ImageThumbnailGrid from "@/components/uploads/ImageThumbnailGrid";
import DragFileOverlay from "@/components/uploads/DragFileOverlay";
import Sidebar from "@/components/Sidebar";
import Uploading from "@/components/uploads/Uploading";
import Processing from "@/components/uploads/Processing";

export default function PowerpointToPdf() {
  const { data, setData, post, processing } = useForm<Upload>({
    files: null,
    token: uuid(),
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
    type: "powerpoint",
  });

  useEffect(() => {
    setData("files", files);
  }, [files]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("powerpoint_to_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="Powerpoint to PDF">
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
            title="Powerpoint to PDF"
            description="Make PPT and PPTX slideshows to view by converting them to PDF."
            btn={{
              title: "Select Powerpoint files",
              className: "btn btn-orange",
            }}
            dropLabel="or drop powerpoints here"
          />
        )}

        <FileInput
          onSelectFile={onSelectFile}
          multiple={true}
          accept=".ppt,.pptx"
        />

        <ImageThumbnailGrid
          files={files}
          deleteFile={deleteFile}
          className="btn btn-orange"
        />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        {recentlySuccessful && (
          <Processing
            title="Converting Powerpoint to PDF..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Wrapper>

      <Sidebar
        title="Powerpoint to PDF"
        btn={{
          title: "Convert to PDF",
          className: "btn btn-orange",
          onSubmit: submit,
        }}
      />
    </AppLayout>
  );
}
