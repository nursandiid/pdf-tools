import { PropsWithChildren } from "react";

import NavBar from "@/components/NavBar";
import Sidebar from "@/components/authenticated/Sidebar";

export default function Authenticated({ children }: PropsWithChildren) {
  return (
    <div className="mt-16 min-h-screen bg-secondary">
      <NavBar />

      <main className="flex flex-col gap-6 p-4 sm:flex-row sm:p-6">
        <Sidebar />

        {children}
      </main>
    </div>
  );
}
