/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function PageCounter({ length, current }) {
  return (
    <div className="absolute bottom-10 text-[#999999] pl-4">
      Showing <span className="text-[#2C2C2C]">{current}</span> of{" "}
      <span className="text-[#2C2C2C]">{length}</span>
    </div>
  );
}

export default PageCounter;
