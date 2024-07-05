/* eslint-disable react/prop-types */
import { Avatar, Button, Input, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../redux_state/auth/auth.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function HeaderComponent({ toggle }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !token || token === "undefined") {
      navigate("/");
    }
  }, [dispatch, navigate, user]);

  const handleLogout = () => {
    dispatch(signOutAdmin());
  };

  const menus = (
    <div>
      <Button onClick={handleLogout}>Sign Out</Button>
    </div>
  );

  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div onClick={toggle} className=" sm:block hidden">
        <i className="ri-menu-2-line text-2xl"></i>
      </div>
      <div>
        <h1>Open-Cottage</h1>
      </div>

      <Popover content={menus}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar src="/assets/svgs/user.svg" />
          <i className="ri-arrow-down-s-line ml-2 text-lg"></i>
        </a>
      </Popover>
    </nav>
  );
}

export default HeaderComponent;
