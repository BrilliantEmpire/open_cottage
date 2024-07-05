/* eslint-disable react/prop-types */

function StatisticCard({ image, title, value }) {
  return (
    <>
      <div className="flex justify-center items-center flex-col border-l-2">
        <div className="flex justify-center items-center gap-2">
          <img src={image} alt="" /> <span>{title}</span>
        </div>
        <h1>{value}</h1>
      </div>
      {/* <hr className="lg:hidden" /> */}
    </>
  );
}

export default StatisticCard;
