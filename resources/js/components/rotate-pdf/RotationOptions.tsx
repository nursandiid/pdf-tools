import { useEffect, useState } from "react";
import { Rotation } from "@/types/upload";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";

type RotationOptionsProps = {
  data: any;
  setData: (key: string, value: any) => void;
};

export default function RotationOptions({
  data,
  setData,
}: RotationOptionsProps) {
  const [rotation, setRotation] = useState<Rotation>(data.rotation);

  useEffect(() => {
    setData("rotation", rotation);
  }, [rotation]);

  const rotateRight = () => {
    rotation === 180
      ? setRotation(-90)
      : setRotation((prev) => (prev + 90) as Rotation);
  };

  const rotateLeft = () => {
    rotation === 0
      ? setRotation(-90)
      : rotation === -90
        ? setRotation(180)
        : setRotation((prev) => (prev - 90) as Rotation);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <p>Rotation</p>
        <button
          className="text-red outline-none hover:underline focus:underline"
          onClick={() => setRotation(0)}
        >
          Reset All
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <button className="btn btn-checkbox p-0" onClick={rotateRight}>
          <span className="flex h-12 w-12 items-center justify-center rounded-l-lg bg-red text-white">
            <BsArrowClockwise className="text-2xl" />
          </span>
          <span className="my-auto flex-1 flex-grow pl-4 text-left">Right</span>
        </button>
        <button className="btn btn-checkbox p-0" onClick={rotateLeft}>
          <span className="flex h-12 w-12 items-center justify-center rounded-l-lg bg-red text-white">
            <BsArrowCounterclockwise className="text-2xl" />
          </span>
          <span className="my-auto flex-1 flex-grow pl-4 text-left">Left</span>
        </button>
      </div>
    </div>
  );
}
