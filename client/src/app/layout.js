import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import dynamic from "next/dynamic";
import FooterComponent from "../components/common/Footer";
import HeaderComponent from "../components/common/HeaderComponent";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Open Cottage",
  description:
    "Open Cottage is a web based platform aimed towards foodies and chefs, who can get recipes, create recipes, and follow great chefs for mouth-watering recipes.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-body font-Lato">
        <NextAuthProvider>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#288B22",
                  fontFamily: "Lato, sans-serif",
                  padding: "1rem",
                },
                components: {
                  Button: {
                    // colorPrimary: "#00B96B",
                    colorPrimary: "#288B22",
                    borderRadius: 4,
                    algorithm: true, // Enable algorithm
                  },
                  Input: {
                    // colorPrimary: "#EB2F96",
                    colorPrimary: "#98989A",
                    borderRadius: 4,
                    algorithm: true, // Enable algorithm
                  },
                  Card: {
                    backgroundColor: "#FFFFFF",
                    padding: 12,
                    borderRadius: 12,
                    algorithm: true,
                    fontSizeParagraph: "16px",
                  },
                },
              }}
            >
              <HeaderComponent />
              <main>{children}</main>
              <FooterComponent />
            </ConfigProvider>
          </AntdRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
