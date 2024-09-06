import clsx from "clsx";
import { useToggleSidebar } from "@/hooks/use-toggle-sidebar";
import { useFileStore } from "@/store/use-file-store";
import { Transition } from "@headlessui/react";
import { BsArrowRightCircle, BsLayoutSidebarReverse } from "react-icons/bs";

import SortButton from "@/components/uploads/SortButton";

type SidebarProps = {
  title: string;
  btn: {
    title: string;
    disabled?: boolean;
    className?: string;
    onSubmit: React.FormEventHandler<Element>;
  };
  children?: React.ReactNode;
};

export default function Sidebar({ title, btn, children }: SidebarProps) {
  const files = useFileStore((state) => state.files);
  const { isOpen, toggleSidebar } = useToggleSidebar();

  return (
    files.length > 0 && (
      <>
        <button
          className={clsx(
            "btn btn-close fixed top-20 p-2 text-white shadow-lg transition-all delay-75",
            btn.className,
            isOpen ? "right-[336px]" : "right-4",
          )}
          onClick={toggleSidebar}
        >
          <BsLayoutSidebarReverse className="text-xl" />
        </button>

        {files.length > 1 && <SortButton isOpen={isOpen} />}

        <Transition
          show={isOpen}
          enter="transition-transform duration-300 ease-out"
          enterFrom="transform opacitiy-0 translate-x-full"
          enterTo="transform opacity-100 translate-x-0"
          leave="transition-transform duration-300 ease-out"
          leaveFrom="transform opacitiy-100 translate-x-0"
          leaveTo="transform opacity-0 translate-x-full"
        >
          <aside className="fixed bottom-0 right-0 top-16 flex h-[calc(100vh_-_64px)] w-full max-w-xs shrink-0 flex-col bg-background text-foreground shadow dark:border-l dark:border-gray-500/25 dark:shadow-black/50 sm:sticky sm:mt-16">
            <div className="w-full border-b border-secondary p-4">
              <h5 className="text-center text-2xl font-semibold text-foreground">
                {title}
              </h5>
            </div>

            <div className="overflow-auto">{children}</div>

            <div className="mt-auto flex w-full gap-2 p-4">
              <button
                className={clsx(
                  "btn mx-auto flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xl text-white shadow transition-all",
                  btn.className,
                )}
                disabled={btn.disabled}
                onClick={btn.onSubmit}
              >
                {btn.title}
                <BsArrowRightCircle />
              </button>
            </div>
          </aside>
        </Transition>

        {!isOpen && (
          <div className="fixed bottom-0 right-0 flex w-full max-w-[300px] sm:hidden">
            <div className="mt-auto flex w-full gap-2 p-4">
              <button
                className={clsx(
                  "btn mx-auto flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xl text-white shadow transition-all",
                  btn.className,
                )}
                disabled={btn.disabled}
                onClick={btn.onSubmit}
              >
                {btn.title}
                <BsArrowRightCircle />
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
