import { useEffect, useState } from "react";
import { useScreenSize } from "./use-screen-size";

export const useToggleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useScreenSize();

  useEffect(() => {
    width >= 640 ? setIsOpen(true) : setIsOpen(false);
  }, [width]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    setIsOpen,
    toggleSidebar,
  };
};
