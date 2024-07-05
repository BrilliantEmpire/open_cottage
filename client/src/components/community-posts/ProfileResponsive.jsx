"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
function ProfileResponsive() {
  const [activeLink, setActiveLink] = useState("/community");
  const router = usePathname();

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };
  useEffect(() => {
    setActiveLink(router);
  }, []);
  return (
    <div className="flex items-center justify-between w-full bg-white">
      <Link
        href={"/community"}
        className={`p-4 ${activeLink === "/community" ? "bottom-border" : ""}`}
        onClick={() => handleLinkClick("/community")}
      >
        <span className="w-1/3 my-4 text-secondary ">Feeds</span>
      </Link>
      <Link
        href={"/community/followings"}
        className={`p-4 ${
          activeLink === "/community/followings" ? "bottom-border" : ""
        }`}
        onClick={() => handleLinkClick("/community/followings")}
      >
        <span className="w-1/3 my-4 text-secondary ">Following</span>
      </Link>
      <Link
        href={"/community/saved"}
        className={`p-4 ${
          activeLink === "/community/saved" ? "bottom-border" : ""
        }`}
        onClick={() => handleLinkClick("/community/saved")}
      >
        <span className="w-1/3 my-4 text-secondary ">Saved</span>
      </Link>
    </div>
  );
}

export default ProfileResponsive;
