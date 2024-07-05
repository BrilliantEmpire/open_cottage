"use client";
import Link from "next/link";
import { Button as AntButton } from "antd";

const Button = ({ text, link, icon, onClick, madeIt }) => {
  return (
    <AntButton
      onClick={onClick}
      className="cust-btn"
      style={{
        backgroundColor: madeIt ? "green !important" : "white",
        color: madeIt ? "white !important" : "black",
        borderColor: madeIt ? "green !important" : "black",
        borderRadius: "10px",
      }}
    >
      {text}
      {icon && icon}
    </AntButton>
  );
};

export default Button;
