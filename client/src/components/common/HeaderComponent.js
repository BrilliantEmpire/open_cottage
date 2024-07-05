"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Popover, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Question, House, Bell } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import NotificationPopup from "../notifications/NotificationPopup";
import HelpPopup from "../help/HelpPopup";
import UserPopup from "../user/UserPopup";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserProfile } from "@/services/users.services";

export default function HeaderComponent() {
  const LoginModal = dynamic(() => import("@/components/modals/loginModal"));
  const ResetPasswordModal = dynamic(() =>
    import("@/components/modals/resetPasswordModal")
  );
  const CheckEmailModal = dynamic(() =>
    import("@/components/modals/checkEmailModal")
  );
  const RegisterModal = dynamic(() =>
    import("@/components/modals/registerModal")
  );
  const ForgetPasswordModal = dynamic(() =>
    import("../modals/forgotPasswordModal")
  );

  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        const res = await getUserProfile(
          session?.user?.accessToken?.accessToken
        );
        setUser(res);
      }
    };

    if (session && !user) {
      fetchUserProfile();
    }
  }, [session, user]);

  const [open, setOpen] = useState(false);

  const router = usePathname();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isExplorePage =
    typeof window !== "undefined" && window.location.pathname === "/explore";

  return (
    <>
      <div className="flex items-center justify-between h-24 px-24 text-white bg-white mb-[2px] header-sec sm:px-4">
        {/* logo here  */}
        <Link href="/">
          <Image src={"/assets/brands/logo.png"} height={67} width={144} />
        </Link>

        {!isExplorePage ? (
          <img
            onClick={showDrawer}
            className="hidden sm:block"
            src="/assets/svgs/menu.svg"
            alt=""
          />
        ) : (
          <div className="hidden lg:flex gap-4">
            <Link href={"/"}>
              <Image src={"/assets/svgs/home.svg"} height={32} width={32} />
            </Link>
            <Link href={"/notifications"}>
              <Image src={"/assets/svgs/bell.svg"} height={32} width={32} />
            </Link>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 sm:hidden">
          <Link
            href={"/"}
            className={`flex items-center justify-center gap-2 px-4 py-2 no-underline border rounded-4 ${
              router === "/" || router === "/notifications"
                ? "bg-primary text-white"
                : "bg-[#F3F3F3] text-secondary"
            } `}
            size="large"
            type="primary"
            title="Home"
          >
            <House size={20} weight="fill" /> <span>Home</span>
          </Link>
          <Link
            href={session ? "/community" : "?auth=login"}
            className={`flex items-center justify-center gap-2 px-4 py-2 no-underline border rounded-4 ${
              router.includes("/community")
                ? "bg-primary text-white"
                : " bg-[#F3F3F3]  text-secondary"
            } `}
            size="large"
            type="primary"
            title="Home"
          >
            <Image
              src={
                router.includes("/community")
                  ? "/icons/trend-up.png"
                  : "/assets/svgs/vector.svg"
              }
              height={20}
              width={20}
            />
            <span>Community</span>
          </Link>
          <Link
            href={session ? "/create-recipe" : "?auth=login"}
            className={`flex items-center justify-center gap-2 px-4 py-2 no-underline border rounded-4 ${
              router.includes("/create-recipe")
                ? "bg-primary text-white"
                : " bg-[#F3F3F3]  text-secondary"
            } `}
            size="large"
            type="primary"
            title="Home"
          >
            <Image
              src={
                router.includes("/create-recipe")
                  ? "/icons/create-recipe.png"
                  : "/assets/svgs/reserve.svg"
              }
              height={20}
              width={20}
            />
            <span>Create recipe</span>
          </Link>
          <Link
            href="/explore"
            className={`flex items-center justify-center gap-2 px-4 py-2 no-underline border rounded-4 ${
              router.includes("/explore")
                ? "bg-primary text-white"
                : " bg-[#F3F3F3]  text-secondary"
            } `}
            size="large"
            type="primary"
            title="Home"
          >
            <Image
              src={
                router.includes("/explore")
                  ? "/icons/compassiconwhite.png"
                  : "/icons/compassGrey.png"
              }
              height={20}
              width={20}
            />
            <span>Explore</span>
          </Link>
          {/* remove create recipe as per client */}
        </div>
        {session ? (
          <div className="flex items-center ml-3 sm:hidden">
            <Popover
              placement="bottom"
              content={<NotificationPopup />}
              overlayStyle={{ width: "380px", padding: "0", margin: "0" }}
            >
              <div className="notify-popover">
                <Link href={"/notifications"}>
                  <Image
                    src={"/assets/svgs/frame.svg"}
                    height={40}
                    width={40}
                    className="mr-4 rounded-full"
                  />
                </Link>
              </div>
            </Popover>
            <Popover
              placement="bottom"
              content={<HelpPopup />}
              overlayStyle={{ width: "240px" }}
            >
              <Link href={"/help"}>
                <Image
                  src={"/assets/svgs/frame2.svg"}
                  height={40}
                  width={40}
                  className="mr-4"
                />
              </Link>
            </Popover>
            <Popover
              placement="bottom"
              content={<UserPopup user={user} />}
              overlayStyle={{ width: "240px" }}
            >
              <Link href={"/my-account"}>
                <Image
                  src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
                  height={40}
                  width={40}
                  className="mr-4 rounded-full"
                />
              </Link>
            </Popover>
            {/* Adjusted size and styles of circles */}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 sm:hidden">
            <Popover
              placement="bottom"
              content={<HelpPopup />}
              overlayStyle={{ width: "240px" }}
            >
              <Link href={"/help-support"}>
                <Image
                  src={"/assets/svgs/frame2.svg"}
                  height={40}
                  width={40}
                  className="mr-4"
                />
              </Link>
            </Popover>
            <Link
              href={"?auth=login"}
              className="flex items-center justify-center gap-2 px-4 py-2 no-underline bg-white border-solid border-1 border-success rounded-4 text-success"
              size="large"
              type="primary"
              title="Home"
            >
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>

      <LoginModal />
      <RegisterModal />
      <ForgetPasswordModal />
      <ResetPasswordModal />
      <CheckEmailModal />
      <SideBar open={open} onClose={onClose} />
    </>
  );
}
