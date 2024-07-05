"use client";
import { CaretLeft } from "@phosphor-icons/react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-auto px-24 py-2 sm:px-4 bg-white">
      <div className="flex items-center">
        <Button
          onClick={handleBack}
          style={{
            border: "none",
            display: "flex",
            alignItems: "center",
            paddingLeft: "0",
          }}
        >
          <CaretLeft size={22} />
          Back
        </Button>
      </div>
    </div>
  );
};

export default BackButton;
