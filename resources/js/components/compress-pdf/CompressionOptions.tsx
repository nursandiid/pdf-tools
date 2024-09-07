import clsx from "clsx";
import { useState } from "react";
import { CompressionLevel } from "@/types/upload";

import CheckButton from "@/components/uploads/CheckButton";

type CompressionOptionsProps = {
  data: any;
  setData: (key: string, value: any) => void;
};

export default function CompressionOptions({
  data,
  setData,
}: CompressionOptionsProps) {
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(
    data.level,
  );

  const updateLevel = (level: CompressionLevel) => {
    setCompressionLevel(level);
    setData("level", level);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <CheckButton
        className={clsx(
          compressionLevel === "recommended" && "bg-secondary !ring-red",
        )}
        currentValue={compressionLevel}
        checkedValue="recommended"
        onClick={() => updateLevel("recommended")}
      >
        <div className="flex flex-col text-left">
          <strong className="font-medium text-red">Recommended</strong>
          <span className="text-sm">Good quality, good compression</span>
        </div>
      </CheckButton>
      <CheckButton
        className={clsx(
          compressionLevel === "extreme" && "bg-secondary !ring-red",
        )}
        currentValue={compressionLevel}
        checkedValue="extreme"
        onClick={() => updateLevel("extreme")}
      >
        <div className="flex flex-col text-left">
          <strong className="font-medium text-red">Extreme</strong>
          <span className="text-sm">Less quality, high compression</span>
        </div>
      </CheckButton>
      <CheckButton
        className={clsx(compressionLevel === "low" && "bg-secondary !ring-red")}
        currentValue={compressionLevel}
        checkedValue="low"
        onClick={() => updateLevel("low")}
      >
        <div className="flex flex-col text-left">
          <strong className="font-medium text-red">Less</strong>
          <span className="text-sm">High quality, less compression</span>
        </div>
      </CheckButton>
    </div>
  );
}
