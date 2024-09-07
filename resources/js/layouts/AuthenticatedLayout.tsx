import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { useThemeStore } from "@/store/use-theme-store";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/authenticated/Sidebar";

export default function Authenticated({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="mt-16 min-h-screen bg-secondary">
      <NavBar />

      <main className="mx-auto flex flex-col gap-4 p-4 sm:max-w-7xl sm:flex-row sm:gap-6 sm:p-6">
        <Sidebar />

        {children}
        <Toaster richColors duration={3000} closeButton theme={theme} />
      </main>
    </div>
  );
}
