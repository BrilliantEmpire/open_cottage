import Link from "next/link";
import { Button as AntButton } from "antd";

const ButtonBg = ({ text, link }) => {
  return (
    <Link href={link} passHref>
      <AntButton className="bgcolor-btn">{text}</AntButton>
    </Link>
  );
};

export default ButtonBg;
