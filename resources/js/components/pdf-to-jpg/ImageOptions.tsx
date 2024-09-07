import clsx from "clsx";
import { useState } from "react";
import { ImageQuality } from "@/types/upload";

import FormAlert from "@/components/FormAlert";
import CheckButton from "@/components/uploads/CheckButton";

type ImageOptionsProps = {
  data: any;
  setData: (key: string, value: any) => void;
};

export default function ImageOptions({ data, setData }: ImageOptionsProps) {
  const [imageQuality, setImageQuality] = useState<ImageQuality>(data.quality);

  const updateQuality = (quality: ImageQuality) => {
    setImageQuality(quality);
    setData("quality", quality);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>PDF to JPG</p>
      <FormAlert
        message="Every page of this PDF will be converted into a JPG file."
        className="text-sm font-normal"
      />

      <hr className="my-4 border-secondary" />

      <p>Image Quality</p>
      <div className="flex justify-between gap-2">
        <CheckButton
          className={clsx(
            imageQuality === "normal" && "bg-secondary !ring-red",
          )}
          currentValue={imageQuality}
          checkedValue="normal"
          onClick={() => updateQuality("normal")}
        >
          Normal
        </CheckButton>

        <CheckButton
          className={clsx(imageQuality === "high" && "bg-secondary !ring-red")}
          currentValue={imageQuality}
          checkedValue="high"
          onClick={() => updateQuality("high")}
        >
          High
        </CheckButton>
      </div>
    </div>
  );
}
