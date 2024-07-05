const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadImages = async (images) => {
  const promises = images.map(async (image) => {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.originalname,
        Body: image.buffer,
      };
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; // Handle the error as needed
    }
  });

  const results = await Promise.all(promises);

  return results;
};

module.exports = {
  uploadImages,
};
