const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { MainBanner } = require("../models");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

const router = express.Router();

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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/list", async (req, res, next) => {
  const selectQ = `
    SELECT	A.id,
            A.name,
            A.imageURL,
            A.link,
            A.useYn,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 	AS	createdAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 	AS	updatedAt,
            IFNULL(B.username, "알수없음")				 AS  username,
            A.sort
      FROM  snsInfo	A
      LEFT
     OUTER
      JOIN	users 	B
        ON	A.updateor = B.id
     ORDER  BY  sort ASC
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/sort/update", isAdminCheck, async (req, res, next) => {
  const { id, nextSort, name } = req.body;

  const updateQuery = `
    UPDATE  snsInfo
       SET  sort = ${nextSort},
            updateor = ${req.user.id}
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO snsInfoHistory (content, name, updator, createdAt, updatedAt) VALUES 
  (
    "우선순위 변경",
    "${name}",
    ${req.user.id},
    now(),
    now()
  )
  `;
  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("SNS정보의 우선순위를 변경할 수 없습니다.");
  }
});

router.post("/use/update", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag, name } = req.body;

  const updateQuery = `
    UPDATE  snsInfo
       SET  useYn = ${nextFlag},
            updateor = ${req.user.id}
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO snsInfoHistory (content, name, updator, createdAt, updatedAt) VALUES 
  (
    "사용여부 수정",
    "${name}",
    ${req.user.id},
    now(),
    now()
  )
  `;
  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("SNS정보의 사용여부를 변경할 수 없습니다.");
  }
});

router.post("/new", isAdminCheck, async (req, res, next) => {
  const { image, name, link } = req.body;

  const insertQ = `
    INSERT INTO snsInfo (name, imageURL, updateor, link, useYn, createdAt, updatedAt, sort) VALUES 
    (
      "${name}",
      "${image}",
      ${req.user.id},
      "${link}",
      1,
      now(),
      now(),
      1
    )
  `;

  const insertQuery2 = `
  INSERT INTO snsInfoHistory (content, name, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 추가",
    "${name}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQ);
    await models.sequelize.query(insertQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("SNS정보를 추가할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, image, name, link } = req.body;

  const updateQ = `
    UPDATE  snsInfo
       SET  imageURL = "${image}",
            name = "${name}",
            link = "${link}"
     WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO snsInfoHistory (content, name, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 수정",
    "${name}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("SNS정보를 변경할 수 없습니다.");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, name } = req.body;

  const deleteQ = `
    DELETE  FROM  snsInfo
      WHERE id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO snsInfoHistory (content, name, updator, createdAt, updatedAt) VALUES 
  (
    "데이터 삭제",
    "${name}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQ);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("SNS정보를 변경할 수 없습니다.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.name,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	snsInfoHistory		A
     INNER
      JOIN	users 			B
        ON	A.updator = B.id
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

module.exports = router;
