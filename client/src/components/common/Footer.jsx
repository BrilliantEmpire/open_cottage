"use client";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function FooterComponent() {
  const [show, setShow] = useState(null);

  const handleToggleDropdowns = (param) => {
    if (show === param) {
      setShow(null);
    } else {
      setShow(param);
    }
  };

  return (
    <footer className="pt-8 pb-4 text-gray-600 bg-white md:py-4 md:overflow-hidden">
      <div className="flex justify-between px-24 md:px-0 border-0 border-solid w-42 md:w-full md:flex-col border-b-1 border-[#F4F4F4] pb-8  md:pb-0">
        <div className="flex flex-col justify-start w-1/4 mr-24 md:mr-0 md:w-full md:items-center md:border-0 md:border-solid md:border-b-1 md:border-[#F4F4F4] md:mb-4">
          <img
            src="/assets/brands/logo.png"
            className="flex w-[144px] h-[68px] md:mb-4"
            alt=""
          />
          <p className="mt-4 text-sm text-gray-500 md:hidden">
            Your go-to recipe hub! <br />
            Explore, share, and savor a <br />
            world of culinary delights <br />
            with our vibrant community <br />
            of food enthusiasts.
          </p>
        </div>
        <div className="flex w-3/4 md:w-full md:flex-col ">
          <div className="w-1/4 px-4 md:w-auto md:mb-4 md:px-0 md:border-0 md:border-solid md:border-b-1 md:border-[#F4F4F4] md:pb-2">
            <div className="flex justify-between w-full md:w-auto md:px-4 ">
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-900 title-font">
                Quick Links
              </h2>
              <div
                className="hidden md:inline-block"
                onClick={() => handleToggleDropdowns("links")}
              >
                <RightOutlined />
              </div>
            </div>

            <nav
              className={`list-none  md:px-4 mb-10 md:mb-2 block ${
                show === "links" ? "md:block" : "block md:hidden"
              }`}
            >
              <div className="mb-4">
                <li>
                  <Link href="/">
                    <p className="text-gray-600 hover:text-gray-800">Home</p>
                  </Link>
                </li>
              </div>
              <div className="mb-4">
                <li>
                  <Link href="/community">
                    <p className="text-gray-600 hover:text-gray-800">
                      Community
                    </p>
                  </Link>
                </li>
              </div>
            </nav>
          </div>
          <div className="w-1/4 px-4 md:w-auto md:mb-4 md:px-0 md:border-0 md:border-solid md:border-b-1 md:border-[#F4F4F4] md:pb-2">
            <div className="flex justify-between w-full md:w-auto md:px-4 ">
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-900 title-font">
                User Area
              </h2>
              <div
                className="hidden md:inline-block"
                onClick={() => handleToggleDropdowns("user")}
              >
                <RightOutlined />
              </div>
            </div>

            <nav
              className={`list-none  md:px-4 mb-10 md:mb-2 block ${
                show === "user" ? "md:block" : "block md:hidden"
              }`}
            >
              <div className="mb-4">
                <li>
                  <Link href="?auth=login">
                    <p className="text-gray-600 hover:text-gray-800">Login</p>
                  </Link>
                </li>
              </div>
              <div className="mb-4">
                <li>
                  <Link href="?auth=register">
                    <p className="text-gray-600 hover:text-gray-800">
                      Register
                    </p>
                  </Link>
                </li>
              </div>
            </nav>
          </div>
          <div className="w-1/4 px-4 md:w-auto md:mb-4 md:px-0 md:border-0 md:border-solid md:border-b-1 md:border-[#F4F4F4] md:pb-2">
            <div className="flex justify-between w-full md:px-4 md:w-auto">
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-900 title-font">
                Resources
              </h2>
              <div
                className="hidden md:inline-block"
                onClick={() => handleToggleDropdowns("resources")}
              >
                <RightOutlined />
              </div>
            </div>

            <nav
              className={`list-none md:px-4 mb-10 md:mb-2 block ${
                show === "resources" ? "md:block" : "block md:hidden"
              }`}
            >
              <div className="mb-4">
                <li>
                  <Link href="/help-support">
                    <p className="text-gray-600 hover:text-gray-800">
                      Help & Support
                    </p>
                  </Link>
                </li>
              </div>
              <div className="mb-4">
                <li>
                  <Link
                    href="https://opencottage.net/privacy-policy"
                    legacyBehavior
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Privacy Policy
                    </a>
                  </Link>
                </li>
              </div>
              <div>
                <li>
                  <Link
                    href="https://opencottage.net/terms-conditions/"
                    legacyBehavior
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Terms & Conditions
                    </a>
                  </Link>
                </li>
              </div>
            </nav>
          </div>

          <div className="w-1/4 px-2 md:px-0 md:w-full md:pt-2">
            <div className="w-3/4 px-20 md:w-full md:px-0">
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-900 md:text-center title-font">
                Follow Us
              </h2>

              <nav className="flex mb-10 list-none md:items-center md:justify-center">
                <li className="mr-4">
                  <Link
                    href="https://google.com/"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <img
                      src="/assets/svgs/facebook.svg"
                      alt="Facebook"
                      className="w-8 h-8"
                    />
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    href="https://google.com/"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <img
                      src="/assets/svgs/instagram.svg"
                      alt="Instagram"
                      className="w-8 h-8"
                    />
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    href="https://google.com/"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <img
                      src="/assets/svgs/youtube.svg"
                      alt="YouTube"
                      className="w-8 h-8"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://google.com/"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <img
                      src="/assets/svgs/twitter.svg"
                      alt="Twitter"
                      className="w-8 h-8"
                    />
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container flex flex-col flex-wrap px-5 pt-4 mx-auto md:pt-4 md:pb-0 md:flex-row md:justify-center">
          <p className="text-sm text-center text-gray-500 md:text-left">
            ©2023 Open Cottage.All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
