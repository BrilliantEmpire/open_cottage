const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const { S3Client, S3 } = require("@aws-sdk/client-s3");

//const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
  // region,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      // acl: "public-read",
      s3,
      bucket: bucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

module.exports = {
  upload,
  s3,
};
