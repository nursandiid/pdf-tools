import { HTMLAttributes } from "react";

export default function InputError({
  message,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p {...props} className={"text-red text-sm " + className}>
      {message}
    </p>
  ) : null;
}
