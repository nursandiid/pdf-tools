import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { FaCircleNotch } from "react-icons/fa";

export default function Processing({
  title,
  token,
  setRecentlySuccessful,
}: {
  title: string;
  token: string;
  setRecentlySuccessful: (value: boolean) => void;
}) {
  const [hasPercentage, setHasPercentage] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    window.Echo.channel(`task-processing-${token}`).listen(
      ".task-processing",
      (data: { percentage: number }) => {
        setHasPercentage(true);
        setPercentage(data.percentage);
      },
    );

    window.Echo.channel(`task-processing-failed-${token}`).listen(
      ".task-processing-failed",
      (data: { message: string }) => {
        toast.error(data.message);
        setRecentlySuccessful(false);
      },
    );

    window.Echo.channel(`task-processed-successfully-${token}`).listen(
      ".task-processed-successfully",
      () => router.get(route("download_file", token)),
    );
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-10 flex flex-col items-center justify-center gap-2 bg-background p-4">
      <h5 className="text-2xl text-foreground/80">{title}</h5>
      <FaCircleNotch className="my-6 animate-spin text-8xl text-foreground/25" />

      {hasPercentage && (
        <>
          <h5 className="text-4xl font-bold text-foreground">{percentage}%</h5>
          <p className="text-lg">Processed</p>
        </>
      )}
    </div>
  );
}
