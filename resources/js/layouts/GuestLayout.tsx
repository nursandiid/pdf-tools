import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      <div className="flex w-full max-w-md flex-col space-y-6 overflow-hidden rounded-lg bg-background p-6 shadow-md">
        <Link href="/" className="mx-auto">
          <img src="/img/logo-2.png" className="h-12" />
        </Link>

        {children}
      </div>
    </div>
  );
}
