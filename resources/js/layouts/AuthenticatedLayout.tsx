import { PropsWithChildren } from "react";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/authenticated/Sidebar";

export default function Authenticated({ children }: PropsWithChildren) {
  return (
    <div className="mt-16 min-h-screen bg-secondary">
      <NavBar />

      <main className="mx-auto flex flex-col gap-4 p-4 sm:max-w-7xl sm:flex-row sm:gap-6 sm:p-6">
        <Sidebar />

        {children}
      </main>
    </div>
  );
}
