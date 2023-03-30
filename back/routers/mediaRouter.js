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
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  title LIKE "%${_title}%"
       AND  isDelete = FALSE
     ORDER  BY  sort ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 30;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 30;

  const lengthQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort ASC)		AS num,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  isDelete = FALSE
     ORDER  BY  sort ASC
    `;

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort ASC)		AS num,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  isDelete = FALSE
     ORDER  BY  sort ASC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

  try {
    const lengths = await models.sequelize.query(lengthQ);
    const list = await models.sequelize.query(selectQ);

    const listLen = lengths[0].length;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    return res
      .status(200)
      .json({ list: list[0], lastPage: parseInt(lastPage) });
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/all/list", async (req, res, next) => {
  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort ASC)		AS num,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  isDelete = FALSE
     ORDER  BY  sort ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort DESC)		AS num,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  isDelete = FALSE
       AND  id = ${id}
    `;

  try {
    const detail = await models.sequelize.query(selectQ);

    return res.status(200).json(detail[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const {
    title,
    mediaOriginName,
    mediaPath,
    duration,
    sampleMediaOriginName,
    sampleMediaPath,
    sampleDuration,
    isSample,
    testId,
  } = req.body;

  const insertQ = `
  INSERT INTO media
  (
      title,
      mediaOriginName,
      mediaPath,
      duration,
      sampleMediaOriginName,
      sampleMediaPath,
      sampleDuration,
      isSample,
      sort,
      testId,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "${title}",
      ${mediaOriginName ? `"${mediaOriginName}"` : "NULL"},
      ${mediaPath ? `"${mediaPath}"` : "NULL"},
      ${duration ? `"${duration}"` : "NULL"},
      ${sampleMediaOriginName ? `"${sampleMediaOriginName}"` : "NULL"},
      ${sampleMediaPath ? `"${sampleMediaPath}"` : "NULL"},
      ${sampleDuration ? `"${sampleDuration}"` : "NULL"},
      ${isSample},
      1,
      "${testId}",
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
  const {
    id,
    title,
    mediaOriginName,
    mediaPath,
    duration,
    sampleMediaOriginName,
    sampleMediaPath,
    sampleDuration,
    isSample,
  } = req.body;

  const updateQ = `
  UPDATE  media
     SET  title = "${title}",
          mediaOriginName = ${
            mediaOriginName ? `"${mediaOriginName}"` : "NULL"
          },
          mediaPath = ${mediaPath ? `"${mediaPath}"` : "NULL"},
          duration = ${duration ? `"${duration}"` : "NULL"},
          sampleMediaOriginName = ${
            sampleMediaOriginName ? `"${sampleMediaOriginName}"` : "NULL"
          },
          sampleMediaPath = ${
            sampleMediaPath ? `"${sampleMediaPath}"` : "NULL"
          },
          sampleDuration = ${sampleDuration ? `"${sampleDuration}"` : "NULL"},
          isSample = ${isSample},
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

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, sort } = req.body;

  const updateQ = `
  UPDATE  media
     SET  sort = ${sort},
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

module.exports = router;
