import clsx from "clsx";
import { Log } from "@/types/log";

type BadgeStatusProps = {
  item: Log;
};

export default function BadgeStatus({ item }: BadgeStatusProps) {
  const Badge = () => {
    let className = "";
    let statusText = "";

    switch (item.status) {
      case "failed":
        className = "bg-red text-white";
        statusText = "Failed to process";
        break;

      case "success":
        className = "bg-green text-white";
        statusText = "Successfully processed";
        break;

      case "processing":
        className = "bg-orange-500 text-white";
        statusText = "Task is processing";
        break;

      case "deleted":
        className = "bg-gray-400 dark:bg-gray-600 text-white";
        statusText = "Task has been deleted";
        break;

      default:
        className = "bg-gray-200 text-black";
        statusText = "Unknown status";
        break;
    }

    return (
      <span
        className={clsx(
          "whitespace-nowrap rounded-lg px-2 py-1 text-xs",
          className,
        )}
      >
        {statusText}
      </span>
    );
  };

  return <Badge />;
}
