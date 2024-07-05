/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import { menuItems } from "../menus";
import { Avatar, Image } from "antd";
import { useState } from "react";

function SideBar({ show, onClick }) {
  const [expandSettings, setExpandSettings] = useState(false);

  return (
    <aside className="h-screen px-4 overflow-hidden border-r  border-r-solid border-r-gray-400 shadow-md">
      <ul className="list-none w-full">
        <li className="py-4 mb-6 flex justify-between">
          <div>
            <Image src="/assets/brands/logo.png" preview={false} height={60} />
          </div>
          {show && (
            <div onClick={onClick} className="cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </div>
          )}
        </li>
        {menuItems.map((item, index) => (
          <li
            className="h-10 flex mt-3 items-center hover:bg-gray-300"
            key={index}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "decoration-normal flex items-center gap-3 px-2  bg-gray-100 border border-solid border-primary rounded-4 h-full w-full"
                  : " decoration-normal flex items-center px-2 gap-3"
              }
              to={item.path}
              end
            >
              <img src={item.icon} alt="" />
              <span className="text-[14px] text-gray-700"> {item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
