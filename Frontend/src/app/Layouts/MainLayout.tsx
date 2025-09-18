"use client";
import { PropsWithChildren, useState } from "react";
import { SideBarComponent } from "../components/SideBarComponent";
import { TopBar } from "../components/TopBar";

export const MainLayout = ({ children, showSidebar = true }: PropsWithChildren<{ showSidebar?: boolean }>) => {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false);
  
  const toogleToggled = () => {
    setToggled(!toggled);
  };

  const toogleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && (
        <SideBarComponent collapsed={collapsed} toggled={toggled} setToggled={toogleToggled} />
      )}
      <div className="flex flex-col flex-1">
        <TopBar toggled={toogleToggled} collapsed={toogleCollapsed} showSidebar={showSidebar} />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};
