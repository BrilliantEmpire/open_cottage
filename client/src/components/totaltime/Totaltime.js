import React from "react";
import { Clock, Users } from "@phosphor-icons/react/dist/ssr";
function Totaltime({ recipe }) {
  return (
    <div className="block lg:hidden">
      <div className=" text-base p-5 mt-4 bg-white rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid">
        <ul>
          <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3">
            <div className="flex">
              <Clock size={22} color="#0F0F0F" weight="fill" />
              <p className="pl-3">Prep Time</p>
            </div>
            <div>
              <p>{recipe?.preparation_time}</p>
            </div>
          </li>
          <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3 pt-3">
            <div className="flex">
              <Clock size={22} color="#0F0F0F" weight="fill" />
              <p className="pl-3">Cook Time</p>
            </div>
            <div>
              <p>{recipe?.cook_time}</p>
            </div>
          </li>
          <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3 pt-3">
            <div className="flex">
              <Clock size={22} color="#0F0F0F" weight="fill" />
              <p className="pl-3">Total Time</p>
            </div>
            <div>
              <p>1 hr 45 mins</p>
            </div>
          </li>
          <li className="flex justify-between pt-3">
            <div className="flex">
              <Users size={22} color="#0F0F0F" weight="fill" />
              <p className="pl-3">Servings</p>
            </div>
            <div>
              <p>{recipe?.servings}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Totaltime;
