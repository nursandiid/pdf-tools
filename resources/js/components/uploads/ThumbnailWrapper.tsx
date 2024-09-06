import clsx from "clsx";

export default function ThumbnailWrapper({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "group relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg p-4 shadow transition-all hover:scale-105 dark:bg-secondary dark:shadow-black/25",
        className,
      )}
    >
      {children}
    </div>
  );
}
