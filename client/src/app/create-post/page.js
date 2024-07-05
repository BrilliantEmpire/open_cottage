"use client";

import { Button, Form, Input, message, Carousel } from "antd";
import React, { useState, useRef } from "react";
import {
  CaretLeft,
  Image,
  GlobeHemisphereWest,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function Page() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const inputFileRef = useRef(null);

  const onFinish = async (data) => {
    try {
      message.success("New post successfully created");
    } catch (error) {
      message.error(error?.message);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (!uploadedImages.some((image) => image.file.name === file.name)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prevImages) => [
            ...prevImages,
            { src: reader.result, file },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = null;
  };

  const removePhoto = (file) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.file.name !== file.name)
    );
  };

  const carouselSettings = {
    slidesToShow: 3.5,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
  };

  return (
    <div className="hidden sm:block">
      <div>
        <Link href="/community">
          <div className="flex items-center p-3 bg-white">
            <div className="mr-2">
              <CaretLeft size={28} color="#0F0F0F" />
            </div>
            <span className="text-[#0F0F0F] flex-[80%] font-semibold">
              Create Post
            </span>
          </div>
        </Link>
      </div>
      <Form onFinish={onFinish} layout="vertical" style={{ margin: "20px" }}>
        <Form.Item>
          <Input.TextArea rows={10} placeholder="What’s in your mind?" />
          <div className="flex items-center justify-between gap-2 mb-6 mt-4">
            <input
              id="photo-upload"
              ref={inputFileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
              multiple
            />
            <div className="flex items-center justify-center w-1/2 h-10 gap-2 px-4 bg-white cursor-pointer text-grey rounded-6">
              <label
                htmlFor="photo-upload"
                className="flex items-center justify-center h-10 gap-2"
              >
                <Image size={24} weight="fill" />
                <span>Photo</span>
              </label>
            </div>
            <div className="flex items-center justify-center w-1/2 h-10 gap-2 px-4 bg-white cursor-pointer text-grey rounded-6">
              <GlobeHemisphereWest size={24} weight="fill" />
              <span>Public</span>
            </div>
          </div>
          {uploadedImages.length > 0 && (
            <div
              {...carouselSettings}
              className="overflow-scroll flex justify-start"
            >
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative mt-4 mr-2">
                  <img
                    src={image.src}
                    alt="preview"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                  <X
                    size={16}
                    className="absolute flex top-[5%] right-[5%] bg-white text-[#D0001E] rounded-4 border-none p-1"
                    onClick={() => removePhoto(image.file)}
                  />
                </div>
              ))}
            </div>
          )}
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="setting-btn"
        >
          Post
        </Button>
      </Form>
    </div>
  );
}
