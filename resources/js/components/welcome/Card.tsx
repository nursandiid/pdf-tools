import { Link } from "@inertiajs/react";
import { Service } from "@/components/welcome/Services";

export default function Card({
  title,
  description,
  imageUrl,
  href,
  premium,
}: Service) {
  return (
    <Link
      href={href}
      className="relative flex flex-col gap-2 rounded-lg border-2 border-transparent bg-background p-4 text-center shadow outline-none transition-all hover:scale-105 hover:border-red focus:scale-105 focus:border-red dark:bg-secondary dark:shadow-black/25 lg:max-w-xs"
    >
      <div className="mx-auto">
        <img src={imageUrl} alt={title} />
      </div>
      <h5 className="text-xl font-semibold">{title}</h5>
      <p className="text-sm text-foreground/60">{description}</p>

      {premium && (
        <span className="absolute right-4 top-4 rounded-lg border border-red px-2 pb-1 pt-0.5 text-xs font-semibold leading-3 text-red">
          Upgrade
        </span>
      )}
    </Link>
  );
}
