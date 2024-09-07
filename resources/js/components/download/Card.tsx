import { Link } from "@inertiajs/react";
import { BsChevronRight } from "react-icons/bs";

type CardProps = {
  title: string;
  imageUrl: string;
  href: string;
};

export default function Card({ title, imageUrl, href }: CardProps) {
  return (
    <Link
      className="flex w-full items-center gap-4 rounded-lg p-2 outline-none transition-all hover:bg-secondary dark:hover:bg-background"
      href={href}
    >
      <div>
        <img src={imageUrl} alt={title} className="w-6" />
      </div>
      <h5 className="shrink-0 text-sm">{title}</h5>
      <BsChevronRight className="ml-auto" />
    </Link>
  );
}
