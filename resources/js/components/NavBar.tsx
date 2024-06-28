import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useThemeStore } from "@/store/use-theme-store";

import {
  BsBoxArrowRight,
  BsCircleHalf,
  BsMoonStars,
  BsPersonCircle,
  BsSun,
} from "react-icons/bs";

import ApplicationLogo from "@/components/ApplicationLogo";
import Dropdown from "@/components/Dropdown";

export default function NavBar() {
  const { user } = usePage<PageProps>().props.auth;
  const [theme, setTheme] = useThemeStore((state) => [
    state.theme,
    state.setTheme,
  ]);

  const ThemeIcon = () => {
    switch (theme) {
      case "light":
        return <BsSun />;
      case "dark":
        return <BsMoonStars />;
      default:
        return <BsCircleHalf />;
    }
  };

  return (
    <header className="fixed top-0 z-20 h-16 w-full bg-red p-2 shadow shadow-red/25">
      <div className="mx-auto flex max-w-7xl justify-between">
        <Link href="/" className="flex shrink-0">
          <ApplicationLogo className="h-12" />
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <Dropdown>
              <Dropdown.Trigger>
                <div className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-white">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />

                  {user.name}
                </div>
              </Dropdown.Trigger>

              <Dropdown.Content contentClasses="mb-12 sm:mb-10">
                <Dropdown.Link href={route("profile.edit")}>
                  <div className="flex items-center gap-2">
                    <BsPersonCircle />
                    Profile
                  </div>
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} as="button" method="post">
                  <div className="flex items-center gap-2">
                    <BsBoxArrowRight />
                    Log out
                  </div>
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          ) : (
            <Link
              href={route("logout")}
              as="button"
              method="post"
              className="btn btn-red flex items-center gap-2 whitespace-nowrap rounded-full bg-red-dark"
            >
              <BsBoxArrowRight />
              Log in
            </Link>
          )}

          <div className="my-auto mr-0.5 h-10 w-0.5 border-l border-white/25" />

          <Dropdown>
            <Dropdown.Trigger>
              <button className="mr-2 flex h-8 items-center gap-1 text-white xl:mr-0">
                <ThemeIcon />
              </button>
            </Dropdown.Trigger>

            <Dropdown.Content contentClasses="mb-12 sm:mb-10">
              <Dropdown.Button onClick={() => setTheme("light")}>
                <div className="flex items-center gap-2">
                  <BsSun />
                  Light
                </div>
              </Dropdown.Button>
              <Dropdown.Button onClick={() => setTheme("dark")}>
                <div className="flex items-center gap-2">
                  <BsMoonStars />
                  Dark
                </div>
              </Dropdown.Button>
              <Dropdown.Button onClick={() => setTheme("system")}>
                <div className="flex items-center gap-2">
                  <BsCircleHalf />
                  Auto
                </div>
              </Dropdown.Button>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
