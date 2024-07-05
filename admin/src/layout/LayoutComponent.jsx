import { Outlet } from "react-router-dom";
import HeaderComponent from "./headers/Header";
import SideBar from "./sidebar/SideBar";
import { Layout } from "antd";
import { useState } from "react";

export default function LayoutComponent() {
  const { Header, Sider, Footer, Content } = Layout;

  const [show, setShow] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        ani
        width={227}
        style={{
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
          backgroundColor: "white",
          width: "240px",
          border: "1px solid #E1E1E1",
          left: 0,
          top: 0,
          bottom: 0,
          transition: "transform 300ms ease-in",
        }}
        className={`${show ? "block " : "sm:hidden"} md:block z-20`}
        onClick={() => setShow(false)}
      >
        <SideBar onClick={() => setShow(false)} show={show} />
      </Sider>
      <Layout className="site-layout relative sm:m-0 ml-[227px]">
        <Header
          style={{
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #E1E1E1",
            top: 0,
            position: "sticky",
            zIndex: "10",
          }}
        >
          <HeaderComponent show={show} toggle={() => setShow(!show)} />
        </Header>
        <Content
          // onClick={() => setShow(false)}
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            backgroundColor: "#F5F6F8",
          }}
          className="sm:p-0 p-4 "
        >
          <Outlet />
          <Footer>
            &copy; {new Date().getFullYear()} Open-Cottage. All rights reserved.
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
