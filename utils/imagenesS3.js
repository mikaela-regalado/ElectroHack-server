const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

const imagenesS3 = {
  configS3: () => {
    AWS.config.update({ region: process.env.AWS_S3_BUCKET_REGION });

    const s3 = new AWS.S3({
      apiVersion: process.env.AWS_S3_API_VERSION,
      accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
    });
    return s3;
  },

  upload: async (files, s3) => {
    const ext = path.extname(files.image.path);
    const newFileName = `image_${Date.now()}${ext}`;

    const params = {
      ACL: "public-read",
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `products/${newFileName}`,
      ContentType: files.type,
      Body: fs.createReadStream(files.image.path),
    };
    await s3.upload(params).promise();
    return newFileName;
  },
};

module.exports = imagenesS3;
