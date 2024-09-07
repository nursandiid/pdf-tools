import clsx from "clsx";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

import FormAlert from "@/components/FormAlert";
import TextInput from "@/components/TextInput";

type SplitOptionsProps = {
  data: any;
  setData: (key: string, value: any) => void;
};

export default function SplitOptions({ data, setData }: SplitOptionsProps) {
  const updatePages = (pages: string) => {
    setData("pages", pages);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Extract mode:</p>

      <TabGroup>
        <TabList className="flex w-full justify-between gap-2">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  "btn btn-checkbox flex-1 items-center justify-center",
                  selected && "bg-secondary !ring-red",
                )}
                onClick={() => updatePages("all")}
              >
                Extract all pages
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  "btn btn-checkbox flex-1 items-center justify-center",
                  selected && "bg-secondary !ring-red",
                )}
                onClick={() => updatePages("empty")}
              >
                Select pages
              </button>
            )}
          </Tab>
        </TabList>

        <TabPanels className="py-4">
          <TabPanel className="flex flex-col">
            <FormAlert
              message="All pages will be converted into separate PDF files."
              className="text-sm font-normal"
            />
          </TabPanel>
          <TabPanel className="flex flex-col gap-2">
            <label htmlFor="selected-pages">Pages to extract:</label>
            <TextInput
              placeholder="example: 1,5-8"
              onChange={(e) => updatePages(e.target.value)}
              id="selected-pages"
            />

            <FormAlert
              message="Selected pages will be converted into separate PDF files."
              className="text-sm font-normal"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
