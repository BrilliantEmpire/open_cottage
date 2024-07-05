"use client";
import React, { useEffect, useState } from "react";
import { BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import {
  bookmarkRecipe,
  checkRecipeBookmarked,
} from "@/services/bookmarks.services";
import { useSession } from "next-auth/react";
import { message } from "antd";

function SaveRecipe({ recipe }) {
  const { data: session } = useSession();

  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#D0001E");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (session) {
      checkRecipeBookmarked(
        recipe?._id,
        session?.user?.accessToken?.accessToken
      ).then((res) => {
        if (res?.isBookmarked == true) {
          setBgColor("#D0001E");
          setTextColor("#FFFFFF");
          setIsBookmarked(true);
        } else {
          setBgColor("#FFFFFF");
          setTextColor("#D0001E");
          setIsBookmarked(false);
        }
      });
    }
  }, [session]);

  const handleButtonClick = async () => {
    if (!session) {
      return;
    }

    const response = await bookmarkRecipe(
      session?.user?.accessToken?.accessToken,
      recipe?._id
    );

    if (response?.success) {
      setBgColor("#D0001E");
      setTextColor("#FFFFFF");
      setIsBookmarked(true);
      message.success(response?.message);
    } else {
      setIsBookmarked(false);
      message.error(response?.message);
    }

    if (bgColor === "#FFFFFF") {
      setBgColor("#D0001E");
      setTextColor("#FFFFFF");
    } else {
      setBgColor("#FFFFFF");
      setTextColor("#D0001E");
    }
  };

  return (
    <form>
      <div
        role="button"
        className="flex justify-center p-3 mt-4 align-middle rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid items-center cursor-pointer sm:hidden"
        style={{ backgroundColor: bgColor }}
        onClick={handleButtonClick}
      >
        <BookmarkSimple
          size={28}
          color={bgColor === "#FFFFFF" ? "#D0001E" : "#FFFFFF"}
        />
        <p className="text-base text-center" style={{ color: textColor }}>
          {isBookmarked ? "Unsave this recipe" : "Save this recipe"}
        </p>
      </div>

      <div
        className="sm:block p-2 w-max mt-4 align-middle rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid items-center cursor-pointer hidden"
        style={{ backgroundColor: bgColor }}
        onClick={handleButtonClick}
      >
        <BookmarkSimple
          size={28}
          color={bgColor === "#FFFFFF" ? "#D0001E" : "#FFFFFF"}
          onClick={handleButtonClick}
        />
      </div>
    </form>
  );
}

export default SaveRecipe;
