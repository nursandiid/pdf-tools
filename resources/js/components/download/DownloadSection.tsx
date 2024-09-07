import { useRef } from "react";
import { toast } from "sonner";
import { FaDownload } from "react-icons/fa6";
import { BsCopy } from "react-icons/bs";

import CopyToClipboard from "react-copy-to-clipboard";
import TextInput from "@/components/TextInput";

type DownloadSectionProps = {
  btnTitle: string;
  downloadPath: string;
};

export default function DownloadSection({
  btnTitle,
  downloadPath,
}: DownloadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const highlightText = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const textCopiedSuccessfully = () => {
    toast.success("Link has been successfully copied.");
    highlightText();
  };

  return (
    <>
      <div className="!my-8">
        <a
          href={downloadPath}
          download={true}
          className="btn btn-red mx-auto flex w-full max-w-xs items-center justify-center gap-4 rounded-xl py-4 text-xl font-semibold text-white shadow transition-all"
        >
          <FaDownload />
          {btnTitle}
        </a>
      </div>

      <p className="text-xl text-foreground/80">Copy & Send download link</p>
      <div className="flex items-center">
        <TextInput
          className="h-10 w-full rounded-r-none"
          value={window.location.host + downloadPath}
          readOnly
          ref={inputRef}
          onFocus={highlightText}
        />

        <CopyToClipboard
          text={window.location.host + downloadPath}
          onCopy={textCopiedSuccessfully}
        >
          <button className="btn btn-red flex h-10 items-center gap-2 rounded-l-none">
            <BsCopy />
            Copy
          </button>
        </CopyToClipboard>
      </div>
    </>
  );
}
