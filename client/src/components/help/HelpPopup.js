import React from "react";
import { List } from "antd";
import { Note, Question } from "@phosphor-icons/react";
import Link from "next/link";

const HelpPopup = () => {
  return (
    <div className="w-64 p-3 bg-white rounded-lg helppopup-sec">
      <div>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Terms & Conditions",
              icon: <Note size={20} weight="fill" color="#666666" />,
              link: "https://opencottage.net/terms-conditions/",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            {
              title: "Help Desk",
              icon: <Question size={20} weight="fill" color="#666666" />,
              link: "/help-support",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.icon}
                title={
                  <Link href={item.link} className="font-normal text-secondary">
                    <p className="text-sm">{item.title}</p>
                  </Link>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default HelpPopup;
