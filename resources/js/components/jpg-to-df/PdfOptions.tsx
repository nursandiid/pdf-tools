import clsx from "clsx";
import { useState } from "react";
import { Margin, Orientation } from "@/types/upload";
import { BsImage } from "react-icons/bs";

import FormAlert from "@/components/FormAlert";
import CheckButton from "@/components/uploads/CheckButton";

type PdfOptionsProps = {
  data: any;
  setData: (key: string, value: any) => void;
};

export default function PdfOptions({ data, setData }: PdfOptionsProps) {
  const [orientation, setOrientation] = useState<Orientation>(data.orientation);
  const [margin, setMargin] = useState<Margin>(data.margin);

  const updateOrientation = (orientation: Orientation) => {
    setOrientation(orientation);
    setData("orientation", orientation);
  };

  const updateMargin = (margin: Margin) => {
    setMargin(margin);
    setData("margin", margin);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Page orientation</p>

      <div className="flex justify-between gap-2">
        <CheckButton
          className={clsx(orientation === "P" && "bg-secondary !ring-red")}
          currentValue={orientation}
          checkedValue="P"
          onClick={() => updateOrientation("P")}
        >
          <div className="flex flex-1 flex-col items-center gap-4">
            <span className="h-14 w-8 rounded border-2 border-black dark:border-gray-200" />
            <span>Potrait</span>
          </div>
        </CheckButton>
        <CheckButton
          className={clsx(orientation === "L" && "bg-secondary !ring-red")}
          currentValue={orientation}
          checkedValue="L"
          onClick={() => updateOrientation("L")}
        >
          <div className="flex flex-1 flex-col items-center gap-4">
            <span className="h-8 w-14 rounded border-2 border-black dark:border-gray-200" />
            <span>Landscape</span>
          </div>
        </CheckButton>
      </div>

      <p>Margin</p>

      <div className="flex flex-col justify-between gap-2">
        <CheckButton
          className={clsx(margin === 0 && "bg-secondary !ring-red")}
          currentValue={margin}
          checkedValue={0}
          onClick={() => updateMargin(0)}
        >
          <div className="flex flex-1 flex-col items-center gap-4">
            <BsImage className="text-4xl" />
            <span>No margin</span>
          </div>
        </CheckButton>
        <CheckButton
          className={clsx(margin === 14 && "bg-secondary !ring-red")}
          currentValue={margin}
          checkedValue={14}
          onClick={() => updateMargin(14)}
        >
          <div className="flex flex-1 flex-col items-center gap-4">
            <BsImage className="text-4xl" />
            <span>Small</span>
          </div>
        </CheckButton>
        <CheckButton
          className={clsx(margin === 28 && "bg-secondary !ring-red")}
          currentValue={margin}
          checkedValue={28}
          onClick={() => updateMargin(28)}
        >
          <div className="flex flex-1 flex-col items-center gap-4">
            <BsImage className="text-4xl" />
            <span>Big</span>
          </div>
        </CheckButton>
      </div>

      <FormAlert
        message="It will merge all images in one PDF file."
        className="text-sm font-normal"
      />
    </div>
  );
}
