import { FacebookOutlined } from "@ant-design/icons";
import {
  Bookmark,
  CaretLeft,
  CaretRight,
  ChartPolar,
  Users,
} from "@phosphor-icons/react";
import { LockKeyOpen, User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobProfileLeftSideBar() {
  const [activeLink, setActiveLink] = useState("/settings");

  const router = usePathname();

  // Function to handle link click and set active link
  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  // Set default active link when component mounts
  useEffect(() => {
    setActiveLink(router.pathname);
  }, []);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Get the last part of the URL
  const currentPage = router.split("/").pop();
  // Array of pages to hide all divs
  const hideDivsPages = [
    "preferences",
    "social-accounts",
    "change-password",
    "profile",
  ];
  return (
    <aside className="w-[100%] pt-6 sm:flex hidden mobile-left sm:pt-0">
      <div className="w-full">
        <div className="hide-main-setting">
          <Link href="/settings">
            <div className="flex items-center p-3 bg-white">
              <div className="mr-2">
                <CaretLeft size={28} color="#0F0F0F" />
              </div>
              <span className="text-[#0F0F0F] flex-[80%] font-semibold">
                {capitalizeFirstLetter(
                  router.split("/").pop().replace(/-/g, " ") || "Settings"
                )}
              </span>
            </div>
          </Link>
        </div>
        <div>
          <div
            className={`hide-settings ${
              hideDivsPages.includes(currentPage) ? "hidden" : ""
            }`}
          >
            <Link
              href={"/settings/profile"}
              onClick={() => handleLinkClick("/settings/profile")}
            >
              <div
                className={`rounded-xl flex gap-4 items-center p-3 bg-white m-4 ${
                  activeLink === "/settings/profile"
                    ? "mob-active-link "
                    : " bg-white"
                }`}
              >
                <div className="profile-icons">
                  <img
                    src="/assets/svgs/profile-icon.svg"
                    size={22}
                    color="#828282"
                  />
                </div>
                <span className="text-[#0F0F0F] flex-[80%]">Profile</span>
                <div>
                  <CaretRight size={28} color="#0F0F0F" />
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`hide-prefernces ${
              hideDivsPages.includes(currentPage) ? "hidden" : ""
            }`}
          >
            <Link
              href={"/settings/preferences"}
              onClick={() => handleLinkClick("/settings/preferences")}
            >
              <div
                className={`rounded-xl flex gap-4 items-center p-3 bg-white m-4 ${
                  activeLink === "/settings/preferences"
                    ? "mob-active-link "
                    : " bg-white"
                }`}
              >
                <div className="profile-icons">
                  <img
                    src="/assets/svgs/preference.svg"
                    size={22}
                    color="#828282"
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[#0F0F0F] flex-[80%]">Preferences</span>
                  <div>
                    <CaretRight size={28} color="#0F0F0F" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`hide-social ${
              hideDivsPages.includes(currentPage) ? "hidden" : ""
            }`}
          >
            <Link
              href={"/settings/social-accounts"}
              onClick={() => handleLinkClick("/settings/social-accounts")}
            >
              <div
                className={`rounded-xl flex gap-4 items-center p-3 bg-white m-4 ${
                  activeLink === "/settings/social-accounts"
                    ? "mob-active-link "
                    : " bg-white"
                }`}
              >
                <div className="profile-icons">
                  <img
                    src="/assets/svgs/facebook-icon.svg"
                    size={22}
                    color="#828282"
                  />
                </div>
                <span className="text-[#0F0F0F] flex-[80%]">
                  Social Accounts
                </span>
                <div>
                  <CaretRight size={28} color="#0F0F0F" />
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`hide-changepwd ${
              hideDivsPages.includes(currentPage) ? "hidden" : ""
            }`}
          >
            <Link
              href={"/settings/change-password"}
              onClick={() => handleLinkClick("/settings/change-password")}
            >
              <div
                className={`rounded-xl flex gap-4 items-center p-3 bg-white m-4 ${
                  activeLink === "/settings/change-password"
                    ? "mob-active-link "
                    : " bg-white"
                }`}
              >
                <div className="profile-icons">
                  <img src="/assets/svgs/lock.svg" size={22} color="#828282" />
                </div>
                <span className="text-[#0F0F0F] flex-[80%]">Password</span>
                <div>
                  <CaretRight size={28} color="#0F0F0F" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
