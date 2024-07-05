import React from "react";

function loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col justify-center items-center bg-white">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={`w-1/5 ${index >= 5 ? "mt-3" : ""}`}>
            <div className="flex min-h-screen items-center justify-center">
              <div className="w-1/3">{/* <Spin size="large" /> */}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default loading;
