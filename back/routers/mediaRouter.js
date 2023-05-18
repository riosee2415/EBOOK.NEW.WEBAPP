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
  limits: { fileSize: 1000 * 1024 * 1024 }, // 1000MB
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
  const { title, sort, etcType } = req.body;

  const _title = title ? title : "";
  const _sort = sort ? parseInt(sort) : null;

  const _etcType = etcType ? etcType : 3;
  // 1 상담
  // 2 미상담
  // 3 전체

  const selectQ = `
    SELECT  ROW_NUMBER() OVER()		AS num,
            type,
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
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt,
            etc
      FROM  media
     WHERE  1 = 1
       AND  title LIKE "%${_title}%"
            ${_sort ? `AND  sort = ${_sort}` : ``}
       AND  isDelete = FALSE
            ${
              _etcType === 1
                ? `AND  etc IS NOT NULL`
                : _etcType === 2
                ? `AND  etc IS NULL`
                : ``
            }
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
  const { page, type } = req.body;

  const LIMIT = 50;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 50;

  const lengthQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort ASC)		AS num,
            type,
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
            type,
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

    const listLen =
      type === 2
        ? lengths[0].length > 118
          ? 118
          : lengths[0].length
        : lengths[0].length;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    return res
      .status(200)
      .json({ list: list[0], lastPage: parseInt(lastPage), maxLen: listLen });
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/all/list", async (req, res, next) => {
  const { searchType } = req.body;

  const _searchType = searchType ? searchType : null;

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY sort ASC)		AS num,
            type,
            id,
            title,
            mediaOriginName,
            mediaPath,
            duration,
            sampleMediaOriginName,
            sampleMediaPath,
            sampleDuration,
            isSample,
            previousId,
            sort,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')       AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')       AS viewUpdatedAt
      FROM  media
     WHERE  1 = 1
       AND  isDelete = FALSE
            ${_searchType ? `AND  type LIKE "%${_searchType}%"` : ""}
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
            type,
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

  const nextDataQuery = `
    SELECT  id,
            title
      FROM  media
     WHERE  1 = 1
       AND  id > ${id}
       AND  isDelete = FALSE
     LIMIT  1
    `;

  try {
    const nextData = await models.sequelize.query(nextDataQuery);
    const detail = await models.sequelize.query(selectQ);

    return res.status(200).json({ detail: detail[0][0], next: nextData[0][0] });
  } catch (e) {
    console.error(e);
    return res.status(400).send("생성 할 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const {
    type,
    title,
    mediaOriginName,
    mediaPath,
    duration,
    sampleMediaOriginName,
    sampleMediaPath,
    sampleDuration,
    isSample,
  } = req.body;

  const insertQ = `
  INSERT INTO media
  (
      type,
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
      updatedAt
  )
  VALUES
  (
      "${type}",
      '${title}',
      ${mediaOriginName ? `"${mediaOriginName}"` : "NULL"},
      ${mediaPath ? `"${mediaPath}"` : "NULL"},
      ${duration ? `${duration}` : "NULL"},
      ${sampleMediaOriginName ? `"${sampleMediaOriginName}"` : "NULL"},
      ${sampleMediaPath ? `"${sampleMediaPath}"` : "NULL"},
      ${sampleDuration ? `"${sampleDuration}"` : "NULL"},
      ${isSample},
      1,
      NOW(),
      NOW()
  )
  `;

  // await models.Media.update(
  //   {
  //     type: type,
  //     title: title,
  //     mediaOriginName: mediaOriginName ? `"${mediaOriginName}"` : null,
  //     mediaPath: mediaPath ? `"${mediaPath}"` : null,
  //     duration: duration ? `"${duration}"` : null,
  //     sampleMediaOriginName: sampleMediaOriginName
  //       ? `"${sampleMediaOriginName}"`
  //       : null,
  //     sampleMediaPath: sampleMediaPath ? `"${sampleMediaPath}"` : null,
  //     sampleDuration: sampleDuration ? `"${sampleDuration}"` : null,
  //     isSample: isSample,
  //     etc: etc ? `"${etc}"` : null,
  //   },
  //   {
  //     where: { id: id },
  //   }
  // );

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
    type,
    title,
    mediaOriginName,
    mediaPath,
    duration,
    sampleMediaOriginName,
    sampleMediaPath,
    sampleDuration,
    isSample,
    etc,
  } = req.body;

  // try {
  //   await models.Media.update(
  //     {
  //       type: type,
  //       title: title,
  //       mediaOriginName: mediaOriginName ? `"${mediaOriginName}"` : null,
  //       mediaPath: mediaPath ? `"${mediaPath}"` : null,
  //       duration: duration ? `"${duration}"` : null,
  //       sampleMediaOriginName: sampleMediaOriginName
  //         ? `"${sampleMediaOriginName}"`
  //         : null,
  //       sampleMediaPath: sampleMediaPath ? `"${sampleMediaPath}"` : null,
  //       sampleDuration: sampleDuration ? `"${sampleDuration}"` : null,
  //       isSample: isSample,
  //       etc: etc ? `"${etc}"` : null,
  //     },
  //     {
  //       where: { id: id },
  //     }
  //   );

  const updateQ = `
  UPDATE  media
     SET  type = "${type}",
          title = '${title}',
          mediaOriginName = ${
            mediaOriginName ? `'${mediaOriginName}'` : "NULL"
          },
          mediaPath = ${mediaPath ? `'${mediaPath}'` : "NULL"},
          duration = ${duration ? `'${duration}'` : "NULL"},
          sampleMediaOriginName = ${
            sampleMediaOriginName ? `'${sampleMediaOriginName}'` : "NULL"
          },
          sampleMediaPath = ${
            sampleMediaPath ? `'${sampleMediaPath}'` : "NULL"
          },
          sampleDuration = ${sampleDuration ? `'${sampleDuration}'` : "NULL"},
          isSample = ${isSample},
          etc = ${etc ? `'${etc}'` : `NULL`},
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
