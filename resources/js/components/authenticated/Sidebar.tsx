import clsx from "clsx";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BsBoxArrowRight, BsPersonCircle } from "react-icons/bs";
import Dropdown from "@/components/Dropdown";

export default function Sidebar() {
  const user = usePage<PageProps>().props.auth.user;

  return (
    <aside className="h-full w-full md:sticky md:top-[88px] md:max-w-xs md:shrink-0">
      <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-4 shadow sm:p-6">
        <div className="flex items-center gap-4">
          <div>
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full"
            />
          </div>
          <div>
            <strong className="text-red">Registered</strong>
            <h5 className="text-foreground">{user.name}</h5>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-foreground">Profile</h5>
          <hr className="my-2 border-secondary dark:border-gray-500/25" />
          <Dropdown.Link
            href={route("profile.edit")}
            className={clsx(route().current("profile.edit") && "bg-secondary")}
          >
            <div className="flex items-center gap-2">
              <BsPersonCircle />
              My Account
            </div>
          </Dropdown.Link>
          <Dropdown.Link href={route("logout")} as="button" method="post">
            <div className="flex items-center gap-2">
              <BsBoxArrowRight />
              Log out
            </div>
          </Dropdown.Link>
        </div>
      </div>
    </aside>
  );
}
