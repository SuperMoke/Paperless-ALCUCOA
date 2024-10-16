import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Typography, IconButton } from "@material-tailwind/react";
import {
  HomeIcon,
  AcademicCapIcon,
  QrCodeIcon,
  XMarkIcon,
  UserIcon,
  ComputerDesktopIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  UserGroupIcon,
  ClipboardIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { AiOutlineAudit } from "react-icons/ai";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="relative">
        <aside
          className={`bg-[#0b2617] text-white shadow-md w-64 h-screen fixed left-0 top-0 p-4 transition-transform duration-300 ease-in-out z-50 flex flex-col ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="flex justify-center items-center mb-6 ">
            <Image src="/Logo.png" width={150} height={150} alt="Logo" />
          </div>
          <nav className="flex-grow">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <HomeIcon className="h-6 w-6" />
                  <Typography className="text-lg">Home</Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/admin_forms"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <ClipboardDocumentListIcon className="h-6 w-6" />
                  <Typography className="text-lg">Forms</Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/admin_portfolio"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <ArchiveBoxIcon className="h-6 w-6" />
                  <Typography className="text-lg">Portfolio</Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/admin_files"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <FolderIcon className="h-6 w-6" />
                  <Typography className="text-lg">Files</Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/admin_files"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <AcademicCapIcon className="h-6 w-6" />
                  <Typography className="text-lg">Student Form</Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/admin_audittrails"
                  className="flex items-center gap-3 p-2 hover:bg-[#163e2a] rounded-md"
                  onClick={toggleSidebar}
                >
                  <ClipboardIcon className="h-6 w-6" />
                  <Typography className="text-lg">Audit Trails</Typography>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto ">
            <Typography className="text-lg font-bold">
              {formatDate(currentDateTime)}
            </Typography>
            <Typography className="text-lg font-bold">
              {formatTime(currentDateTime)}
            </Typography>
          </div>
        </aside>
        {isOpen && (
          <IconButton
            variant="text"
            color="white"
            className="sm:hidden absolute top-4 right-4 z-50"
            onClick={toggleSidebar}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        )}
      </div>
    </>
  );
}
