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

export default function WordToPdf() {
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
    type: "word",
  });

  useEffect(() => {
    setData("files", files);
  }, [files]);

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("word_to_pdf.store"), {
      onSuccess: () => setRecentlySuccessful(true),
    });
  };

  return (
    <AppLayout title="Word to PDF">
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
            title="Word to PDF"
            description="Make DOC and DOCX files easy to read by converting them to PDF."
            btn={{ title: "Select Word files", className: "btn btn-blue" }}
            dropLabel="or drop words here"
          />
        )}

        <FileInput
          onSelectFile={onSelectFile}
          multiple={true}
          accept=".doc,.docx"
        />

        <ImageThumbnailGrid
          files={files}
          deleteFile={deleteFile}
          className="btn btn-blue"
        />

        <DragFileOverlay onDrag={onDrag} />

        {processing && <Uploading token={data.token} />}
        {recentlySuccessful && (
          <Processing
            title="Converting Word to PDF..."
            token={data.token}
            setRecentlySuccessful={setRecentlySuccessful}
          />
        )}
      </Wrapper>

      <Sidebar
        title="Word to PDF"
        btn={{
          title: "Convert to PDF",
          className: "btn btn-blue",
          onSubmit: submit,
        }}
      />
    </AppLayout>
  );
}
