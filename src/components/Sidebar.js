"use client";

import React, { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  Users,
  Settings,
  FileText,
  Bell,
  Plus,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: Folder },
  { label: "Tasks", icon: CheckSquare },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
  { label: "Files", icon: FileText },
  { label: "All Updates", icon: Bell },
];

const Sidebar = ({ currentView, setCurrentView }) => {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsOpen(false); // close sidebar on mobile
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#4d39e6] flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 grid place-items-center font-bold text-white">
            TF
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">
              TaskFlow
            </p>
            <p className="text-white/70 text-xs">Project manager</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white"
        >
          {isOpen ? <Menu className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
            font-sans
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-[280px]
          bg-gradient-to-b from-[#5f47ff] to-[#3b2ac9]
          text-white
          flex flex-col justify-between
          p-6 lg:p-8
          gap-6
          shadow-[0_24px_80px_rgba(71,45,255,0.12)]
          shrink-0
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col gap-8">
          {/* Mobile Close */}
          {/* <div className="flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 grid place-items-center font-bold">
                TF
              </div>
              <span className="font-bold">TaskFlow</span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div> */}

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-12 h-12 rounded-[18px] grid place-items-center bg-white/14 text-white font-bold text-base">
              TF
            </div>

            <div>
              <p className="m-0 text-base font-bold">TaskFlow</p>
              <p className="m-0 mt-0.5 text-[0.85rem] text-white/72">
                Project manager
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.label;

                return (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavigation(item.label)}
                      className={`
                        w-full flex items-center gap-4
                        p-[0.95rem_1rem]
                        rounded-[1.5rem]
                        text-white/90
                        transition-all duration-200
                        hover:bg-white/12
                        hover:text-white
                        hover:translate-x-[2px]
                        ${
                          isActive ? "bg-white/18 text-white font-semibold" : ""
                        }
                      `}
                    >
                      <Icon className="w-[1.2rem] h-[1.2rem]" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Workspace */}
          {(currentView === "Projects" || currentView === "Tasks") && (
            <div className="flex flex-col gap-4 mt-4 border-t border-white/10 pt-6 animate-fadeIn">
              <div className="flex items-center justify-between text-white/60 text-sm px-2">
                <span className="font-semibold tracking-wide">Workspace</span>

                <Plus className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="flex flex-col gap-1">
                <button className="w-full flex items-center justify-between bg-white/10 text-white px-3 py-2.5 rounded-xl text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-white/70" />
                    <span>Fintask Web ..</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 bg-white/8 border border-white/14 rounded-[1.5rem] p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0">
                <UserButton afterSignOutUrl="/" />
              </div>

              <div className="flex flex-col justify-center min-w-0">
                <strong className="text-[0.95rem] leading-tight font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {isLoaded && user ? user.fullName : "Loading..."}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile spacing */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Sidebar;
