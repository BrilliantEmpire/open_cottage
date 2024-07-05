"use client";

import {
  GlobeHemisphereWest,
  Image,
  Smiley,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Button, Divider, Form, Input, Modal, Spin, message } from "antd";
import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";
import { checkImageSize } from "@/app/utils/imageSize";

export default function CreatePost({ isOpen, handleSubmitPost, isLoading }) {
  const [isEmoji, setIsEmoji] = useState(false);
  const [images, setImages] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const inputFileRef = useRef(null);

  const [form] = Form.useForm();

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      if (checkImageSize(file, 5)) {
        newImages.push(file);
      } else {
        message.error(`Image ${file.name} exceeds 5MB limit.`);
      }
    });

    setImages([...images, ...newImages]);
  };

  const onFinish = async (data) => {
    await handleSubmitPost({
      images,
      description,
      isPublic,
    });

    form.resetFields();
    setImages([]);
    setIsPublic(false);
    setDescription("");
  };

  const removePhoto = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCancel = () => {
    form.resetFields();
    setImages([]);
    setIsPublic(false);
    setDescription("");
  };

  return (
    <Modal
      onCancel={() => {
        handleCancel();
        router.push("?createPost=false");
      }}
      closable={false}
      open={isOpen}
      footer={false}
      centered
    >
      <div className="flex items-center justify-between w-full">
        <h3>Create Post</h3>
        <div>
          <XCircle
            className="cursor-pointer"
            size={32}
            onClick={() => {
              handleCancel();

              router.push("?createPost=false");
            }}
          />
        </div>
      </div>
      <Divider />

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="description">
          <Input.TextArea
            rows={10}
            placeholder="What’s in your mind?"
            style={{
              border: "none",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-wrap mt-2 -mx-2">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 mx-2 my-2">
                <img
                  // src={image.src}
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
                <X
                  size={16}
                  className="absolute flex top-[5%] right-[5%] bg-white text-[#D0001E] rounded-4 border-none p-1"
                  onClick={() => removePhoto(index)}
                />
              </div>
            ))}
          </div>
        </Form.Item>

        <div
          className="flex justify-between
       mt-4"
        >
          <div className="flex items-center gap-x-3">
            <div className=" bg-[#F7F7F7] h-10 grid place-content-center rounded-6 w-14 cursor-pointer">
              <Smiley
                size={32}
                weight="thin"
                onClick={() => setIsEmoji(!isEmoji)}
              />
            </div>
            <div className="bg-[#F7F7F7] text-grey h-10 px-4 flex gap-2 items-center rounded-6 cursor-pointer">
              <label
                htmlFor="photo-upload"
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  size={24}
                  weight="fill"
                  onClick={() => inputFileRef.current.click()}
                  loading="lazy"
                />
                <span>Photo</span>
              </label>
              <input
                id="photo-upload"
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
                loading="lazy"
                multiple
              />
            </div>

            <div
              role="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`${
                isPublic ? "bg-primary text-white" : " bg-[#F7F7F7] text-grey"
              } h-10 px-4 flex gap-2 items-center rounded-6 cursor-pointer`}
            >
              <GlobeHemisphereWest size={24} weight="fill" />
              <span>{isPublic ? "Public" : "Private"}</span>
            </div>
          </div>
          {isLoading ? (
            <Spin />
          ) : (
            <Button htmlType="submit" type="primary" size="large">
              Post
            </Button>
          )}
        </div>
        <EmojiPicker
          onEmojiClick={(event) => {
            setDescription(description + " " + event.emoji);
          }}
          open={isEmoji}
        />
      </Form>
    </Modal>
  );
}
