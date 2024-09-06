import { Plugin, RenderViewer, Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { Preview } from "@/types/upload";
import { BsArrowClockwise } from "react-icons/bs";

type PageThumbnailPluginProps = {
  PageThumbnail: React.ReactElement;
};

type PdfThumbnailProps = {
  file: Preview;
  pageIndex: (props?: { numPages: number }) => number;
  onLoad?: (props?: { numPages: number }) => number;
};

export const pageThumbnailPlugin = (
  props: PageThumbnailPluginProps,
): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      let { slot } = renderProps;

      slot.children = PageThumbnail;

      if (slot.subSlot) {
        slot.subSlot.attrs = {};
        slot.subSlot.children = <></>;
      }

      return slot;
    },
  };
};

export default function PdfThumbnail({
  file,
  pageIndex,
  onLoad,
}: PdfThumbnailProps) {
  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 150,
  });

  const { Cover } = thumbnailPluginInstance;

  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={pageIndex} width={150} />,
  });

  return (
    <Viewer
      plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
      fileUrl={file.preview}
      renderLoader={() => (
        <div className="mx-auto h-36 items-center">
          <BsArrowClockwise className="animate-spin text-3xl" />
        </div>
      )}
      onDocumentLoad={async (e) => {
        onLoad && onLoad({ numPages: e.doc.numPages });
      }}
    />
  );
}
