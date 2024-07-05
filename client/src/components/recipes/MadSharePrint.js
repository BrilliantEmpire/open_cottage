"use client";
import Button from "@/components/buttons/Button";
import { RWebShare } from "react-web-share";
import { Check, ShareNetwork, Printer } from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import { addMade, getMade } from "@/services/mades.services";
import { Spin, message, Button as AntButton } from "antd";
import { useEffect, useState } from "react";

export default function MadSharePrint({ recipe, token }) {
  const { data: session } = useSession();

  const [madeIt, setMadeIt] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");

  useEffect(() => {
    async function fetchMade() {
      setIsPending(true);
      const made = await getMade(
        session?.user?.accessToken?.accessToken,
        recipe?._id
      );
      if (made?.success) {
        setBgColor("#288B22");

        setMadeIt(true);
      } else {
        setMadeIt(false);
        setBgColor("#FFFFFF");
      }
      setIsPending(false);
    }

    fetchMade();
  }, [success, session, recipe]);

  const addMadeToList = async () => {
    try {
      const made = await addMade(
        session?.user?.accessToken?.accessToken,
        recipe?._id
      );

      if (made?.success) {
        setMadeIt(true);
        setSuccess(true);
        message.success("Thanks for making it!");
      } else {
        message.error(made?.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  function printContent() {
    const contentWidth = document.body.scrollWidth;
    const contentHeight = document.body.scrollHeight;

    // Set page size based on content size
    const pageSize = {
      width: contentWidth + "px",
      height: contentHeight + "px",
    };

    // Apply styles for printing
    const style = document.createElement("style");
    style.textContent = `
    @page {
      size: ${pageSize.width} ${pageSize.height};
    }
    `;
    document.head.appendChild(style);

    window.print();

    style.remove();
  }

  return (
    <div className="flex flex-row mt-5 sm:flex-col lg:flex-col md:flex-col sm:flex-wrap md:flex-wrap">
      <div className="mr-4 lg:mr-0">
        <AntButton
          onClick={addMadeToList}
          className="cust-btn"
          style={{
            backgroundColor: madeIt ? "green !important" : "white",
            color: madeIt ? "white !important" : "black",
            borderColor: madeIt ? "green !important" : "black",
            borderRadius: "10px",
          }}
        >
          {madeIt ? "I Made it" : "Make it"}
          <Check size={18} className="mr-3" />
        </AntButton>
      </div>
      <RWebShare
        data={{
          text: recipe?.description,
          title: recipe?.title,
          url: recipe?.url,
        }}
      >
        <div className="mr-4 lg:mt-3 lg:mr-0">
          <Button
            link="#"
            text="Share Recipe"
            icon={<ShareNetwork size={18} />}
          />
        </div>
      </RWebShare>
      <div className="lg:mt-3 print-btn">
        <Button
          link="#"
          text="Print Recipe"
          icon={<Printer size={18} />}
          onClick={() => printContent()}
        />
      </div>
    </div>
  );
}
