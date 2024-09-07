import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import Content from "@/components/activity/Content";

export default function Activity() {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <Content />
    </AuthenticatedLayout>
  );
}
