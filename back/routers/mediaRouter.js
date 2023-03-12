const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

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
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

router.post(
  "/file",
  isAdminCheck,
  upload.single("file"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { title } = req.body;

  const _title = title ? title : "";

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort DESC)		AS num,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  title LIKE "%${_title}%"
       AND  isDelete = FALSE
     ORDER  BY  sort DESC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { title, mediaOriginName, mediaPath, duration } = req.body;

  const insertQ = `
  INSERT INTO media
  (
      title,
      mediaOriginName,
      mediaPath,
      duration,
      sort,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "${title}",
      "${mediaOriginName}",
      "${mediaPath}",
      "${duration}",
      1,
      NOW(),
      NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, mediaOriginName, mediaPath, duration } = req.body;

  const updateQ = `
  UPDATE  media
     SET  title = "${title}",
          mediaOriginName = "${mediaOriginName}",
          mediaPath = "${mediaPath}",
          duration = "${duration}",
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("수정 할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
  UPDATE  media
     SET  isDelete = TRUE,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("삭제 할 수 없습니다.");
  }
});

module.exports = router;
