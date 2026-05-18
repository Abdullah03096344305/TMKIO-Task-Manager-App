import React from "react";
import Link from "next/link";

import ProjectGrid from "./ProjectGrid";
import TaskAnalytics from "./TaskAnalytics";

import { ChevronLeft, HardDrive } from "lucide-react";

const DashboardView = () => {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 cursor-pointer hover:text-slate-200 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span>Dashboard / Main View</span>
        <Link href="/admin/files" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
          <HardDrive className="w-4 h-4" />
          <span>Admin: Files</span>
        </Link>
      </div>
      <ProjectGrid />
      <TaskAnalytics />
    </div>
  );
};

export default DashboardView;
