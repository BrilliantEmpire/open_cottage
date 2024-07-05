import { Card, Form } from "antd";
import React from "react";

function ProfileSkeleton() {
  return (
    <Card>
      <div className="p-4">
        <Form layout="vertical">
          <div className="flex justify-center w-full my-6">
            {/* circular avatar */}
            <div className="flex justify-center relative w-[100px] ">
              <div className="border border-solid border-transparent rounded-full h-24 w-full bg-slate-300 shimmer" />
            </div>
          </div>
          {/* email */}
          <div className="border border-solid h-4 w-10 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
          <div className="border border-solid h-10 w-full bg-slate-300 border-transparent rounded-6  shimmer" />
          <div className="border border-solid h-4 w-20 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
          {/* email bar */}
          <div className="border border-solid h-10 w-full bg-slate-300 border-transparent rounded-6 shimmer" />
          {/* about */}
          <div className="border border-solid h-4 w-10 bg-slate-300 my-2 border-transparent rounded-6 shimmer " />
          {/* text area */}
          <div className="border border-solid h-40 w-full bg-slate-300 shimmer rounded-6 border-transparent my-2" />
          {/* submit button */}
          <div className="border border-solid h-10 bg-slate-300 border-transparent rounded-6 " />
        </Form>
      </div>
    </Card>
  );
}

export default ProfileSkeleton;
