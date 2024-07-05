import axios from "axios";

export const uploadService = async (images) => {
  try {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `${process.env.API_BASE_URL}upload`,
      formData,
      config
    );

    return res.data.imageUrls;
  } catch (error) {
    throw error;
  }
};

export const uploadSingleService = async (image) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `${process.env.API_BASE_URL}upload/profile-image`,
      formData,
      config
    );

    return res.data.imageUrl;
  } catch (error) {
    throw error;
  }
};
