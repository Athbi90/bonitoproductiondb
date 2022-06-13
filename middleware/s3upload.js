// Dependancies
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Set S3 endpoint
const spacesEndpoint = new aws.Endpoint(`${process.env.S3_ENDPOINT}`); //eg. ""fra1.digitaloceanspaces.com""
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: `${process.env.S3_ACCESS_KEY}`, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: `${process.env.S3_SECRET_KEY}`, // Secret access key defined through an environment variable.
  },
});

// Initialize upload variable

const s3upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.S3_BUCKET}`,
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
}).single("image");

module.exports = s3upload;
