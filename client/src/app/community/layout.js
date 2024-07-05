import CommunityProfile from "@/components/community-posts/CommunityProfile";
import MobSuggestForYou from "@/components/community-posts/MobSuggestedForYou";
import ProfileResponsive from "@/components/community-posts/ProfileResponsive";
import SuggestForYou from "@/components/community-posts/SuggestForYou";
import { suggestFollowers } from "@/services/followers.services";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
import { getServerSession } from "next-auth";
import { getUserProfile } from "@/services/users.services";

export default async function layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const users = await suggestFollowers(session.user.accessToken.accessToken);
  const user = await getUserProfile(session.user.accessToken.accessToken);

  return (
    <main className="w-full mb-10">
      <div className="flex justify-between w-full gap-6 sm:flex-wrap">
        <CommunityProfile user={user} />
        <div className="hidden w-full px-4 bg-white sm:block">
          <ProfileResponsive user={user} />
        </div>
        <div className="w-[60%] sm:w-full sm:px-4">{children}</div>
        <SuggestForYou />
      </div>
      <div className="hidden sm:block">
        <MobSuggestForYou users={users} />
      </div>
    </main>
  );
}
