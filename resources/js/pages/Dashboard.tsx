import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="w-full">
        <div className="rounded-lg bg-background shadow">
          <div className="p-6 text-foreground">You're logged in!</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
