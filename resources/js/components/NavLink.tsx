import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link
      {...props}
      className={
        "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "border-blue focus:border-blue text-foreground "
          : "border-transparent text-foreground hover:border-secondary hover:text-secondary-foreground focus:border-secondary focus:text-secondary-foreground ") +
        className
      }
    >
      {children}
    </Link>
  );
}
