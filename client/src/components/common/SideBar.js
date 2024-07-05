"use client";
import React, { useState } from "react";
import { Button, Divider, Drawer, Space } from "antd";
import Link from "next/link";
import { House } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useAuth } from "@/state/auth.state";
import { usePathname } from "next/navigation";

const SideBar = ({ open, onClose }) => {
  const { isLogin } = useAuth();

  const router = usePathname();

  return (
    <>
      <Drawer
        title={
          <div onClick={onClose} className="flex justify-end">
            <img src={"/assets/svgs/close.svg"} />
          </div>
        }
        closeIcon={null}
        width={300}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col gap-4 mb-4">
              <Link
                href={"/"}
                className={`flex items-center gap-2 py-2 no-underline  ${
                  router === "/" ? "text-primary" : "text-secondary"
                } `}
                size="large"
                type="primary"
                title="Home"
                onClick={onClose}
              >
                <House size={24} weight="fill" />
                <span className="text-[16px]">Home</span>
              </Link>
              <div className="flex-1 border border-solid border-gray-100"></div>
              <Link
                href={isLogin ? "/community" : "?auth=login"}
                className={`flex items-center gap-2 py-2 no-underline ${
                  router.includes("/community")
                    ? "text-primary"
                    : "text-secondary"
                } `}
                size="large"
                type="primary"
                title="Home"
                onClick={onClose}
              >
                <Image
                  src={
                    router.includes("/community")
                      ? "/assets/svgs/vector.svg"
                      : "/assets/svgs/vector.svg"
                  }
                  height={20}
                  width={20}
                />
                <span className="text-[16px]">Community</span>
              </Link>
              <Link
                href={isLogin ? "/create-post" : "?auth=login"}
                className={`flex items-center gap-2 py-2 no-underline ${
                  router.includes("/create-post")
                    ? "text-primary"
                    : "text-secondary"
                } `}
                size="large"
                type="primary"
                title="Home"
                onClick={onClose}
              >
                <Image
                  src={
                    router.includes("/create-post")
                      ? "/assets/svgs/vector.svg"
                      : "/assets/svgs/vector.svg"
                  }
                  height={20}
                  width={20}
                />
                <span className="text-[16px]">Community</span>
              </Link>
              <div className="flex-1 border border-solid border-gray-100"></div>

              <Link
                href={isLogin ? "/explore" : "/?auth=login"}
                className={`flex items-center gap-2 py-2 no-underline ${
                  router.includes("/explore")
                    ? "text-primary"
                    : "text-secondary"
                } `}
                size="large"
                type="primary"
                title="Home"
                onClick={onClose}
              >
                <Image
                  src={"/assets/svgs/reserve.svg"}
                  height={24}
                  width={24}
                />
                <span className="text-[16px]">Explore</span>
              </Link>
              <div className="flex-1 border border-solid border-gray-100"></div>
            </div>

            <Link href={"/login"}>
              <Button onClick={onClose} type="primary" size="large" block>
                Login
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                onClick={onClose}
                className="mt-4"
                type="primary"
                size="large"
                block
                ghost
              >
                Signup
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href={"/terms-conditions"} className="text-secondary">
              Terms & Conditions
            </Link>
            <Link href={"/help-support"} className="text-secondary">
              Help Desk
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideBar;
