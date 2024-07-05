import React from "react";
import { Form, TimePicker } from "antd";
import dayjs from "dayjs";

const PrepTime = ({ prepTime, cookTime, setPrepTime, setCookTime }) => {
  const onPrepTimeChange = (time) => {
    setPrepTime(time ? dayjs(time).format("HH:mm") : null);
  };

  const onCookTimeChange = (time) => {
    setCookTime(time ? dayjs(time).format("HH:mm") : null);
  };

  return (
    <div className="flex justify-between w-full gap-4 sm:flex-col sm:gap-3">
      <div className="flex-1 preparation-time">
        <Form.Item
          name="preparation_time"
          rules={[
            { required: true, message: "Please Enter Preparation Time!" },
          ]}
        >
          <TimePicker
            format="HH:mm"
            minuteStep={1}
            showNow={false}
            suffixIcon={
              <span className="text-[#0F0F0F]">
                {prepTime ? prepTime : "HH : MM"}
              </span>
            }
            className="w-full h-12"
            value={null}
            onChange={onPrepTimeChange}
            placeholder="Preparation Time"
          />
        </Form.Item>
      </div>
      <div className="flex-1 cook-time">
        <Form.Item
          name="cook_time"
          rules={[{ required: true, message: "Please Enter Cook Time!" }]}
        >
          <TimePicker
            format="HH:mm"
            minuteStep={1}
            showNow={false}
            suffixIcon={
              <span className="text-[#0F0F0F]">
                {cookTime ? cookTime : "HH : MM"}
              </span>
            }
            className="w-full h-12"
            value={null}
            onChange={onCookTimeChange}
            placeholder="Cook Time"
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default PrepTime;
