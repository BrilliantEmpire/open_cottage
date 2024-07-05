/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Badge, Checkbox, Col, Progress, Tag } from "antd";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ReactSVG } from "react-svg";

function OtherClientCard({ patient }) {
  let [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Col>
      <div className="border border-solid border-[#E1E1E1] w-[355px] p-4 rounded sm:mr-0 m-2">
        {status === "contacted" && (
          <div>
            <Tag bordered={false} color="#DAFBDB" className="text-green-800">
              <i className="ri-phone-line text-[16px] text-[#08AA0E]"></i>{" "}
              <span className="text-[#08AA0E] text-[16px]">Call</span>
            </Tag>
            <small className="text-gray-300 text-[16px]">Jenny Wilson</small>
          </div>
        )}
        {status === "response" && (
          <p className="flex items-start gap-2 text-[#08AA0E]">
            <ReactSVG src="/assets/svgs/sealCheck.svg" alt="" className="h-4" />
            Responded
          </p>
        )}
        <p className="text-xl">
          {patient.firstName} {patient.lastName}
        </p>
        <div className="mt-2">
          <span className="text-gray-300">Logged</span>{" "}
          <span className="text-blue-500">August 18th</span>{" "}
          <span className="text-gray-300">(3 days ago)</span>{" "}
        </div>
        {status === "not_contacted" && (
          <div className="mt-2">
            <small className="text-gray-300">Responses count down</small>
            <div className="flex">
              <Progress percent={10} showInfo={false} />{" "}
              <span className="text-gray-300 whitespace-nowrap">6 months</span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 my-4">
          <div>
            <small className="text-gray-500">Lens Type</small>
            <p>{patient.lensType}</p>
          </div>
          <div>
            <small className="text-gray-500">Frequency</small>
            <p>{patient.frequency}</p>
          </div>
        </div>
        <div className="mb-4">
          <Checkbox onChange={onChange}>Processing initiated</Checkbox>
        </div>
        <Link
          to={`/dashboard/daily-follows/details/${
            patient.firstName
          }?page=report&status=${status ? status : "not_contacted"}`}
          className="underline"
        >
          View Details
        </Link>
      </div>
    </Col>
  );
}

export default OtherClientCard;
