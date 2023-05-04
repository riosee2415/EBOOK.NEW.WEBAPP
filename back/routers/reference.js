const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post(
  "/file",
  isAdminCheck,
  upload.single("file"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/list", async (req, res, next) => {
  const selectQ = `
  SELECT  ROW_NUMBER() OVER(ORDER	BY createdAt ASC)		AS num,
          id,
          title,
          file,
          createdAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt
    FROM  reference
   WHERE  isDelete = FALSE
   ORDER  BY  createdAt ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("자료를 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, file } = req.body;

  const selectQ = `
  SELECT  id
    FROM  reference
   WHERE  isDelete = FALSE
   ORDER  BY  createdAt ASC
    `;

  const insertQ = `
  INSERT  INTO  reference
  (
      title,
      file,
      updator,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "${title}",
      "${file}",
      ${req.user.id},
      NOW(),
      NOW()
  )
  `;
  try {
    const list = await models.sequelize.query(selectQ);

    if (list[0].length === 30) {
      return res.status(400).send("자료를 30개 이상 생성할 수 없습니다.");
    }

    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("자료를 생성할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
  UPDATE  reference
     SET  isDelete = TRUE,
          deletedAt = NOW()
   WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("자료를 삭제할 수 없습니다.");
  }
});

module.exports = router;
