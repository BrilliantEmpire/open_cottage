import React from "react";

function ProfileBanner() {
  return (
    <div
      className="relative flex items-center h-64 text-white sm:h-42"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgb(0 0 0 / 50%), rgb(0 0 0 / 4%)), url(/userbanner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center"></div>
    </div>
  );
}

export default ProfileBanner;
