
import { Form, Input } from "antd";
import React from "react";

const SocialMediaInput = ({ name, placeholder, rules, label, suffix }) => (
  <Form.Item
    name={name}
    rules={rules}
    label={<span className="text-[#666666]">{label}</span>}
  >
    <Input type="text" placeholder={placeholder} suffix={suffix} />
  </Form.Item>
);

export default SocialMediaInput;
