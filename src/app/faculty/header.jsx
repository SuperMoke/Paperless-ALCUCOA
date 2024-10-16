import React, { useState, useEffect } from "react";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArchiveBoxIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userEmail = currentUser.email;
            const db = getFirestore();
            const userQuery = query(
              collection(db, "userdata"),
              where("email", "==", userEmail)
            );
            const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const userData = doc.data();
                  setUserName(userData.name);
                  setProfileUrl(userData.profileUrl);
                });
              } else {
                console.error("User not found or role not specified");
              }
            });
            return () => unsubscribe();
          }
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const router = useRouter();
  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <header className="bg-blue-gray-50 shadow-md py-4 px-4 sm:px-10 flex justify-between items-center">
      <Link href="/faculty">
        <Image src={"/Logo.png"} width={60} height={60} alt="Logo"></Image>
      </Link>
      <Link href="/faculty">
        <Typography variant="h5" className="font-semibold ml-5">
          Paperless Alcucoa System
        </Typography>
      </Link>
      <div className="flex items-center space-x-4 ml-auto">
        <Link
          href="/faculty/faculty_portfolio"
          className="flex items-center gap-3 p-2 mr-2 rounded-md"
        >
          <ArchiveBoxIcon className="h-6 w-6" />
          <Typography className="text-lg">Portfolio</Typography>
        </Link>
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar src={profileUrl || "/Avatar.jpg"} alt="User" size="s" />
              <Typography
                variant="small"
                className="text-base hidden sm:block "
              >
                {userName}
              </Typography>
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <Link href="/faculty/faculty_profile">
                <Button variant="text" className="flex items-start gap-3">
                  <UserCircleIcon className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Button
                variant="text"
                className="flex items-start gap-3"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Logout
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}
