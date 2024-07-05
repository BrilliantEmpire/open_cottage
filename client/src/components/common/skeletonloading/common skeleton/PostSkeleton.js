import { Card, Form } from "antd";
import React from "react";

function PostSkeleton() {
  return (
    <>
      <Card>
        <div className="p-4">
          <Form layout="vertical">
            <div className="flex justify-center w-full my-6">
              {/* circular avatar */}
              <div className="flex  relative w-[100px] justify-between w-full">
                <div className="flex w-full">
                  <div className="border border-solid border-transparent rounded-full h-10 w-10 bg-slate-300 shimmer" />
                  <div>
                    <div className="border border-solid border-transparent h-3 w-20 m-2 bg-slate-300 shimmer" />
                    <div className="border border-solid border-transparent h-2 w-20 m-2 bg-slate-300 shimmer" />
                  </div>
                </div>
                <div className="border border-solid border-transparent rounded-full h-5 w-5 bg-slate-300 shimmer" />
              </div>
            </div>
            {/* email */}
            <div className="border border-solid h-4 w-full bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
            <div className="border border-solid h-4 w-80 bg-slate-300 border-transparent rounded-6  shimmer" />
            {/* text area */}
            <div className="border border-solid h-60 w-full bg-slate-300 shimmer rounded-6 border-transparent my-2" />
            <div className="flex justify-between">
              <div className="border border-solid h-4 w-20 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
              <div className="border border-solid h-4 w-20 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
              <div className="border border-solid h-4 w-20 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
              <div className="border border-solid h-4 w-20 bg-slate-300 my-2 border-transparent rounded-6 shimmer" />
            </div>
            {/* email bar */}
            <div className="border border-solid h-10 w-full bg-slate-300 border-transparent rounded-6 shimmer" />
          </Form>
        </div>
      </Card>
    </>
  );
}

export default PostSkeleton;
