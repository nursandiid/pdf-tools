import { router } from "@inertiajs/react";
import { Log } from "@/types/log";
import { BsDownload, BsTrash } from "react-icons/bs";
import { PageProps } from "@/types";
import { toast } from "sonner";

type ActionsProps = {
  item: Log;
};

export default function Actions({ item }: ActionsProps) {
  const deleteTask = () => {
    if (confirm("Are u sure to delete the task?")) {
      router.delete(route("activity.destroy", item.id), {
        onSuccess: (response) => {
          const props = response.props as unknown as PageProps;
          toast.success(props.success_msg);
        },
        onError: (response) => {
          const props = response.props as unknown as PageProps;
          toast.error(props.error_msg);
        },
      });
    }
  };

  return (
    <div className="flex gap-2">
      {item.status !== "deleted" && (
        <button
          className="btn btn-red flex h-8 w-8 items-center justify-center p-0"
          onClick={deleteTask}
        >
          <BsTrash />
        </button>
      )}

      {item.status === "success" && (
        <a
          className="btn btn-green flex h-8 w-8 items-center justify-center p-0"
          href={item.download_path}
          download={true}
        >
          <BsDownload />
        </a>
      )}
    </div>
  );
}
