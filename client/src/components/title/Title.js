import React from "react";

function Title({ title }) {
  return (
    <p className="text-2xl sm:text-xl font-semibold tracking-[0.4px] uppercase">
      {title}
    </p>
  );
}

export default Title;
