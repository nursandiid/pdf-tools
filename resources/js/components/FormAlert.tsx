import clsx from "clsx";

type FormAlertProps = {
  message: string | React.ReactNode;
  className?: string;
};

export default function FormAlert({ message, className }: FormAlertProps) {
  return (
    <div
      className={clsx(
        "bg-green/25 text-green-dark dark:bg-green/10 rounded-lg px-4 py-3 font-medium",
        className,
      )}
    >
      {message}
    </div>
  );
}
