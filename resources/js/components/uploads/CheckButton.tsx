import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { BsCheck } from "react-icons/bs";

type Value = string | number;

type CheckButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    currentValue: Value;
    checkedValue: Value;
  }
>;

export default function CheckButton({
  currentValue,
  checkedValue,
  className,
  children,
  ...props
}: CheckButtonProps) {
  const Checked = ({ value }: { value: Value }) => {
    if (value !== currentValue) return;

    return (
      <span className="absolute right-2 top-2 h-4 w-4 rounded-full bg-green">
        <BsCheck className="text-white" />
      </span>
    );
  };

  return (
    <button
      {...props}
      className={clsx(
        "btn btn-checkbox relative flex-1 justify-center p-4",
        className,
      )}
    >
      {children}

      <Checked value={checkedValue} />
    </button>
  );
}
