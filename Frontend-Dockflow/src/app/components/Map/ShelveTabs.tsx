import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { ReactNode } from "react";

import "../../styles/styleMap.css";

// Definir el tipo para las tabs
type TabData = {
  label: string;
  content: ReactNode;
};

// Definir el tipo de las props que el componente recibirá
interface VerticalTabsProps {
  tabs: TabData[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ShelveTabs({ tabs }: VerticalTabsProps) {
  return (
    <TabGroup>
      <div className="flex space-x-4 texto-tab">
        {/* Lista de Tabs */}
        <TabList className="flex flex-col w-1/4 p-2 space-y-2 texto-tab">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  "w-full py-1.5 px-1.5 text-left rounded",
                  selected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black hover:bg-z-200"
                )
              }
            >
              <label style={{ fontSize: "7px" }}>
                {tab.label}
              </label>
            </Tab>
          ))}
        </TabList>

        {/* Panel de contenido */}
        <TabPanels className="w-3/4 p-2">
          {tabs.map((tab, index) => (
            <TabPanel key={index}>
              <h1 className="font-semibold">{tab.label}</h1>
              <div>{tab.content}</div>
            </TabPanel>
          ))}
        </TabPanels>
      </div>
    </TabGroup>
  );
}

export default ShelveTabs;
