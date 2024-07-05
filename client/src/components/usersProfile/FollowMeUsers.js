import React from "react";
import { user } from "@/data/users";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
function FollowMe() {
  return (
    <div className="sm:flex sm:justify-between sm:items-center">
      <h4 className="mb-4 text-xl font-bold sm:text-base sm:mb-0">Follow Me</h4>
      <div className="flex gap-2">
        <Link href={user.socialProfiles.facebook}>
          <p className="p-1 bg-primary rounded-4">
            <FacebookLogo size={22} color="#FFFFFF" weight="bold" />
          </p>
        </Link>
        <Link href={user.socialProfiles.youtube}>
          <p className="p-1 bg-primary rounded-4">
            <YoutubeLogo size={22} color="#FFFFFF" weight="bold" />
          </p>
        </Link>
        <Link href={user.socialProfiles.instagram}>
          <p className="p-1 bg-primary rounded-4">
            <InstagramLogo size={22} color="#FFFFFF" weight="bold" />
          </p>
        </Link>
        <Link href={user.socialProfiles.tiktok}>
          <p className="p-1 bg-primary rounded-4">
            <TiktokLogo size={22} color="#FFFFFF" weight="bold" />
          </p>
        </Link>
      </div>
    </div>
  );
}

export default FollowMe;
