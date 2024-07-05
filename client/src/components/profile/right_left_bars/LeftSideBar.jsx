"use client";
import { FacebookOutlined } from "@ant-design/icons";
import { Bookmark, ChartPolar, SignOut, Users } from "@phosphor-icons/react";
import { LockKeyOpen, User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileLeftSideBar() {
  const [activeLink, setActiveLink] = useState("/settings");
  const router = usePathname();

  // Function to handle link click and set active link
  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  // Set default active link when component mounts
  useEffect(() => {
    setActiveLink(router);
  }, []);

  return (
    <aside className="relative block w-full sm:hidden">
      <div className="w-full min-h-screen">
        <Link href={"/settings"} onClick={() => handleLinkClick("/settings")}>
          <div
            className={
              activeLink === "/settings"
                ? "profile-active-link"
                : "flex gap-4 items-center m-4 px-2 py-1"
            }
          >
            <div className="profile-icons">
              <img
                src={
                  activeLink === "/settings"
                    ? "/icons/active-user.png"
                    : "/assets/svgs/profile-icon.svg"
                }
                size={22}
                color="#828282"
              />
            </div>
            <span className="text-secondary">Profile</span>
          </div>
        </Link>
        <Link
          href={"/settings/preferences"}
          onClick={() => handleLinkClick("/settings/preferences")}
        >
          <div
            className={
              activeLink === "/settings/preferences"
                ? "profile-active-link"
                : "flex gap-4 items-center m-4 px-2 py-1"
            }
          >
            <div className="profile-icons">
              <img
                src={
                  activeLink === "/settings/preferences"
                    ? "/icons/active-preference.png"
                    : "/assets/svgs/preference.svg"
                }
                size={22}
                color="#828282"
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-secondary">Preferences</span>{" "}
            </div>
          </div>
        </Link>
        <Link
          href={"/settings/social-accounts"}
          onClick={() => handleLinkClick("/settings/social-accounts")}
        >
          <div
            className={
              activeLink === "/settings/social-accounts"
                ? "profile-active-link"
                : "flex gap-4 items-center m-4 px-2 py-1"
            }
          >
            <div className="profile-icons">
              <img
                src={
                  activeLink === "/settings/social-accounts"
                    ? "/assets/svgs/facebook-icon.svg"
                    : "/icons/facebook.png"
                }
                size={22}
                color="#828282"
              />
            </div>
            <span className="text-secondary">Social Accounts</span>
          </div>
        </Link>
        <Link
          href={"/settings/change-password"}
          onClick={() => handleLinkClick("/settings/change-password")}
        >
          <div
            className={
              activeLink === "/settings/change-password"
                ? "profile-active-link"
                : "flex gap-4 items-center m-4 px-2 py-1"
            }
          >
            <div className="profile-icons">
              <img
                src={
                  activeLink === "/settings/change-password"
                    ? "/icons/active-lock.png"
                    : "/assets/svgs/lock.svg"
                }
                size={22}
                color="#828282"
              />
            </div>
            <span className="text-secondary">Change Password</span>
          </div>
        </Link>
        {/* Added logout link */}
        <Link
          href={"/#"}
          onClick={() => handleLinkClick("/#")}
          className="absolute bottom-0"
        >
          <div className="flex items-center gap-4 px-2 py-1 m-4 text-red-500">
            <div className="profile-icons">
              <SignOut size={28} color="#ff0000" />
            </div>
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
